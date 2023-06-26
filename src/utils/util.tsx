const procesarResponse = async (response: Response): Promise<any> => {
  if (response.ok && (response.body != null)) {
    const reader = response.body.getReader()
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      chunks.push(new Uint8Array(value))
    }
    // Convertir los chunks a un array de tipo number[]
    const buffer = chunks.reduce((acc, chunk) => new Uint8Array([...acc, ...Array.from(chunk)]), new Uint8Array())
    // Convertir el array a una cadena de texto
    const data = new TextDecoder().decode(new Uint8Array(buffer))
    return JSON.parse(data.toString())
  }
}

const convertImageToBase64 = async (file: File): Promise<Blob | string | ArrayBuffer | null> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export { procesarResponse, convertImageToBase64 }
