import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export const updateCredential = async (credential: Credential): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/credentials`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credential)
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching credential:', error)
    return null
  }
}
