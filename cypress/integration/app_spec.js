/*eslint no-undef: 0*/
/**
 * End to end testing using cypress
 * first run the app and then npm run cypres:open
 */
describe('Testing Song List App', function() {
  it('Shows a list of songs', function() {
    cy.visit('/');
    cy.get('[data-testid=list-component-songs] li').should('exist');
  })

  it('Typing a none-existent song in search input and pressing enter, shows the not found text', function() {
    cy.visit('/')
    cy.get('[data-testid=SearchComponentInputBox]').type('BlahBlahNoOneWillHaveThisSongTitleOrThisNameYeahSure{enter}');
    cy.wait(500);
    cy.get('[data-testid=NoSongsFound]').should('exist');
  })

  it('Searching for "Love" returns some songs', function() {
    cy.visit('/')
    cy.get('[data-testid=SearchComponentInputBox]').type('Love');
    cy.get('[data-testid=SearchSubmitButton]').click();
    cy.get('[data-testid=list-component-songs] li').should('contain', 'Love');
  })
  })
