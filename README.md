## Scope

- Vite frontend with a maplibre map in order to display raster from GEE
- Nest backend to interact with GEE and serve data to frontend

## Though Inbox

- Stage 1 (Full flow)
  - Create GEE module
  - run GEE calculation
  - backend fetches calculation result
  - backend formats data
  - frontend fetches / backend serves data
  - frontend display data on map

- Stage 2 (Interactivity)
  - Create a time slider to show deforestaion over the years
  - Add caching, indexed by year
  - set up a task queue system (Loading state in the meantime)
  - Create a sidebar to toggle additional layers
    - use reduce functions i.e. average vegetaion per pixel block
