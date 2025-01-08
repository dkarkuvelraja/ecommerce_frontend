import React from 'react'
import { TextInput } from '../../../assets/style/index.ts'

export default function TextInputComponent(props) {
  return (
    // <TextInput>
        <TextInput type = "text" name = {props.name} onChange={props.change} value = {props.value} placeholder={props.placeholder}/>
    // </TextInput>
  )
}
