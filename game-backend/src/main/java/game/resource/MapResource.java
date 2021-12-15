package game.resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import game.exceptions.UnkownMapException;
import game.model.Map;
import game.model.Score;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Singleton
@Path("map")
public class MapResource {

    private final List<Map> maps;

    public MapResource() {
        this.maps = loadMaps();
    }

    /**
     * Gets all available map names.
     * 
     * @return A list of map names.
     */
    @GET
    @Path("availableMaps")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getAvailableMaps() {
        return this.maps.stream().map(m -> m.getName()).collect(Collectors.toList());
    }

    /**
     * Gets a specific map by its name.
     * 
     * @param name The name of the map
     * @return The map choosen.
     */
    @GET
    @Path("{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map getMap(@PathParam("name") final String name) {
        return this.maps.stream().filter(m -> m.getName().equals(name)).findFirst().orElseThrow();
    }

    /**
     * Deletes a specific map by its name.
     * 
     * @param name The name of the map
     */
    @DELETE
    @Path("{name}")
    public void deleteMap(@PathParam("name") final String name) throws UnkownMapException {
        final boolean mapRemoved = this.maps.removeIf(map -> map.getName().equals(name));

        if (!mapRemoved) {
            throw new UnkownMapException(name);
        }
    }

    /**
     * Creates a new, randomly generated map.
     * 
     * @return the map created.
     */
    @GET
    @Path("newMap")
    @Produces(MediaType.APPLICATION_JSON)
    public Map getNewMap() {
        final Map newMap = Map.generateRandomMap();
        this.maps.add(newMap);
        saveMap(newMap);

        return newMap;
    }

    /**
     * Loads all stored maps and their scores.
     * 
     * @return the list of maps.
     */
    private List<Map> loadMaps() {
        final File mapsDir = new File("maps");
        final ObjectMapper mapper = new ObjectMapper();

        try {
            Files.createDirectories(Paths.get("maps"));
        } catch (IOException e) {
            System.out.println("Could not create the maps directory, check your permissions: " + e);
        }

        return Stream.of(mapsDir.listFiles()).map(mapDir -> {
            try {
                return mapper.readValue(new File(mapDir, "map.json"), Map.class);
            } catch (Exception e) {
                System.err.println("Error when reading map in " + mapDir + ": " + e);
                return null;
            }
        })
                .filter(map -> map != null)
                .collect(Collectors.toList());
    }

    /**
     * Saves a map to a json file.
     */
    private void saveMap(final Map map) {
        final ObjectMapper mapper = new ObjectMapper();
        final String mapDirectory = "maps/" + map.getName();

        try {
            // create the directory if it doesn't exist
            Files.createDirectories(Paths.get(mapDirectory));
            // write the map as a json file
            mapper.writeValue(new File(mapDirectory + "/map.json"), map);
        } catch (IOException e) {
            System.err.println("Failed to save a map to its directory: " + e);
        }
    }

    /**
     * Gets the best scores for a given map.
     * 
     * @param name the name of the map
     * @return the 5 best scores.
     * @throws UnkownMapException
     */
    @GET
    @Path("{name}/bestScores")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Score> getBestScores(@PathParam("name") final String name) throws UnkownMapException {
        final Map map = this.maps.stream().filter(m -> m.getName().equalsIgnoreCase(name)).findFirst()
                .orElseThrow(() -> new UnkownMapException(name));
        return map.getScores().stream().sorted(Comparator.comparing(Score::getScore).reversed()).limit(5)
                .collect(Collectors.toList());
    }

    /**
     * Adds a score for the given map.
     * 
     * @param name  the name of the map
     * @param score the score to add
     * @throws UnkownMapException
     */
    @POST
    @Path("{name}/score")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces(MediaType.APPLICATION_JSON)
    public void postScore(@PathParam("name") final String name, final Score score) throws UnkownMapException {
        final Map map = this.maps.stream().filter(m -> m.getName().equalsIgnoreCase(name)).findFirst()
                .orElseThrow(() -> new UnkownMapException(name));
        map.addScore(score);
        saveMap(map);
    }
}
