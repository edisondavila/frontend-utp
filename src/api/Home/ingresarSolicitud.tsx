const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL

export const ingresarSolicitud = async (codEvaluacionUsuario: string, archivo: Blob | string | ArrayBuffer | null, nota: number): Promise<Response> => {
  try {
    const token = localStorage.getItem('token') ?? ''
    console.log('el token: ', token)
    const response = await fetch(`${apiBaseUrl}/solicitud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ solicitud: { codEvaluacionUsuario, archivo, nota } })
    })

    return response
  } catch (error) {
    console.error('Error al llamar a la API de inicio de sesión', error)
    throw error
  }
}
