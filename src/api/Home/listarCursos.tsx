const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL

export const listarCursos = async (): Promise<Response> => {
  try {
    const token = localStorage.getItem('token') ?? ''
    const response = await fetch(`${apiBaseUrl}/curso`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })

    return response
  } catch (error) {
    console.error('Error al llamar a la API de inicio de sesión', error)
    throw error
  }
}
