package game.exceptions;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Exception thrown when a player hasn't been found.
 */
public class UnknownPlayerException extends WebApplicationException {
    public UnknownPlayerException(final String name) {
        super(Response.status(Response.Status.NOT_FOUND).entity("No map player with the name: " + name)
                .type(MediaType.TEXT_PLAIN).build());
    }
}
