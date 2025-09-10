describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Pedro Perez',
      username: 'user1',
      password: 'pass123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('user1')
      cy.get('input:last').type('pass123')
      cy.get('#login-btn').click()

      cy.contains('Pedro Perez logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('user1')
      cy.get('input:last').type('nopass')
      cy.get('#login-btn').click()

      cy.get('.error-box').contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('user1')
      cy.get('input:last').type('pass123')
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function() {
      cy.contains('button', 'New Blog').click()
      cy.contains('label', 'Title').type('Test Blog')
      cy.contains('label', 'Author').type('Test Author')
      cy.contains('label', 'Url').type('Test Url')
      cy.get('#add-blog-btn').click()

      cy.get('.notification-box').contains("a new blog 'Test Blog' by Test Author added")
      cy.contains('Test Blog - Test Author')
    })
  })
})