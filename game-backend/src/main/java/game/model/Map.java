package game.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.IntStream;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A map and its replays.
 */
public final class Map {
    private String name;
    private String tiles[][];

    private List<Replay> replays;

    public Map() {
        this.tiles = new String[10][10];
        this.replays = new ArrayList<>();
    }

    public String getName() {
        return this.name;
    }

    private static String randomNames[] = { "good", "map", "bad", "grass", "water", "tree", "java", "angular", "sunny",
            "rainy", "cloudy", "sad", "pain", "help", "shiny", "blue", "red", "green", "warrior", "spellcaster", "rest",
            "hungry" };

    public void addReplay(final Replay replay) {
        final Optional<Replay> previousScore = this.replays.stream()
                .filter(previous -> previous.getPlayerName().equals(replay.getPlayerName())).findAny();

        if (previousScore.isEmpty()) {
            this.replays.add(replay);
        } else if (previousScore.get().getScore() < replay.getScore()) {
            this.replays.remove(previousScore.get());
            this.replays.add(replay);
        }
    }

    @JsonIgnore
    public List<Replay> getReplays() {
        return this.replays;
    }

    // this is just to make spotbugs happy
    public List<String[]> getTiles() {
        return Collections.unmodifiableList(Arrays.asList(this.tiles));
    }

    /**
     * Generates a random map.
     * 
     * @return A random generated map
     */
    public static Map generateRandomMap() {
        final Map map = new Map();
        final Random r = new Random();
        final String tileKinds[] = { "water", "grass", "tree" };

        final String firstEl = randomNames[r.nextInt(randomNames.length)];
        final String secondEl = randomNames[r.nextInt(randomNames.length)];
        map.name = String.join(" ", firstEl, secondEl);

        IntStream.range(0, 10)
                .forEach(i -> {
                    IntStream.range(0, 10).forEach(j -> {
                        final String tileKind = tileKinds[r.nextInt(3)];
                        map.tiles[i][j] = tileKind;
                    });
                });

        return map;
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
        final Map other = (Map) obj;
        if (name == null) {
            if (other.name != null) {
                return false;
            }
        } else if (!name.equals(other.name)) {
            return false;
        }
        if (replays == null) {
            if (other.replays != null) {
                return false;
            }
        } else if (!replays.equals(other.replays)) {
            return false;
        }
        if (!Arrays.deepEquals(tiles, other.tiles)) {
            return false;
        }
        return true;
    }
}
