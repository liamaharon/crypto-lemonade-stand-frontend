import axios from 'axios';

const DEFAULT_ROOT = 'http://localhost:3000/api';

export default function (method, path, data = null, root = DEFAULT_ROOT) {
  return axios({
    method,
    url: `${root}${path}`,
    data
  })
}
