package game.model;

public class Move {
    private String block;
    private int blockX;
    private int blockY;
    private int scoreAdded;

    public int getScoreAdded() {
        return scoreAdded;
    }

    public String getBlock() {
        return block;
    }

    public int getBlockX() {
        return blockX;
    }

    public int getBlockY() {
        return blockY;
    }
}
