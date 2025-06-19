import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACK_URL}/api`

export const registerUser = async userData => {
  const response = await axios.post(`${API_URL}/auth/register`, userData)
  return response.data
}
