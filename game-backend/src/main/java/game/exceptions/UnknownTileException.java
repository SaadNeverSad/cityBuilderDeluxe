package game.exceptions;

public class UnknownTileException extends Exception {
    public UnknownTileException(String name){
        super("No available Tile with the name : " + name);
    }
}
