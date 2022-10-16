// @ts-ignore
context('register', ()=>{
  it('should create a new user',()=>{
    cy.visit('http://localhost:3002/auth/login')
    cy.wait(1000)
    cy.get('#Register').click()
    cy.get('#Name').type('Pavel')
    cy.findByRole('textbox', {
      name: /surname/i
    }).type('Ivon')
    cy.findByRole('textbox', {
      name: /email/i
    }).type('ivon@example.cz')
    cy.get('#Password').type('123')
    cy.findByLabelText(/password again/i).type('123')
    cy.get('#RegisterButton').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain','Successfully registered')
    cy.wait(2000)
  })
  it('should not pass because user with these credentials already exists',()=>{
    cy.visit('http://localhost:3002/auth/login')
    cy.wait(1000)
    cy.get('#Register').click()
    cy.get('#Name').type('Pavel')
    cy.findByRole('textbox', {
      name: /surname/i
    }).type('Ivon')
    cy.findByRole('textbox', {
      name: /email/i
    }).type('ivon@example.com')
    cy.get('#Password').type('123')
    cy.findByLabelText(/password again/i).type('123')
    cy.get('#RegisterButton').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain','Email is already taken')
    cy.wait(2000)
  })
})

describe('login', ()=>{
  it('should login user',()=>{
    cy.visit('http://localhost:3002/auth/login')
    cy.findByRole('textbox', {
      name: /email/i
    }).type('ivon@example.com')
    cy.get('#Password').type('123')
    cy.get('#LoginButton').click()
  })
})

describe('logout', ()=>{
  it('should login user',()=>{
    cy.visit('http://localhost:3002/auth/login')
    cy.wait(1000)
    cy.findByRole('textbox', {
      name: /email/i
    }).type('ivon@example.com')
    cy.get('#Password').type('123')
    cy.get('#LoginButton').click()
    cy.wait(1000);

    cy.findByText(/log out/i).click()
  })

})