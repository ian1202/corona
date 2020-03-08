import axios from 'axios'

const baseURL = "https://localhost3000/users"

const api = axios.create({
  baseURL: baseURL
})

// =========== Seeded Profiles ===========

export const getAllProfiles = async () => {
  const resp = await api.get('/users');
  return resp.data;
}