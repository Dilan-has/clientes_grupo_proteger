import { addAuthHeader } from '@/modules/script/auth/interceptor.ts'

export async function search_client(id: number): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/clients/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}

export async function search_client_Nit(nit: string): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/clients/nit/${nit}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}

export async function search_client_legal_rep(id: number): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/clients/legal-rep/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return null
  }
}

export async function search_all_clients(): Promise<any> {
  try {
    const response = await addAuthHeader(`http://localhost:8080/api/v1/clients`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching affiliate:', error)
    return
  }
}
