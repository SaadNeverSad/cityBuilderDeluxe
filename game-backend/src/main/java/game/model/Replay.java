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

    // auto generated
    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Replay other = (Replay) obj;
        if (moves == null) {
            if (other.moves != null) {
                return false;
            }
        } else if (!moves.equals(other.moves)) {
            return false;
        }
        if (playerName == null) {
            if (other.playerName != null) {
                return false;
            }
        } else if (!playerName.equals(other.playerName)) {
            return false;
        }
        if (score != other.score) {
            return false;
        }
        return true;
    }

    // auto generated
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((moves == null) ? 0 : moves.hashCode());
        result = prime * result + ((playerName == null) ? 0 : playerName.hashCode());
        result = prime * result + score;
        return result;
    }
}
