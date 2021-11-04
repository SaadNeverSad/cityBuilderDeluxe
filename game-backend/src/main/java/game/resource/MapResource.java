package game.resource;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;

import game.model.Map;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Singleton
@Path("map")
public class MapResource {
    private ArrayList<Map> maps;

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
        return this.maps.stream().filter(m-> m.getName().equals(name)).findFirst().orElseThrow();
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
            mapper.writeValue(new File("/tmp/test.json"), this.maps.get(0));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
