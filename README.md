# Welcome to the Sailor Moon themed Racer Simulation Game

## Project Introduction

Here is a game that races car! I used asynchronous programming skills that I gained in the course with Udacity Intermediate JavaScript in this game. This project emphasizes the use of async code and handling the errors around it.

The game mechanics are this: you select a player and track, the game begins and you accelerate your racer by clicking an acceleration button. As you accelerate so do the other players and the leaderboard live-updates as players change position on the track. The final view is a results page displaying the players' rankings.

The game has three main views:

1. The form to create a race

2. The race progress view (this includes the live-updating leaderboard and acceleration button)

3. The race results view

## HTML Views

![Race Sim Image](./webImage/racechoice.PNG)
![Race Sim Image](./webImage/raceImage.PNG)


## Getting Started

Please follow these steps to get started:

1. Clone this repo and install the dependencies

 - [ ] To clone the repo:

```git clone https://github.com/cheerworld/PodRacerSim.git```

 - [ ] For this project we are using yarn as our package manager, so to install your dependencies run:

```yarn install```

**If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

In order to run this game, we need to run two things: the game engine API and the front end.

### Start the Server

The game engine has been compiled down to a binary so that you can run it on any system. Because of this, you cannot edit the API in any way, it is just a black box that we interact with via the API endpoints.

To run the server, locate your operating system and run the associated command in your terminal at the root of the project.

| Your OS               | Command to start the API                                  |
| --------------------- | --------------------------------------------------------- |
| Mac                   | `ORIGIN_ALLOWED=http://localhost:3000 ./bin/server-osx`   |
| Windows               | `ORIGIN_ALLOWED=http://localhost:3000 ./bin/server.exe`   |
| Linux (Ubuntu, etc..) | `ORIGIN_ALLOWED=http://localhost:3000 ./bin/server-linux` |

If you are on an older OS and the above command doesn't run for you - or if you know that you are running a 32bit system - add `-32` to the end of the file name. For reference, here are the same commands but for a 32-bit system.

| 32 Bit Systems Only!  | Command to start the API                                     |
| --------------------- | ------------------------------------------------------------ |
| Mac                   | `ORIGIN_ALLOWED=http://localhost:3000 ./bin/server-osx-32`   |
| Windows               | `ORIGIN_ALLOWED=http://localhost:3000 ./bin/server-32.exe`   |
| Linux (Ubuntu, etc..) | `ORIGIN_ALLOWED=http://localhost:3000 ./bin/server-linux-32` |

Note that this process will use your terminal tab, so you will have to open a new tab and navigate back to the project root to start the front end.

### Start the Frontend

First, run your preference of `npm install && npm start` or `yarn && yarn start` at the root of this project. Then you should be able to access http://localhost:3000.


### API Calls

I made calls to the API using fetch requests. The API calls are all at the bottom of the file: `src/client/assets/javascript/index.js`.

Below are a list of the API endpoints and the shape of the data they return.

[GET] `api/tracks`
List of all tracks

- id: number (1)
- name: string ("Track 1")
- segments: number[]([87,47,29,31,78,25,80,76,60,14....])

[GET] `api/cars`
List of all cars

- id: number (3)
- driver_name: string ("Racer 1")
- top_speed: number (500)
- acceleration: number (10)
- handling: number (10)

[GET] `api/races/${id}`
Information about a single race

- status: RaceStatus ("unstarted" | "in-progress" | "finished")
- positions object[] ([{ car: object, final_position: number (omitted if empty), speed: number, segment: number}])

[POST] `api/races`
Create a race

- id: number
- track: string
- player_id: number
- cars: Cars[] (array of cars in the race)
- results: Cars[] (array of cars in the position they finished, available if the race is finished)

[POST] `api/races/${id}/start`
Begin a race

- Returns nothing

[POST] `api/races/${id}/accelerate`
Accelerate a car

- Returns nothing

Have fun and enjoy the Sailor moon sim race game!
