interface Curso {
  codigo: string
  nombre_curso: string
  codDocente: string
}

interface Evaluaciones {
  codigo: string
  codCurso: string
  nombre_evaluacion: string
}

interface Notas {
  codigo: string
  codevaluacion: string
  codusuario: string
  nombre: string
  apepaterno: string
  apematerno: string
  nota: number
  estado?: number
}

export type { Curso, Evaluaciones, Notas }
