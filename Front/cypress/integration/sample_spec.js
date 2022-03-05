

describe('Cypress testt', () =>
{
    it('page load', async () =>
    {
        cy.visit('http://localhost:3000/')
        cy.wait(5000)
        cy.get('img').should('have.length', 20)

    })

    it('image click and product number', async () =>
    {
        cy.visit('http://localhost:3000/')
        cy.wait(5000)
        cy.get('img').first().click()
        cy.get('input').should('have.value', 1)
    })

    it('add in panier ', async () =>
    {
        cy.visit('http://localhost:3000/')
        cy.wait(5000)
        cy.get('img').first().click()
        cy.get('.add').first().click()
        cy.wait(5000)
        cy.get('p').first().contains("Enregistré dans le panier")
    })

    it('add in panier faile', async () =>
    {
        cy.visit('http://localhost:3000/')
        cy.wait(5000)
        cy.get('img').first().click()
        cy.get('input').type(50, { force: true })
        cy.get('.add').first().click()
        cy.wait(5000)
        cy.get('p').first().contains("Trop de quantité")
    })

    it('delete', async () =>
    {
        cy.visit('http://localhost:3000/')
        cy.wait(5000)
        cy.get('.toPanier').click()
        cy.get('button').first().click()
        cy.wait(3000)
        cy.get('p').first().contains("Produit bien supprimé")
    })


})