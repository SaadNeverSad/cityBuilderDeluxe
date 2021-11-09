package game.exceptions;

public class UnkownMapException extends Exception {
    public UnkownMapException(String name){
        super("No available map with this name: "+name);
    }
}
