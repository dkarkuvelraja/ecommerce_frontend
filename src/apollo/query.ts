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