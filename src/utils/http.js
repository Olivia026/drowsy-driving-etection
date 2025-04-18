import axios from 'axios'

export default axios.create({
  baseURL: 'https://official-api.hsmap.com',
  timeout: 5000,
});