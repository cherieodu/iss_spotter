const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
.then( ip => fetchCoordsByIP(ip))
.then(data => {
  let parsedData = JSON.parse(data);
  return (fetchISSFlyOverTimes(parsedData["latitude"], parsedData["longitude"]));
})
.then(data => {
  let parsedData = JSON.parse(data);
  let result = parsedData["response"];
  for (let times of result) {
    let time = new Date(times['risetime']);
    console.log(`Next pass at ${time} for ${times['duration']} seconds!`);
  }
})
.catch(message => console.log(message))

