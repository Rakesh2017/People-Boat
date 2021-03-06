import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`

export const GET_MY_BOATS = gql`
  query PersonWithBoats($personId: String!) {
    personWithboats(personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const ADD_BOAT = gql`
  mutation AddPerson($year: String!, $make: String!, $model: String!, $price: String!, $id:id!, $personId:personId) {
    addPerson(id: $id, make: $make, model: $model, price: $price,id: $id, personId:$personId) {
      year
      make
      model
      price
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`
