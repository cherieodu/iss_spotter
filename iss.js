const request = require('request');
const ipApiUrl = 'https://api.ipify.org';


const fetchMyIP = callback => {
  request(ipApiUrl, (error, response, data) => {
    if (error) {
      callback(error);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      callback(Error(msg));
    }
    
    
    callback(error, data);
  });
};

const fetchCoordsByIP = (ip, callback) => {

  request(`https://api.freegeoip.app/json/${ip}?apikey=a6f402c0-4b20-11ec-a3ba-e3bb3ca15c24`, (error, response, data) => {
    if (error) {
      callback(error);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching GEO coordinates . Response: ${data}`;
      callback(Error(msg));
    }

    let parsedData = JSON.parse(data);
    let result = {latitude: parsedData["latitude"], longitude: parsedData["longitude"]};
    callback(error, result);
  });
};

const fetchISSFlyOverTimes  = (coordinates, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates["latitude"]}&lon=${coordinates["longitude"]}`, (error, response, data) => {
    if (error) {
      callback(error);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times . Response: ${data}`;
      callback(Error(msg));
    }
    
    let parsedData = JSON.parse(data);
    let result = parsedData["response"];
    callback(error, result);
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback('There was an error! Here it is:', error);
      return;
    }
  
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback('Error!', error);
        return;
      }

  
      fetchISSFlyOverTimes(coordinates, (error, flyoverTimes) => {
        if (error) {
          callback('Error!', error);
          return;
        }
      
        callback(error, flyoverTimes);
      });
    });
  
  });
};

module.exports = { nextISSTimesForMyLocation };