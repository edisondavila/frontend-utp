/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '../components/login/textField'
import Button from '../components/login/button'
import 'tailwindcss/tailwind.css'
import { useAuthContext } from '../utils/AuthContext'
import { login } from '../api/auth/login'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated, setAuthenticated } = useAuthContext()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    // Lógica para enviar las credenciales al backend
    try {
      const response = await login(email, password)
      if (response.ok) {
        // El inicio de sesión fue exitoso
        const data = await response.json()
        console.log(data)
        const token = data.token
        // Guardar el token en el almacenamiento local (ejemplo con localStorage)
        localStorage.setItem('token', token)
        // Redirigir al módulo de Home
        // setAuthenticated(localStorage.getItem('token') !== null)
        setAuthenticated(true)
        console.log(localStorage.getItem('token') !== null)
        console.log('el is authenticated', isAuthenticated)
        navigate('/home')
      } else {
        // El inicio de sesión falló
        console.error('Error al iniciar sesión')
      }
    } catch (error) {
      console.error('Error al enviar la solicitud', error)
    }
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/5/50/Utplogonuevo.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Bienvenido
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <TextField label="Email" value={email} onChange={setEmail} type="email" />
            <TextField label="Password" value={password} onChange={setPassword} type="password" />
            <Button label= "Ingresar" />
          </form>
      </div>
    </div>

  )
}

export default LoginPage
