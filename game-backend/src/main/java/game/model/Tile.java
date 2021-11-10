package game.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import game.exceptions.UnknownTileException;

@XmlRootElement
public class Tile {

    @XmlElement
    String kind;

    @XmlElement
    int x;

    @XmlElement
    int y;

    public static String tileKind[] = {"water", "tree", "grass" };

    public Tile(){}
    
    public Tile(int x, int y, String kind) throws UnknownTileException {
        // make sure the tile is of a known klnd
        switch(kind) {
            case "water":
            case "tree":
            case "grass":
                break;

            default:
                throw new UnknownTileException(kind);
        }

        this.kind = kind;
        this.x = x;
        this.y = y;
    }
}
