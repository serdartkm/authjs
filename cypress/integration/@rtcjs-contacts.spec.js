describe('Testing Contacts component', function () {

    it('Contacts component is loaded',function(){
        cy.visit('/contacts')
        cy.get('.contacts')
    })
    
    it.only('Contacts is connected to the remote server', function () {
        cy.visit('/contacts')
        cy.get('.feros').contains("connected")
        cy.get('.deros').contains("connected")
    })
    it('searched and retrieved a user from server', function () {})
    
    it('Contacts are fetched from remote server', function () {

    })
    
    it('Contacts are fetched from localStorage', function () {})
    
    it('Added a user to contact list (local and remotely)', function () {})

    it('Deleted the user from contact list', function () {})

    it('synced local contacts to server', function () { })

    it('synced server contacts to local storage', function (){})


    //search
    //invite
    //accept
    //decline
    //declinte
    //block
    //archive
    //delete
    //join
    //leave
    
})