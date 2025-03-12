import React from 'react'
import AuthLayout from './AuthLayout'

describe('<AuthLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AuthLayout />)
  })
})