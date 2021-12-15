package game.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Score {

    @XmlElement
    private int score;

    @XmlElement
    private String playerName;

    Score() {
    }

    Score(final String playerName, final int score) {
        this.playerName = playerName;
        this.score = score;
    }

    public int getScore() {
        return this.score;
    }

    public String getPlayerName() {
        return this.playerName;
    }
}
