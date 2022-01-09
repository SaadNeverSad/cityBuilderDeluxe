package game.model;

import java.util.Collections;
import java.util.List;

public class Replay {
    private String playerName;
    private int score;
    private List<Move> moves;

    public Replay() {
    }

    public Replay(final String playerName, final int score, final List<Move> moves) {
        this.playerName = playerName;
        this.score = score;
        this.moves = moves;
    }

    public String getPlayerName() {
        return this.playerName;
    }

    public int getScore() {
        return this.score;
    }

    public List<Move> getMoves() {
        return Collections.unmodifiableList(this.moves);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Replay other = (Replay) obj;
        if (moves == null) {
            if (other.moves != null)
                return false;
        } else if (!moves.equals(other.moves))
            return false;
        if (playerName == null) {
            if (other.playerName != null)
                return false;
        } else if (!playerName.equals(other.playerName))
            return false;
        if (score != other.score)
            return false;
        return true;
    }
}
