import React from 'react'
import './input.css';

interface TextFieldWithLabelProps  { 
  label: string, type: string, handleOnChange: Function, placeHolder?: string 
}

export function TextFieldWithLabel({ label, type, handleOnChange, placeHolder= '' } : TextFieldWithLabelProps) {
  return (
    <div className='form-control'>
      <label>{label}</label>
      <input id={type} type={type} placeholder={placeHolder} onChange={(e) => handleOnChange(e)} />
    </div>
  )
}