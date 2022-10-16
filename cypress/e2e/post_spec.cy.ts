
context('post',()=>{
    describe('create post', ()=>{
        it('create post',()=>{
            //login user
            cy.visit('http://localhost:3002/auth/login')
            cy.findByRole('textbox', {
                name: /email/i
            }).type('ivon@example.com')
            cy.get('#Password').type('123')
            cy.get('#LoginButton').click()

            //check posts before
            cy.visit('http://localhost:3002/user/posts')
            cy.findByRole('button', {
                name: /create new post/i
            }).click()

            cy.findByRole('textbox', {
                name: /title/i
            }).type('CelkemChábr - Even your kids can do it!')
           //todo get tinymce textarea
            cy.get('iframe').click('center').type('xddd')
        })


        //if no image is provided the alert message should pop out
        //if title or content is empty the error message should pop
    })
    describe('edit post',()=>{
        // login
        // go to user posts
        // hit the pen icon to edit already existing post
        // edit post properties
        // save post

        //if no image is provided the alert message should pop out
        //if title or content is empty the error message should pop
    })
    describe('delete post',()=>{
        // login
        // go to user posts
        // hit the trashcan icon to delete already existing post
    })
})