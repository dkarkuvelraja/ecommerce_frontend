import React from 'react'
import { TextInput } from '../../../assets/style/index'

export default function TextInputComponent(props : any) {
  return (
    // <TextInput>
        <TextInput type = "text" name = {props.name} onChange={props.change} value = {props.value} placeholder={props.placeholder}/>
    // </TextInput>
  )
}
