import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export const updateAffiliate = async (affiliate: Affiliate): Promise<any> => {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/affiliates`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(affiliate)
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
