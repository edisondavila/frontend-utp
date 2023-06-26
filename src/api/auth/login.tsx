const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL
// console.log(apiBaseUrl)
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.BASE_URL)
// console.log(import.meta.env.PROD)
// console.log(import.meta.env.DEV)
// console.log(import.meta.env.SSR)
export const login = async (email: string, password: string): Promise<Response> => {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario: email, contraseña: password })
    })

    return response
  } catch (error) {
    console.error('Error al llamar a la API de inicio de sesión', error)
    throw error
  }
}
