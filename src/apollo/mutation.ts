import { gql } from "@apollo/client"
export const USER_RGN = gql
  `mutation Register($data: registerIn) {
    Register(data: $data) {
      status
      result
    }
  }`