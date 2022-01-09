package game.model;

public class Score {

    private int score;
    private String playerName;

    Score() {
    }

    public Score(final String playerName, final int score) {
        this.playerName = playerName;
        this.score = score;
    }

    public int getScore() {
        return this.score;
    }

    public String getPlayerName() {
        return this.playerName;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Score other = (Score) obj;
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
