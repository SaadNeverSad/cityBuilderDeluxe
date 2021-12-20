package game.model;

import java.util.Collections;
import java.util.List;

public class Replay {
    private String playerName;
    private int score;
    private List<Move> moves;

    public String getPlayerName() {
        return this.playerName;
    }

    public int getScore() {
        return this.score;
    }

    public List<Move> getMoves() {
        return Collections.unmodifiableList(this.moves);
    }
}
