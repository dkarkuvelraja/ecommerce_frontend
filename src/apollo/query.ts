import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
query GetAllCategory {
  getAllCategory {
    status
    result
    response {
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