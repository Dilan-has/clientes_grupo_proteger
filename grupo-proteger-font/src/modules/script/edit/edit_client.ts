import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export const updateClient = async (client: Client): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/clients`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching client:', error)
    return null
  }
}
