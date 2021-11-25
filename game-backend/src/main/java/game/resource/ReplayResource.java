package game.resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Replay;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Singleton
@Path("")
public class ReplayResource {

    private final List<Replay> replays;

    public ReplayResource() {
        this.replays = new ArrayList<>();
    }


    @POST
    @Path("replay")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces(MediaType.APPLICATION_JSON)
    public void storeReplay(final Replay replay) {
        this.replays.add(replay);
        saveReplays();
    }

    private void saveReplays() {
        final ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("testReplays.json"), this.replays);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GET
    @Path("replays")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Replay> getReplays() {
        return this.replays;
    }
}
