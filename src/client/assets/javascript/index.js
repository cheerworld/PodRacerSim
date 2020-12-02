// PROVIDED CODE BELOW (LINES 1 - 80) DO NOT REMOVE

// The store will hold all information needed globally
var store = {
  track_id: undefined,
  player_id: undefined,
  race_id: undefined,
}

// We need our javascript to wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  onPageLoad()
  setupClickHandlers()
})

async function onPageLoad() {
  try {
    getTracks()
      .then(tracks => {
        const html = renderTrackCards(tracks)
        renderAt('#tracks', html)
      })

    getRacers()
      .then((racers) => {
        const html = renderRacerCars(racers)
        renderAt('#racers', html)
      })
  } catch (error) {
    console.log("Problem getting tracks and racers ::", error.message)
    console.error(error)
  }
}

function setupClickHandlers() {
  document.addEventListener('click', function(event) {
    const {
      target
    } = event
    ////console.log(this)
    // Race track form field
    if (target.matches('.card.track')) {
      handleSelectTrack(target)
    }

    // Podracer form field
    if (target.matches('.card.podracer')) {
      handleSelectPodRacer(target)
    }

    // Submit create race form
    if (target.matches('#submit-create-race')) {
      event.preventDefault()

      // start race
      handleCreateRace()
    }

    // Handle acceleration click
    if (target.matches('#gas-peddle')) {
      handleAccelerate(target)
    }

  }, false)
}

async function delay(ms) {
  try {
    return await new Promise(resolve => setTimeout(resolve, ms));
  } catch (error) {
    console.log("an error shouldn't be possible here")
    console.log(error)
  }
}
// ^ PROVIDED CODE ^ DO NOT REMOVE

// This async function controls the flow of the race, add the logic and error handling
async function handleCreateRace() {
  try {
    // TODO - Get player_id and track_id from the store
    const {
      track_id,
      player_id
    } = store;
    // const race = TODO - invoke the API call to create the race, then save the result
    const race = await createRace(player_id, track_id);
    console.log(race);
    // render starting UI
    renderAt('#race', renderRaceStartView(race.Track, race.Cars))
    // TODO - update the store with the race id
    store.race_id = race.ID - 1;
    // The race has been created, now start the countdown
    // TODO - call the async function runCountdown
    await runCountdown()
    // TODO - call the async function startRace
    await startRace(store.race_id);
    // TODO - call the async function runRace
    //console.log(store.race_id)
    await runRace(store.race_id)
  } catch (err) {
    console.log("Problem with handleCreateRace ::", err);
  }
}

function runRace(raceID) {

  return new Promise(resolve => {
    // TODO - use Javascript's built in setInterval method to get race info every 500ms
    const raceInterval = setInterval(() => {
      getRace(raceID)
        .then(res => {
          //console.log(res.positions);
          //TODO - if the race info status property is "in-progress", update the leaderboard by calling:
          if (res.status === "in-progress") {
            renderAt('#leaderBoard', raceProgress(res.positions))
            //TODO - if the race info status property is "finished", run the following:
          } else if (res.status === "finished") {
            console.log(res);
            clearInterval(raceInterval) // to stop the interval from repeating
            renderAt('#race', resultsView(res.positions)) // to render the results view
            resolve(res) // resolve the promise
          }
        })
        .catch(err => console.log("Problem with raceInterval ::", err))
    }, 500);

    // remember to add error handling for the Promise
  }).catch(err => console.log("Problem with runRace ::", err))


}

async function runCountdown() {
  try {
    // wait for the DOM to load
    await delay(1000)
    let timer = 3

    return new Promise(resolve => {
      // TODO - use Javascript's built in setInterval method to count down once per second
      const setTimer = setInterval(() => {
        // run this DOM manipulation to decrement the countdown for the user
        document.getElementById('big-numbers').innerHTML = --timer;
        // TODO - if the countdown is done, clear the interval, resolve the promise, and return
        if (timer === 0) {
          clearInterval(setTimer);
          return resolve(timer);
        }
      }, 1000);
    })
  } catch (error) {
    console.log("Problem with runCountdown ::", error);
  }
}

function handleSelectPodRacer(target) {
  console.log("selected a pod", target.id)

  // remove class selected from all racer options
  const selected = document.querySelector('#racers .selected')
  if (selected) {
    selected.classList.remove('selected')
  }

  // add class selected to current target
  target.classList.add('selected')

  // TODO - save the selected racer to the store
  store.player_id = parseInt(target.id);
  //console.log(store);
}

function handleSelectTrack(target) {
  console.log("selected a track", target.id)

  // remove class selected from all track options
  const selected = document.querySelector('#tracks .selected')
  if (selected) {
    selected.classList.remove('selected')
  }

  // add class selected to current target
  target.classList.add('selected')

  // TODO - save the selected track id to the store
  store.track_id = parseInt(target.id);
  //console.log(store);

}

async function handleAccelerate() {
  console.log("accelerate button clicked")
  // TODO - Invoke the API call to accelerate
  await accelerate(store.race_id)

}

// HTML VIEWS ------------------------------------------------
// Provided code - do not remove

function renderRacerCars(racers) {
  if (!racers.length) {
    return `
			<h4>Loading Racers...</4>
		`
  }

  const results = racers.map(renderRacerCard).join('')

  return `
		<ul id="racers">
			${results}
		</ul>
	`
}
//Custom Racer Names
const customRacerName = {
  "Racer 1": "Sailor Mars",
  "Racer 2": "Sailor Moon",
  "Racer 3": "Chibi usa",
  "Racer 4": "Sailor Mercury",
  "Racer 5": "Tuxedo Mask",
}

function renderRacerCard(racer) {
  //console.log(racer);
  const {
    id,
    driver_name,
    top_speed,
    acceleration,
    handling
  } = racer
  //console.log(driver_name);

  return `
		<li class="card podracer" id="${id}">
			<h3>${customRacerName[driver_name]}</h3>
			<p>Top Speed: ${top_speed}</p>
			<p>Acceleration: ${acceleration}</p>
			<p>Handling: ${handling}</p>
		</li>
	`
}

function renderTrackCards(tracks) {
  if (!tracks.length) {
    return `
			<h4>Loading Tracks...</4>
		`
  }

  const results = tracks.map(renderTrackCard).join('')
  //console.log(results);

  return `
		<ul id="tracks">
			${results}
		</ul>
	`
}

//Custom Track Names
const customTrackName = {
  "Track 1": "Moon Kingdom",
  "Track 2": "The Hell Tree",
  "Track 3": "Earth Kingdom",
  "Track 4": "Dark Kingdom",
  "Track 5": "Dead Moon Circus",
  "Track 6": "Space-Time",
}

function renderTrackCard(track) {
  //console.log(track);
  const {
    id,
    name
  } = track

  return `
		<li id="${id}" class="card track">
			<h3>${customTrackName[name]}</h3>
		</li>
	`
}

function renderCountdown(count) {
  return `
	<div class="withBigNum">
		<h2>Race Starts In...</h2>
		<p id="big-numbers">${count}</p>
		</div>
	`
}

function renderRaceStartView(track, racers) {
  return `
		<header>
			<h1>Race: ${customTrackName[track.name]}</h1>
		</header>
		<main id="two-columns">
			<section id="leaderBoard">
				${renderCountdown(3)}
			</section>

			<section id="accelerate">
			<div class="directions">
				<h2>Directions</h2>
				<p>Click the button as fast as you can to make your racer go faster!</p>
				</div>
				<div class="greenButton">
				<button id="gas-peddle">Click Me To Win!</button>
				</div>
			</section>
		</main>
		<footer></footer>
	`
}

function resultsView(positions) {
  positions.sort((a, b) => (a.final_position > b.final_position) ? 1 : -1)

  return `
		<header>
			<h1>Race Results</h1>
		</header>
		<main>
			${raceProgress(positions)}
			<div class="startNew">
			<a href="/race">Start a new race</a>
			</div>
		</main>
	`
}

function raceProgress(positions) {
  //let userPlayer = positions.find(e => e.id === store.player_id)
  //userPlayer.driver_name += " (you)"

  const raceTracks = positions.map(racer => {
    console.log(racer);
    const completion = racer.segment / 201;
    const completePercentage = completion * 100;
    //console.log(completePercentage);
    return `
    <div class="racetrack">
		<div class="race-car" style="bottom:${completion*50}%"></div>
		<div class="racer-name">
		<div>${customRacerName[racer.driver_name]}</div>
		<div>${Math.round(completePercentage)}%</div>
		</div>
		</div>
		`
  }).join('');

  positions = positions.sort((a, b) => (a.segment > b.segment) ? -1 : 1)
  let count = 1

  const results = positions.map(p => {

    if (p.id === store.player_id) {
      return `
				<tr>
					<td>
						<h3>${count++} - ${customRacerName[p.driver_name]} (you)</h3>
					</td>
				</tr>
			`
    }
    return `
			<tr>
				<td>
					<h3>${count++} - ${customRacerName[p.driver_name]}</h3>
				</td>
			</tr>
		`
  }).join(' ')

  return `
		<main>
			<h3>Leaderboard</h3>
			<section id="leaderBoard" class="leaderBoardDisplay">
			<div class="progressSection">
				${results}
				</div>
				<div class="progressRacetracks">
				${raceTracks}
				</div>
			</section>
		</main>
	`
}

function renderAt(element, html) {
  const node = document.querySelector(element)

  node.innerHTML = html
}

// ^ Provided code ^ do not remove


// API CALLS ------------------------------------------------

const SERVER = 'http://localhost:8000'

function defaultFetchOpts() {
  return {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': SERVER,
    },
  }
}

// TODO - Make a fetch call (with error handling!) to each of the following API endpoints

function getTracks() {
  // GET request to `${SERVER}/api/tracks`
  return fetch(`${SERVER}/api/tracks`)
    .then(response => response.json())
    //.then(res => console.log(res))
    .catch(err => console.log(err));
}

function getRacers() {
  // GET request to `${SERVER}/api/cars`
  return fetch(`${SERVER}/api/cars`)
    .then(response => response.json())
    //.then(res => console.log(res))
    .catch(err => console.log(err));
}

function createRace(player_id, track_id) {
  player_id = parseInt(player_id)
  track_id = parseInt(track_id)
  const body = {
    player_id,
    track_id
  }
  //console.log(body);

  return fetch(`${SERVER}/api/races`, {
      method: 'POST',
      ...defaultFetchOpts(),
      dataType: 'jsonp',
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    //.then(res => console.log(res))
    .catch(err => console.log("Problem with createRace request::", err))
}

function getRace(id) {
  // GET request to `${SERVER}/api/races/${id}`
  return fetch(`${SERVER}/api/races/${id}`)
    .then(response => response.json())
    //.then(res => console.log(res))
    .catch(err => console.log(err));
}

function startRace(id) {
  return fetch(`${SERVER}/api/races/${id}/start`, {
      method: 'POST',
      ...defaultFetchOpts(),
    })
    .catch(err => console.log("Problem with startRace request::", err))
}

function accelerate(id) {
  // POST request to `${SERVER}/api/races/${id}/accelerate`
  // options parameter provided as defaultFetchOpts
  // no body or datatype needed for this request
  return fetch(`${SERVER}/api/races/${id}/accelerate`, {
      method: 'POST',
      ...defaultFetchOpts(),
    })
    .catch(err => console.log("Problem with accelerate request::", err))
}
