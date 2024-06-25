import { BASE_URL } from "./config.js"
// import { getDataAsJSON } from "./utilities.js";

export const getDataAsJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
}
export const state = {
  stations: [],
  trains: [],
  routes: [],
  trips: [],
  selectedTrain: {},
  isUserLoggedIn: false,
  isAdminLoggedIn: false,
  userDetails: {
    // username:,
    // firstName:,
    // lastName:,
    // address:,
    // gender:,
    // dob:
  },
  adminDetails: {
    username: "",

  },
  search: {
    source: "",
    sourceStationName: "",
    destination: "",
    destinationStationName: "",
    dateOfJourney: "",
  }

}

export const loadTrains = async function () {
  try {
    const data = await getDataAsJSON(`${BASE_URL}/api/admin/trains`);
    state.trains = data.data;
  } catch (err) {
    console.log(err);
  }
}


export const loadStations = async function () {
  try {
    const data = await getDataAsJSON(`${BASE_URL}/api/admin/stations`);
    state.stations = data.data;
  } catch (err) {
    console.log(err);
  }
}

export const loadTrips = async function () {
  try {
    const data = await getDataAsJSON(`${BASE_URL}/api/admin/trips`);
    state.trips = data.data;
  } catch (err) {
    console.log(err);
  }
}

export const loadRoutes = async function () {
  try {
    const data = await getDataAsJSON(`${BASE_URL}/api/admin/routes`);
    state.routes = data.data;
  } catch (err) {
    console.log(err);
  }
}


export const getTrainSchedule = async function (sourceStation, destinationStation, dateOfJourney) {
  try {
    const data = await getDataAsJSON(`${BASE_URL}/api/get/schedule?source=${sourceStation}&destination=${destinationStation}&dateOfJourney=${dateOfJourney}`)
    state.trains = data.data;
  } catch (err) {
    console.log(err);
  }
}



