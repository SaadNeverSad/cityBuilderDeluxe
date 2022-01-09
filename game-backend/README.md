# City Builder Classic Deluxe Pro Edition 2022 Ultimate Bundle Release Backend

This is the backend of the game, written in Java with the Jersey framework.

## Project structure

`maps`: folder where all the maps are saved. Every time a new map is added, it is stored here.  
`src/main/java/game`: gameserver implementation.  
`src/test/java/game`: tests.  
`test_maps`: same folder as `maps`, but only used when running the tests to avoid deleting the user maps.

Another README in `src/main/java/game` highlights design decisions.