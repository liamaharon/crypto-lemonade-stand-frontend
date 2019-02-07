import axios from 'axios';
import router from '../router';

const DEFAULT_ROOT = 'http://localhost:3000/api';
const UNAUTHORIZED = 401;

// redirect user to login on 401
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;
      if (status === UNAUTHORIZED) {
        router.push('/login?forbiddenMsg=true');
      }
    }
    let errorMsg = error.message;
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message)
      errorMsg += `: ${error.response.data.error.message}`;
    return Promise.reject(errorMsg);
  }
);

export default function ({ method, path, token, data = null, root = DEFAULT_ROOT }) {
  let url = `${root}${path}`;
  if (token) url += `?access_token=${token}`;
  return axios({
    method,
    url,
    data
  });
}
