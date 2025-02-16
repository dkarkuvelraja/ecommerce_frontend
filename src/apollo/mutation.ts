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

export const CREATE_CATEGORY = gql`
mutation CreateCategory($data: CreateCategoryInput!) {
  createCategory(data: $data) {
    result
    status
  }
}`

export const CREATE_PRODUCT = gql`
mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    status
    result
  }
}`

export const UPDATE_CATEGORY = gql`
mutation EditCategory($data: editCategoryInput!) {
  editCategory(data: $data) {
    status
    result
  }
}`

export const DELETE_CATEGORY =  gql`mutation DeleteCategory($data: deleteCategoryInput!) {
  deleteCategory(data: $data) {
    result
    status
  }
}`

export const EDIT_CATEGORY = gql`
mutation EditProduct($data: EditProductInput!) {
  editProduct(data: $data) {
    result
    status
  }
}`


export const CREATE_AD = gql`mutation CreateAd($data: CreateAdInput!) {
  createAd(data: $data) {
    result
    status
  }
}`