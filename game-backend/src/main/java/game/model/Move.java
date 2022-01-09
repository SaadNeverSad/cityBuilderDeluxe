package game.model;

/**
 * A move in a replay.
 */
public class Move {
    private String block;
    private int blockX;
    private int blockY;
    private int scoreAdded;

    public Move() {
    }

    public Move(final String block, final int blockX, final int blockY, final int scoreAdded) {
        this.block = block;
        this.blockX = blockX;
        this.blockY = blockY;
        this.scoreAdded = scoreAdded;
    }

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
        final Move other = (Move) obj;
        if (block == null) {
            if (other.block != null) {
                return false;
            }
        } else if (!block.equals(other.block)) {
            return false;
        }
        if (blockX != other.blockX) {
            return false;
        }
        if (blockY != other.blockY) {
            return false;
        }
        if (scoreAdded != other.scoreAdded) {
            return false;
        }
        return true;
    }
}
