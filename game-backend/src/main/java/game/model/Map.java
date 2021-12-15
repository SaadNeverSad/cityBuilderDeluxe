package game.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.IntStream;

import com.fasterxml.jackson.annotation.JsonIgnore;

public final class Map {
    private String name;
    private String tiles[][];

    @JsonIgnore
    private List<Score> scores;

    private Map() {
        this.tiles = new String[10][10];
        this.scores = new ArrayList<>();
    }

    public String getName() {
        return this.name;
    }

    private static String randomNames[] = { "good", "map", "bad", "grass", "water", "tree", "java", "angular", "sunny",
            "rainy", "cloudy", "sad", "pain" };

    /**
     * Adds a score to this map, if it's the player best score.
     * 
     * @param score
     */
    public void addScore(final Score score) {
        final Optional<Score> previousScore = this.scores.stream()
                .filter(previous -> previous.getPlayerName().equals(score.getPlayerName())).findAny();

        if (previousScore.isEmpty()) {
            this.scores.add(score);
        } else if (previousScore.get().getScore() < score.getScore()) {
            this.scores.remove(previousScore.get());
            this.scores.add(score);
        }
    }

    public List<Score> getScores() {
        return this.scores;
    }

    // this is just to make spotbugs happy
    public List<String[]> getTiles() {
        return Collections.unmodifiableList(Arrays.asList(this.tiles));
    }

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
}
