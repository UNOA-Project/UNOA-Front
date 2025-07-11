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

export const getUserInfo = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    withCredentials: true,
  })
  return response.data
}

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, null, {
    withCredentials: true,
  })
  return response.data
}

export const getUserBenefits = async id => {
  const response = await axios.get(`${API_URL}/user/benefits/${id}`, null, {
    withCredentials: true,
  })
  return response.data
}

export const changePassword = async ({ newPassword }) => {
  const response = await axios.post(
    `${API_URL}/auth/change-password`,
    { newPassword },
    {
      withCredentials: true,
    }
  )
  return response.data
}
