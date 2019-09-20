
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return (localStorage.getItem('token'))
}

export const delToken = () => {
  localStorage.removeItem('token')
}

export const setAuth = (value) => {
  localStorage.setItem('isAuthUser', value)
}

export const delAuth = () => {
  return (localStorage.removeItem('isAuthUser'))
}

export const getAuth = () => {
  return (localStorage.getItem('isAuthUser'))
}

export const getApiUrl = () => "http://127.0.0.1:3000"
