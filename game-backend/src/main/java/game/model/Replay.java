package game.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Deque;


@XmlRootElement
public class Replay {

    @XmlElement
    private Map map;

    @XmlElement
    private Player player;

    @XmlElement
    private Deque<Undoable> pastMoves;

    @XmlElement
    private Deque<Undoable> nextMoves;

    public Replay() {
    }
}
