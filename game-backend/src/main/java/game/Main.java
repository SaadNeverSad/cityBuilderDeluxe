package game;

import java.net.URI;

import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import game.resource.MapConfig;
import game.resource.MapResource;
import game.resource.ProductionMapConfig;

public final class Main {
	private Main() {
		super();
	}

	/**
	 * Starts Grizzly HTTP server exposing JAX-RS resources defined in this
	 * application.
	 * 
	 * @return Grizzly HTTP server.
	 * @param httpAddress
	 */
	public static void startServer(final String httpAddress) {
		final ResourceConfig rc = new ResourceConfig()
				.register(JacksonFeature.class)
				.register(MapResource.class)
				.register(new AbstractBinder() {
					@Override
					protected void configure() {
						bind(ProductionMapConfig.class).to(MapConfig.class);
					}
				});

		GrizzlyHttpServerFactory.createHttpServer(URI.create(httpAddress), rc);
	}

	/**
	 * Takes as argument the HTTP address of the server.
	 * Should be http://localhost:4444/ for testing purpose.
	 * http://0.0.0.0:4444/ for a Docker image
	 * In such cases the swagger UI is available
	 * http://localhost:4444/swag/index.html (localhost or 0.0.0.0)
	 */
	public static void main(final String[] args) throws InterruptedException {
		// final String httpAddress = args[0];
		final String httpAddress = "http://localhost:4444/";
		startServer(httpAddress);
		Thread.currentThread().join();
	}
}
