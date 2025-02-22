import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql `
  query {
    getAllCategory {
      response {
        category_name
        _id
        image
      }
    }
  }
`

export const GET_ALL_CATEGORIES = gql`
query {
  getAllCategory {
    status
    result
    response {
      _id
      category_name
      image
      is_parent
      parent_id
      status
      createdAt
      updatedAt
      children {
        _id
        category_name
        image
        is_parent
        parent_id
        status
        createdAt
        updatedAt
      }
    }
  }
}`


export const GET_ALL_LISTINGS = gql`
query GetAllProductAdminTable($orderBy: SortInput, $limit: Int, $skip: Int) {
  getAllProductAdminTable(orderBy: $orderBy, limit: $limit, skip: $skip) {
    count
    responce {
      _id
      title
      category_name
      explore_products
      new_arrivals
      top_selling_products 
      clearance_sale
      total_available_count
    }
    result
    status
  }
}`


export const GET_PRODUCT_BY_ID = gql`
query GetProductById($getProductByIdId: ID!) {
  getProductById(id: $getProductByIdId) {
    status
    result
    responce {
      id
      title
      description
      category_id
      size_and_price {
        _id
        size
        price
        discount
        display_price
        colors {
          color
          available_count
          sold_out
        }
      }
      status
      image
      total_available_count
      explore_products
      new_arrivals
      top_selling_products
      clearance_sale
      createdAt
      updatedAt
    }
  }
}`

export const GET_ALL_ADS = gql`
query GetAllAd {
  getAllAd {
    status
    result
    response {
      _id
      imageUrl
      status
      createdAt
      updatedAt
      url
    }
  }
}`

export const GET_USERS = gql`
query GetAllUserAdminTable($orderBy: SortInput, $limit: Int, $skip: Int) {
  getAllUserAdminTable(orderBy: $orderBy, limit: $limit, skip: $skip) {
    status
    result
    responce {
      _id
      firstName
      lastName
      email
      phone_number
      status
    }
    count
  }
}`