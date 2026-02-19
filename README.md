# devlog

## 2026-02-11

![setup.png](/notes/images/setup.png)
1:30: reading over doc, setting up basic babylonJS project

1:30-1:50: stepped away

1:50: planning / reading up on babylon

2:21:
![skull.png](/notes/images/skull.png)
Basic loading of a glb (sourced from Polycam)

## 2026-02-16

Finally got some time to get back to the test

4:45pm: lots of changes:
![create_slab.png](/notes/images/create_slab.png)

- added loading of a terrain GLTF
- set project up to deploy via netlify
- added a proper ToolManger to push/pop tools
- added control panel and display of active tool
- added "Slab tool" to create concrete slabs on top of terrain

5:59pm: Setting up MaterialLibrary, stubbing out utils in /geo/

6:30: Setting up concrete and default marker materials

![supports.png](/notes/images/supports.png)
7:00pm: Adding generation of columns underneath the slab (also fixed bug with floating slabs)

7:00-8:30pm: Dinner

9:14pm: Added

- parent class for tools that need to place things (PlacementTool)
- cursors that update as the user moves the mouse (implemented in PlacementTool)
- stubbed out MakeWallTool
- made MakeSlab only work on terrain, MakeWall only work on slabs

![wall_tool.jpg](/notes/images/wall_tool.jpg)
10:19pm:

- wall tool now adds walls
- added brick texture to material library
  demo video: [https://www.youtube.com/watch?v=GOx6tvkvvxY](https://www.youtube.com/watch?v=GOx6tvkvvxY)

10:25pm: Added ability to remove recently-placed markers with either the Backspace or Delete keys. Works with both slab and wall creation

10:43pm: Added per-tool instructions to the control panel
demo video: [https://www.youtube.com/watch?v=G6MWE91BcAs](https://www.youtube.com/watch?v=G6MWE91BcAs)

# 2026-02-17

4:30pm: back at it, working on sourcing some large / heavy terrain models

![mountain_start.jpg](/notes/images/mountain_start.jpg)
4:50: have a massive mountain scan from TerraXL. Brought their LOD0 model into Blender and exported it (with 8k textures) as a glb to get a reference point. GLB size: 697MB (huge!)

5:20: Sanity check of heavily decimating the original mesh and exporting for a 13MB glb.

6:00-7:45: Dinner and family obligations

8:30-9:30: Writing a Blender script to slice the model into chunks in an 8x16 grid. Also had to actually let the script run to save out the 128 models.

9:30-10:00: Setting up the project to load in all the chunks asyncronously
[https://www.youtube.com/watch?v=dPKxEfyklqk](https://www.youtube.com/watch?v=dPKxEfyklqk)
