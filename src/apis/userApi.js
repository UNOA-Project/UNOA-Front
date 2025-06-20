import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACK_URL}/api`

export const registerUser = async userData => {
  const response = await axios.post(`${API_URL}/auth/register`, userData)
  return response.data
}

export const checkUserIdDuplicate = async userId => {
  const response = await axios.get(`${API_URL}/auth/check-id`, {
    params: { userId },
  })
  return response.data
}

export const loginUser = async ({ userId, password }) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    { userId, password },
    {
      withCredentials: true,
    }
  )
  return response.data
}
