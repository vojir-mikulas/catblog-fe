context('comment',()=>{
    beforeEach(()=>{
        //login user
        cy.visit('http://localhost:3002/auth/login')
        cy.findByRole('textbox', {
            name: /email/i
        }).type('ivon@example.com')
        cy.get('#Password').type('123')
        cy.get('#LoginButton').click()
    })
    describe('create comment',()=>{
        //visit home
        //click on post (if exists)
        //fill the comment content
        //hit enter to post comment
    })

    describe('reply to comment',()=>{
        //visit home
        //click on post (if exists)
        //click on reply of comment that already exist
        //fill the reply content
        //hit enter to post reply
    })

    describe('delete comment',()=>{
        //visit home
        //click on post (if exists)
        //click on delete of comment that already exist
    })
})