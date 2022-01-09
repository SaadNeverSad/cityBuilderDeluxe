package game.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.hanleyt.JerseyExtension;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;

import game.model.Map;
import game.model.Move;
import game.model.Replay;
import game.model.Score;

public class TestMapResource {
	static {
		System.setProperty("jersey.config.test.container.port", "0");
	}

	@SuppressWarnings("unused")
	@RegisterExtension
	JerseyExtension jerseyExtension = new JerseyExtension(this::configureJersey);

	Application configureJersey() {
		return new ResourceConfig(MapResource.class)
				.register(JacksonFeature.class)
				.register(new AbstractBinder() {
					@Override
					protected void configure() {
						bind(TestingMapConfig.class).to(MapConfig.class);
					}
				});
	}

	/**
	 * Util to create new maps for the tests.
	 * 
	 * @param client  the HTTP client
	 * @param baseuri the base URI
	 * @param n       the number of maps to create
	 */
	List<Map> createNewMaps(Client client, URI baseUri, int n) {
		return IntStream.range(0, n).mapToObj(i -> {
			final Response res = client.target(baseUri).path("map/newMap").request().get();
			final Map map = res.readEntity(new GenericType<>() {
			});
			return map;
		}).collect(Collectors.toList());
	}

	/**
	 * Cleanup the test_maps/ directory before each test
	 */
	@BeforeEach
	void cleanup() {
		try {
			Files.walk(Paths.get("test_maps/"))
					.sorted(Comparator.reverseOrder())
					.map(Path::toFile)
					.forEach(File::delete);
		} catch (IOException e) {
			System.err.println("Couldn't cleanup test directory!");
		}
	}

	@Test
	void testGetNewMap(final Client client, final URI baseUri) {
		final Response res = client.target(baseUri).path("map/newMap").request().get();

		assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());

		final Map map = res.readEntity(new GenericType<>() {
		});

		assertEquals(10, map.getTiles().size());
	}

	@Test
	void testGetMap(final Client client, final URI baseUri) {
		Map expectedMap = createNewMaps(client, baseUri, 1).get(0);

		final Response res = client
				.target(baseUri)
				.path("map/" + expectedMap.getName())
				.request()
				.get();

		assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());

		final Map actualMap = res.readEntity(new GenericType<>() {
		});

		assertEquals(expectedMap, actualMap);
	}

	@Test
	void testUnknownGetMap(final Client client, final URI baseUri) {
		final Response res = client
				.target(baseUri)
				.path("map/incorrect")
				.request()
				.get();

		assertEquals(Response.Status.NOT_FOUND.getStatusCode(), res.getStatus());

		final String error = res.readEntity(new GenericType<>() {
		});
		assertEquals("No map found with the name: incorrect", error);
	}

	@Test
	void testGetAvailableMaps(final Client client, final URI baseUri) {
		// test empty maps
		Response res = client
				.target(baseUri)
				.path("map/availableMaps")
				.request()
				.get();

		assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());
		List<String> maps = res.readEntity(new GenericType<>() {
		});

		assertTrue(maps.isEmpty());

		// create new maps
		createNewMaps(client, baseUri, 5);

		// the new maps should be in the available maps
		res = client
				.target(baseUri)
				.path("map/availableMaps")
				.request()
				.get();

		maps = res.readEntity(new GenericType<>() {
		});

		assertEquals(5, maps.size());

		// compare with the files saved in the test_maps/ folder
		File file = new File("test_maps/");
		String[] directories = file.list(new FilenameFilter() {
			@Override
			public boolean accept(File current, String name) {
				return new File(current, name).isDirectory();
			}
		});
		List<String> files = Arrays.asList(directories);

		assertEquals(files, maps);
	}

	@Test
	void testPostGetReplay(final Client client, final URI baseUri) throws JsonProcessingException {
		Map map = createNewMaps(client, baseUri, 1).get(0);

		// post a new replay
		final String fakePlayer = "testPlayer";
		Move fakeMove = new Move("grass", 3, 2, 12);
		List<Move> fakeMoves = new ArrayList<>();
		fakeMoves.add(fakeMove);
		Replay fakeReplay = new Replay(fakePlayer, 12, fakeMoves);

		Response res = client.target(baseUri).path("map/" + map.getName() + "/replay")
				.request().post(Entity.entity(fakeReplay, MediaType.APPLICATION_JSON));

		assertEquals(Response.Status.NO_CONTENT.getStatusCode(), res.getStatus());

		// get the new replay
		res = client.target(baseUri).path("map/" + map.getName() + "/replay/" + fakePlayer).request().get();
		assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());

		Replay actualReplay = res.readEntity(new GenericType<>() {
		});

		assertEquals(fakeReplay, actualReplay);
	}

	@Test
	void testGetBestScores(final Client client, final URI baseUri) {
		Map map = createNewMaps(client, baseUri, 1).get(0);

		// create 10 replays
		IntStream.range(0, 10).forEach(i -> {
			Replay replay = new Replay("foo" + i, i * 10, new ArrayList<>());
			client.target(baseUri).path("map/" + map.getName() + "/replay").request()
					.post(Entity.entity(replay, MediaType.APPLICATION_JSON));
		});

		final Response res = client.target(baseUri).path("map/" + map.getName() + "/bestScores").request().get();
		assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());

		List<Score> actualScores = res.readEntity(new GenericType<>() {
		});

		// make sure the results are the 5 best scores
		List<Score> expectedScores = Arrays.asList(
				new Score("foo9", 90),
				new Score("foo8", 80),
				new Score("foo7", 70),
				new Score("foo6", 60),
				new Score("foo5", 50));

		assertEquals(expectedScores, actualScores);
	}

	@Test
	void testGetReplays(final Client client, final URI baseUri) {
		Map map = createNewMaps(client, baseUri, 1).get(0);
		List<Replay> expectedReplays = new ArrayList<>();
		IntStream.range(0, 10).forEach(i -> {
			Replay replay = new Replay("foo" + i, i * 10, new ArrayList<>());
			client.target(baseUri).path("map/" + map.getName() + "/replay").request()
					.post(Entity.entity(replay, MediaType.APPLICATION_JSON));
			expectedReplays.add(replay);
		});

		final Response res = client.target(baseUri).path("map/" + map.getName() + "/replays").request().get();

		List<Replay> actualReplays = res.readEntity(new GenericType<>() {
		});

		// the returned replays are ordered by best score
		Collections.reverse(expectedReplays);

		assertEquals(expectedReplays, actualReplays);
	}
}
