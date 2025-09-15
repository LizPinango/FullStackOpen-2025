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
      cy.login({ username: 'user1', password: 'pass123' })
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
        cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'Test Url' })
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
        cy.login({ username: 'user2', password: 'clave456' })

        cy.contains('button', 'show more').click()
        cy.contains('delete').should('not.exist') 
      })
    })

    describe('and serveral blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First Blog', author: 'Author 1', url: 'Url 1' })
        cy.createBlog({ title: 'Second Blog', author: 'Author 2', url: 'Url 2' })
        cy.createBlog({ title: 'Third Blog', author: 'Author 3', url: 'Url 3' })
      })

      it('the blogs are arranged in order of likes', function() {
        cy.get('.blog-container:contains("First Blog")')
          .find('button:contains("show more")')
          .click();
        cy.get('.blog-container:contains("First Blog")')
          .find('button:contains("like")').as('like1')

        cy.get('.blog-container:contains("Second Blog")')
          .find('button:contains("show more")')
          .click();
        cy.get('.blog-container:contains("Second Blog")')
          .find('button:contains("like")').as('like2')

        cy.get('.blog-container:contains("Third Blog")')
          .find('button:contains("show more")')
          .click();
        cy.get('.blog-container:contains("Third Blog")')
          .find('button:contains("like")').as('like3')

        // First Blog - 2 likes
        cy.get('@like1').click()
        cy.get('.blog-container:contains("First Blog")').should('contain', 'likes 1')
        cy.get('@like1').click()       
        cy.get('.blog-container:contains("First Blog")').should('contain', 'likes 2')

        // Second Blog - 1 like
        cy.get('@like2').click()
        cy.get('.blog-container:contains("Second Blog")').should('contain', 'likes 1')

        // Third Blog - 3 likes
        cy.get('@like3').click()
        cy.get('.blog-container:contains("Third Blog")').should('contain', 'likes 1')
        cy.get('@like3').click()
        cy.get('.blog-container:contains("Third Blog")').should('contain', 'likes 2')
        cy.get('@like3').click()
        cy.get('.blog-container:contains("Third Blog")').should('contain', 'likes 3')

        cy.get('.blog-container').then((blogs) => {
          expect(blogs.eq(0)).to.contain('Third Blog')
          expect(blogs.eq(1)).to.contain('First Blog')
          expect(blogs.eq(2)).to.contain('Second Blog')
        })
      })
    })
  })
})