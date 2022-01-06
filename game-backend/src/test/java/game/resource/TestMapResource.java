package game.resource;

import game.exceptions.UnknownMapException;
import game.model.Map;
import org.junit.jupiter.api.*;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestMapResource {
    MapResource mapRes;
    Map map;


    @BeforeAll
    public void init() {
        mapRes = new MapResource();
        map = mapRes.getNewMap();
    }

    @Test
    void testMapResPath() {
        Assertions.assertEquals(MapResource.class, mapRes.getClass());
    }

    @Test
    void testGetAvailableMaps() {
        File file = new File("maps");
        String[] directories = file.list(new FilenameFilter() {
            @Override
            public boolean accept(File current, String name) {
                return new File(current, name).isDirectory();
            }
        });
        List list = Arrays.asList(directories);
        Assertions.assertEquals(list,mapRes.getAvailableMaps());
    }

    @Test
    void testGetMap() {
        Map map1 = mapRes.getNewMap();
        Assertions.assertEquals(map1,mapRes.getMap(map1.getName()));
        Assertions.assertThrows(NoSuchElementException.class,()->mapRes.getMap("brrrr"));
    }

    @Test
    void testDeleteMap() throws UnknownMapException {
        mapRes.deleteMap(map.getName());
        Assertions.assertFalse(mapRes.getAvailableMaps().contains(map.getName()));
        Assertions.assertThrows(UnknownMapException.class,()->mapRes.deleteMap("blabla"));
    }

    @Test
    void testGetReplays() {

    }


}
