import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000"
})



export const showUsers = async () => {
  const resp = await api.get('/users');
  console.log(resp)
  return resp.data
}