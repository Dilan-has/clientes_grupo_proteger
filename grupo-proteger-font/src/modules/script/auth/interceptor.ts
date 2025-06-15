export const addAuthHeader = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('token')
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(url, options)
}
