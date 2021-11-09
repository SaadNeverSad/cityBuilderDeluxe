package game.resource;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.ObjectMapper;

import game.exceptions.UnkownMapException;
import game.model.Map;
import game.model.Score;
import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.Collectors;

@Singleton
@Path("map")
public class MapResource {

    private List<Map> maps;

    

    public MapResource() {
        this.maps = new ArrayList<>();
    }

    @GET
    @Path("availableMaps")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getAvailableMaps() {
        return this.maps.stream().map(m -> m.getName()).collect(Collectors.toList());
    }

    @GET
    @Path("{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map getMap(@PathParam("name") String name) {
        return this.maps.stream().filter(m -> m.getName().equals(name)).findFirst().orElseThrow();
    }

    @GET
    @Path("newMap")
    public void getNewMap() {
        this.maps.add(Map.generateRandomMap());
        saveMap();
    }

    public void saveMap() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("/tmp/testMap.json"), this.maps.get(0));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GET
    @Path("{name}/bestScores")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Score> getBestScores(@PathParam("name") String name) throws UnkownMapException{
        Map map = this.maps.stream().filter(m -> m.getName().equalsIgnoreCase(name)).findFirst().orElseThrow(() -> new UnkownMapException(name));
        return map.getScores().stream().sorted(Comparator.comparing(Score::getScore).reversed()).limit(5)
                .collect(Collectors.toList());
    }

    @POST
    @Path("{name}/score")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces(MediaType.APPLICATION_JSON)
    public void postScore(@PathParam("name") String name, final Score score) throws UnkownMapException {
            Map map = this.maps.stream().filter(m -> m.getName().equalsIgnoreCase(name)).findFirst().orElseThrow(() -> new UnkownMapException(name));
            map.getScores().add(score);
            saveScore();           
    }

    public void saveScore() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("/tmp/testScore.json"), this.maps.get(0).getScores() );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}