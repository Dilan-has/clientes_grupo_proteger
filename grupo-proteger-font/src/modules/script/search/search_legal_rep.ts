import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export async function search_legal_rep(): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/legal-reps`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching legal_rep:', error)
    return null
  }
}
