package game.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import game.exceptions.UnknownTileException;

@XmlRootElement
@Produces(MediaType.APPLICATION_JSON)
public class Map {

    @XmlElement
    private String name;

    @XmlElement
    private Tile tiles[];

    @XmlElement
    private List<Score> scores;

    private Map() {
        this.tiles = new Tile[100];
        this.scores = new ArrayList<>();
        for(int i=0;i<6;i++){
            this.scores.add(new Score(new Player("Player"+i), i));
        }
    }

    public String getName() {
        return this.name;
    }

    private static String randomNames[] = { "good", "map", "bad", "grass", "water", "tree", "java", "angular", "sunny",
            "rainy", "cloudy", "sad" };

    public void addScore(Score s) {
        this.scores.add(s);
    }

    public List<Score> getScores() {
        return this.scores;
    }

    public static Map generateRandomMap() {
        Map map = new Map();
        Random r = new Random();

        String firstEl = randomNames[r.nextInt(randomNames.length)];
        String secondEl = randomNames[r.nextInt(randomNames.length)];
        map.name = String.join(" ", firstEl, secondEl);

        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                String tileKind = Tile.tileKind[r.nextInt(3)];
                try {
                    map.tiles[10 * i + j] = new Tile(i, j, tileKind);
                } catch (UnknownTileException e) {
                    e.printStackTrace();
                }
            }

        }

        return map;
    }
}
