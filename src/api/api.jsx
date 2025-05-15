import axios from 'axios';

export const API_REQUEST = async (method, url, data, headers) => {
  const reqConfig = {
    method,
    url,
    data,
    headers: headers ? headers : {'Content-Type': 'application/json'},
  };
  const rtnVal = await axios(reqConfig);
  return rtnVal;
};
