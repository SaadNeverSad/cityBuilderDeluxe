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
}
