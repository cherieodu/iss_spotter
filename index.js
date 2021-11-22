const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!

  for (let times of passTimes) {
    let time = new Date(times['risetime']);
    console.log(`Next pass at ${time} for ${times['duration']} seconds!`);
  }
});

