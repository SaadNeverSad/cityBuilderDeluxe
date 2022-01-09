# Gameserver implementation

Here is the gameserver implementation. All classes and the most important functions uses doc comments so the code is easier to understand.

## Project structure

`exceptions`: Exceptions that inherits from `WebApplicationException`. That allows us to pretty print errors with custom status codes for the REST API consumer.  
`model`: Classes serialized and deserialized. Some fields are annotated with `@JsonIgnore` so the server responses are more lightweight.  
`resource`: the REST API endpoints and the load/save mechanism.