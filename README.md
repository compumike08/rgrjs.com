RGR.js
=====================

## Setup in Dev Environment
1. After cloning, run the command `npm install`.
2. Navigate into the `config` subdirectory and create a `configApp.json` file in accordance with the configuration instructions in the [config/README.md](config/README.md) file.
3. From the application's root directory run the command `npm start`. This will generate the required `data/schema.json` file, and then it will start up the express server in the dev enviornment.

##### NOTE
- To compile files after changes, run `npm run webpack`.
- If you want webpack to run continually, watching files for changes and re-running automatically when changes are saved, use the command `npm run webpack-watch` instead.

## Compiling and Running In a 'Production' Enviornment
To compile the application for deployment in a 'production' enviornment, do the following:

1. Run the command `npm run build`.
2. Run the command `npm run serve`.

