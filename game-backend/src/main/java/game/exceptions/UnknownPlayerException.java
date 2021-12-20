package game.exceptions;

/**
 * Exception thrown when a player hasn't been found.
 */
public class UnknownPlayerException extends Exception {
    public UnknownPlayerException(final String name) {
        super("No player found with the name: " + name);
    }
}
