export const login = async (credentials: Credentials): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    localStorage.setItem('token', data.token)
    return data
  } catch (error) {
    console.error('Error fetching credential:', error)
    return null
  }
}
