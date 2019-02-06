import axios from 'axios';
import router from '../router';

const DEFAULT_ROOT = 'http://localhost:3000/api';
const UNAUTHORIZED = 401;
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      router.push('/login?forbiddenMsg=true');
    }
    return Promise.reject(error);
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
