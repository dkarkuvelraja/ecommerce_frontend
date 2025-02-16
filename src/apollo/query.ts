import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
query Query {
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
      category_name
      likes
      sold_out_count
      title
      total_available_count
      _id
    }
    result
    status
  }
}`


export const GET_PRODUCT_BY_ID = gql`
query GetProductById($getProductByIdId: ID!) {
  getProductById(id: $getProductByIdId) {
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
      sold_out_count
      likes
      total_available_count
      createdAt
      updatedAt
    }
    result
    status
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
    }
  }
}`