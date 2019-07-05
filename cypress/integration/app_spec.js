/**
 * End to end testing using cypress
 * first run the app and then yarn run cypres:open
 */
describe('Testing Tremendous App', function() {
  it('Clicking on show button opens image', function() {
    cy.visit('/');
    cy.contains('Show Photo').click();
    cy.get('li img').should('have.css', 'max-height', '500px');
  })

  it('Searching for a none-existent tree returns no tree', function() {
    cy.visit('/')
    cy.get('input#search').type('Blah');
    cy.get('ul').find('li').should('not.exist');
  })

  it('Searching for Baobab returns Baobab', function() {
    cy.visit('/')
    cy.get('input#search').type('Baobab');
    cy.get('ul').find('li').should('contain','Baobab');
  })
  })
