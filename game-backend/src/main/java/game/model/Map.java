package game.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Produces(MediaType.APPLICATION_JSON)
public final class Map {

    @XmlElement
    private String name;

    @XmlElement
    private Tile tiles[];

    @XmlElement
    private List<Score> scores;

    private Map() {
        this.tiles = new Tile[100];
        this.scores = new ArrayList<>();
    }

    public String getName() {
        return this.name;
    }

    private static String randomNames[] = { "good", "map", "bad", "grass", "water", "tree", "java", "angular", "sunny",
            "rainy", "cloudy", "sad" };

    public void addScore(final Score s) {
        this.scores.add(s);
    }

    public List<Score> getScores() {
        return this.scores;
    }

    public static Map generateRandomMap() {
        final Map map = new Map();
        final Random r = new Random();

        final String firstEl = randomNames[r.nextInt(randomNames.length)];
        final String secondEl = randomNames[r.nextInt(randomNames.length)];
        map.name = String.join(" ", firstEl, secondEl);

        IntStream.range(1, 10)
                .forEach(i -> {
                    final String tileKind = Tile.tileKind[r.nextInt(3)];
                    IntStream.range(1, 10).forEach(j -> map.tiles[10 * i + j] = new Tile(i, j, tileKind));
                });

        return map;
    }
}
