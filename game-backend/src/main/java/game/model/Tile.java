package game.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Tile {

    static final String[] tileKind = {"water", "tree", "grass"};
    @XmlElement
    String kind;
    @XmlElement
    int x;
    @XmlElement
    int y;

    public Tile() {
    }

    public Tile(final int x, final int y, final String kind) {
        this.kind = kind;
        this.x = x;
        this.y = y;
    }
}
