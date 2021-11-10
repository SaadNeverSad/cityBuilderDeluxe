package game.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Undoable {
    
    @XmlElement
    String action;

    @XmlElement
    Tile tile;

    public Undoable(){}

    public Undoable(String action, Tile tile){
        this.action=action;
        this.tile = tile;
    }
}
