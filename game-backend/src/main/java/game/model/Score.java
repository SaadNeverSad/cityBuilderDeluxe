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
        final Score other = (Score) obj;
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
        result = prime * result + ((playerName == null) ? 0 : playerName.hashCode());
        result = prime * result + score;
        return result;
    }
}
