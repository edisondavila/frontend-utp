import React from 'react'

import 'tailwindcss/tailwind.css'
interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type: string
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, type }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={type}
          name={type}
          type={type}
          autoComplete={type}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
          onChange={(e) => { onChange(e.target.value) }}
        />
      </div>
    </div>
  )
}

export default TextField
