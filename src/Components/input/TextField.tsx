import React from 'react'
import './input.css';

interface TextFieldWithLabelProps  { 
  label: string, type: string, handleOnChange: Function, placeHolder?: string , name? : string,errors? : string
}

export function TextFieldWithLabel({ label, type, handleOnChange, placeHolder= '',name,errors } : TextFieldWithLabelProps) {
  return (
    <div className='form-control'>
      <label>{label}</label>
      <input id={type} type={type} name = {name} placeholder={placeHolder} onChange={(e) => handleOnChange(e)} />
     {errors &&
     <p className="errorText" style={{ color: "red" }}>{errors}</p>
     } 
    </div>
  )
}