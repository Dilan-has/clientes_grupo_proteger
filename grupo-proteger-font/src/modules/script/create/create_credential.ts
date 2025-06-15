import { addAuthHeader } from '@/modules/script/auth/interceptor'

export const createCredential = async (credential: Credential): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credential)
    })
    console.log(JSON.stringify(credential))
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}
