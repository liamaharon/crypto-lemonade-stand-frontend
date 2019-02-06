import axios from 'axios';

const DEFAULT_ROOT = 'http://localhost:3000/api';

export default function ({ method, path, token, data = null, root = DEFAULT_ROOT }) {
  let url = `${root}${path}`;
  if (token) url += `?access_token=${token}`;
  return axios({
    method,
    url,
    data
  });
}
