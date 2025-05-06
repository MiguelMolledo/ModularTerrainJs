# To Run Typescript
npx ts-node src/index.ts



# TODO

- Create base mongoDb connection and install it  locally   - OK
- Create basic auth system with jwt - OK
- Create basic user model with user and admin roles - OK
- Create the rest of the models
    - Material 
    - Tile
    - Terrain
    - Map

- Create Basic Test




### NEXT STEPS
- refine jwt access to materials end points
- add tests for materials
I need to define what exactly can do an admin and what can do a user
    an Admin could  generate any material and remove any material
    a User can create a material (Update the material schema to points which user created it)
    a User can Remove only his own materials
    a User can modify its own materials
I need to explore how to handle Images? Should I storage it? how can I do this? I co nvert it into some compress file? the size of the material images should be something medium not huge and not small