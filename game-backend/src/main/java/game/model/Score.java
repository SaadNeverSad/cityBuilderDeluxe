package game.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;



@XmlRootElement
public class Score {

    @XmlElement
    private int score;

    @XmlElement
    private Player player;

    Score(){}
    Score(Player player, int score){
        this.player = player;
        this.score=score;
    }

    public int getScore() {
        return this.score;
    }
}
