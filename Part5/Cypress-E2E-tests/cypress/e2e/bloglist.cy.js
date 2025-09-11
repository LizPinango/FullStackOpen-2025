describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Pedro Perez',
      username: 'user1',
      password: 'pass123'
    }) 
    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Maria Gomez',
      username: 'user2',
      password: 'clave456'
    }) 
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

    describe('and a blog exist', function() {
      beforeEach(function() {
        // 1. Intercept the POST petition and give it an alias
        cy.intercept('POST', '/api/blogs').as('createBlog');

        // 2. Execute the action that tirggers the POST petition
        cy.contains('button', 'New Blog').click()
        cy.contains('label', 'Title').type('Test Blog')
        cy.contains('label', 'Author').type('Test Author')
        cy.contains('label', 'Url').type('Test Url')        
        cy.get('#add-blog-btn').click()

        // 3. Wait for the petition to complete 
        cy.wait('@createBlog');
      })

      it('a blog can be liked', function() {
        cy.contains('button', 'show more').click()
        cy.contains('button', 'like').click()

        cy.contains('likes 1')
      })

      it('the user that created the blog can delete it', function() {
        cy.contains('button', 'show more').click()
        cy.contains('button', 'delete').click()
        
        cy.get('.notification-box').contains("'Test Blog' by Test Author deleted")
        cy.get('html').should('not.contain', 'Test Blog - Test Author')
      })

      it('it can not be deleted by other users', function() {
        cy.contains('button', 'Logout').click()

        cy.get('input:first').type('user2')
        cy.get('input:last').type('clave456')
        cy.get('#login-btn').click()

        cy.contains('button', 'show more').click()
        cy.contains('delete').should('not.exist') 
      })
    })
  })
})