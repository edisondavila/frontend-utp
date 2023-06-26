/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react'
import { listarCursos } from '../api/Home/listarCursos'
import { listarEvaluaciones } from '../api/Home/listarEvaluaciones'
import { listarNotas } from '../api/Home/listarNotas'
import { ingresarSolicitud } from '../api/Home/ingresarSolicitud'
import { type Curso, type Evaluaciones, type Notas } from '../utils/types'
import { procesarResponse, convertImageToBase64 } from '../utils/util'
import { FaCircle } from 'react-icons/fa'

const Home: React.FC = () => {
  const [selectedItem1, setSelectedItem1] = useState('')
  const [selectedItem2, setSelectedItem2] = useState('')
  const [selectedListItem, setSelectedListItem] = useState<Notas>()
  const [listItems, setListItems] = useState<Notas[]>([])
  const [dropdownOptions1, setDropdownOptions1] = useState<Curso[]>([])
  const [dropdownOptions2, setDropdownOptions2] = useState<Evaluaciones[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apepaterno: '',
    apematerno: '',
    notaActual: '',
    numeroEntero: 1,
    archivoImagen: null
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const obtenerDropdownItems1 = async (): Promise<void> => {
    try {
      const response = await listarCursos()
      if (response.ok && response.body != null) {
        const data = await procesarResponse(response)
        setDropdownOptions1(data.cursos)
      }
    } catch (error) {
      console.error('Error fetching dropdown options 1:', error)
    }
  }

  useEffect(() => {
    void obtenerDropdownItems1()
  }, [])

  const obtenerDropdownItems2 = async (): Promise<void> => {
    try {
      const response = await listarEvaluaciones(selectedItem1)
      if (response.ok && response.body != null) {
        const data = await procesarResponse(response)
        setDropdownOptions2(data.evaluaciones)
      }
    } catch (error) {
      console.error('Error fetching dropdown options 1:', error)
    }
  }

  useEffect(() => {
    void obtenerDropdownItems2()
  }, [selectedItem1])

  const obtenerListItems = async (): Promise<void> => {
    try {
      const response = await listarNotas(selectedItem1)
      if (response.ok && response.body != null) {
        const data = await procesarResponse(response)
        setListItems(data.notas)
      }
    } catch (error) {
      console.error('Error fetching dropdown options 1:', error)
    }
  }

  useEffect(() => {
    void obtenerListItems()
  }, [selectedItem2])

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showSuccessMessage])
  const handleDropdown1Change = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedItem = event.target.value
    setSelectedItem1(selectedItem)
    setSelectedItem2('')
    setDropdownOptions2([])
    setShowForm(false)
  }

  const handleDropdown2Change = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedItem = event.target.value
    setSelectedItem2(selectedItem)
    setListItems([])
    setShowForm(false)
  }

  const handleFormButtonClick = (item: Notas): void => {
    setSelectedListItem(item)
    console.log(selectedListItem)
    setShowForm(true)
  }
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    // console.log(selectedListItem)
    // console.log(event.target)
    // console.log(formData)
    try {
      let archivoImagen
      if (formData.archivoImagen !== null) {
        archivoImagen = await convertImageToBase64(formData.archivoImagen)
        console.log(archivoImagen)
      }
      if (selectedListItem != null && archivoImagen != null) {
        await ingresarSolicitud(selectedListItem.codigo, archivoImagen, formData.numeroEntero)
        setShowSuccessMessage(true)
      }
      setSelectedItem1('')
      setSelectedItem2('')
      setListItems([])
      setShowForm(false)
    } catch (error) {
      alert('Error al crear la solicitud, intente nuevamente')
    }
  }

  const handleChange = (event: any): void => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (event: any): void => {
    const file = event.target.files[0]
    setFormData({ ...formData, archivoImagen: file })
  }

  return (
    <div className="container mx-auto mt-8 flex">
      {showSuccessMessage && (
        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p className="font-bold">La solicitud ha sido creada con éxito</p>
          </div>
        </div>
      </div>
      )}
      <div className="w-1/2 mx-10">
        <h2 className="text-2xl font-bold mb-4">Menu Docente</h2>

        <div className="flex flex-col gap-4">
          {dropdownOptions1.length > 0 && (
            <select
              value={selectedItem1}
              onChange={handleDropdown1Change}
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccionar Curso</option>
              {dropdownOptions1.map((curso) => (
                <option key={curso.codigo} value={curso.codigo}>
                  {curso.nombre_curso}
                </option>
              ))}
            </select>
          )}

          {dropdownOptions2.length > 0 && (
            <select
              value={selectedItem2}
              onChange={handleDropdown2Change}
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccionar Evaluacion</option>
              {dropdownOptions2.map((evaluaciones) => (
                <option key={evaluaciones.codigo} value={evaluaciones.codigo}>
                  {evaluaciones.nombre_evaluacion}
                </option>
              ))}
            </select>
          )}

          {dropdownOptions2.length < 1 && selectedItem1 !== '' && (
            <h3 className="text-2xl font-bold mb-4">No tiene Pruebas Creadas</h3>
          )}
        </div>

        {selectedItem2 !== '' && (
          <ul role="list" className="divide-y divide-gray-100">
            {listItems.map((notas) => (
              <li key={notas.codigo} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {notas.codigo + ' ' + notas.nombre + ' ' + notas.apepaterno + ' ' + notas.apematerno}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-row sm:items-end">
                  <div className="flex gap-x-2 items-center">
                    <p className="text-lg font-semibold leading-6 text-blue-600">{notas.nota}</p>
                    {notas.estado !== null && notas.estado === 1
                      ? (
                      <div className="flex items-center">
                        <FaCircle className="text-yellow-500" />
                        <p className="text-sm leading-6 text-gray-500">Pendiente</p>
                      </div>
                        )
                      : (
                      <button
                        onClick={() => { handleFormButtonClick(notas) }}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600"
                      >
                        Rectificar
                      </button>
                        )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (selectedListItem != null) && (
  <div className="w-1/2  border-l-2">

    <form className="mt-4 mx-5" onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="nombre" className="block mb-1">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={selectedListItem.nombre}
          readOnly
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apepaterno" className="block mb-1">Apellido Paterno:</label>
        <input
          type="text"
          id="apepaterno"
          value={selectedListItem.apepaterno}
          readOnly
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apematerno" className="block mb-1">Apellido Materno:</label>
        <input
          type="text"
          id="apematerno"
          value={selectedListItem.apematerno}
          readOnly
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nota-actual" className="block mb-1">Nota Actual:</label>
        <input
          type="text"
          id="nota-actual"
          value={selectedListItem.nota}
          readOnly
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nueva-nota" className="block mb-1">Nueva Nota:</label>
        <input
          type="number"
          id="nueva-nota"
          name="numeroEntero"
          value={formData.numeroEntero}
          onChange={handleChange}
          min="1"
          max="20"
          required
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="imagen" className="block mb-1">Subir Imagen:</label>
        <input
          type="file"
          id="imagen"
          name="archivoImagen"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Enviar
      </button>
    </form>

  </div>
      )}

    </div>
  )
}

export default Home
