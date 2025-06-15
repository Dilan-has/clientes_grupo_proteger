import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export async function search_affiliate(cc: string): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/affiliates/cc/${cc}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}

export async function search_affiliates(id: number): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/affiliates/client/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}

export async function search_affiliate_id(id: number): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/affiliates/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}
