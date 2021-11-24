const request = require('request-promise-native');
const ipApiUrl = 'https://api.ipify.org';

const fetchMyIP = () => {
  return request(ipApiUrl);
};

const fetchCoordsByIP = (ip) => {
  return request(`https://api.freegeoip.app/json/${ip}?apikey=a6f402c0-4b20-11ec-a3ba-e3bb3ca15c24`);
};

const fetchISSFlyOverTimes  = (latitude, longitude) => {
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };