package game.exceptions;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Exception thrown when a map hasn't been found.
 */
public class UnknownMapException extends WebApplicationException {
    public UnknownMapException(final String name) {
        super(Response.status(Response.Status.NOT_FOUND).entity("No map found with the name: " + name)
                .type(MediaType.TEXT_PLAIN).build());
    }
}
