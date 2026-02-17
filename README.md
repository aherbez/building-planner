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
