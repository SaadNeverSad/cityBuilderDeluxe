package game.exceptions;

/**
 * Exception thrown when a map hasn't been found.
 */
public class UnknownMapException extends Exception {
    public UnknownMapException(final String name) {
        super("No map found with the name: " + name);
    }
}
