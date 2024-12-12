import { gql } from "@apollo/client"
export const USER_RGN = gql
  `mutation Register($data: registerIn) {
    Register(data: $data) {
      status
      result
    }
  }`

  export const USER_LOGIN = gql`
  mutation Login($data: loginIn) {
  login(data: $data) {
    status
    result
    response
  }
}`