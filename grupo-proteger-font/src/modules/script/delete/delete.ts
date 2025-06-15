import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export const delete_affiliate = async (id: number): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/affiliates/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}

export const delete_client = async (id: number): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/clients/${id}`, {
      method: 'DELETE'
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

export const delete_credential = async (id: number): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/credentials/${id}`, {
      method: 'DELETE'
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
