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

    private List<Replay> replays;

    public Map() {
        this.tiles = new String[10][10];
        this.replays = new ArrayList<>();
    }

    public String getName() {
        return this.name;
    }

    private static String randomNames[] = { "good", "map", "bad", "grass", "water", "tree", "java", "angular", "sunny",
            "rainy", "cloudy", "sad", "pain", "help" };

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
