import axios from 'axios';

/**
 * @desc get ethereum gas prices
 * @return {Promise}
 */
export const apiGetGasPrices = () =>
  axios.get(`https://ethgasstation.info/json/ethgasAPI.json`);
