import axios from 'axios';

export const BASE_API_URL = process.env.REACT_APP_BACKEND_URL + '/api/v1';

const Service = url =>
  axios.create({
    baseURL: BASE_API_URL + url
  });

export const AuthorizedService = url => {
  const authorizedService = Service(url);
  return authorizedService;
};
