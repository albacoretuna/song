/*eslint no-undef: 0*/
/**
 * End to end testing using cypress
 * first run the app and then npm run cypres:open
 */
describe('Testing Song List App', function() {

  beforeEach(function () {
    // runs before each test in the block
    cy.visit('http://localhost:3000/');
    })

  it('Shows a list of songs', function() {
    cy.get('[data-testid=list-component-songs] li').should('exist');
  });

  it('Typing a none-existent song in search input and pressing enter, shows the not found text', function() {
    cy.get('[data-testid=SearchComponentInputBox]').type(
      'BlahBlahNoOneWillHaveThisSongTitleOrThisNameYeahSure{enter}'
    );
    cy.wait(1000);
    cy.get('[data-testid=NoSongsFound]').should('exist');
  });

  it('Searching for "Love" returns some love songs', function() {
    cy.get('[data-testid=SearchComponentInputBox]').type('Love');
    cy.get('[data-testid=SearchSubmitButton]').click();
    cy.get('[data-testid=list-component-songs] li').should('contain', 'Love');
  });

  it('Loads 50 songs initially', function() {
    cy.get('[data-testid=list-component-songs] li').should('have.length', 50);
  });

  it('Loads 50 more songs after scrolling to the end of page', function() {
    cy.wait(1500);
    cy.get('[data-testid=FooterComponent]').scrollIntoView();
    cy.get('[data-testid=list-component-songs] li').should('have.length', 100);
  });

  it('Filters song to only show level 1,5,15, and hides any other level', function() {
    // levels we click:
    cy.get('[data-testid="FilterButton"]').click();
    cy.get('[data-testid="FilterLevelNumber"]')
      .contains(1)
      .click();
    cy.get('[data-testid="FilterLevelNumber"]')
      .contains(5)
      .click();
    cy.get('[data-testid="FilterLevelNumber"]')
      .contains(15)
      .click();

    cy.wait(1500);

    // should have 5
    cy.get('[data-testid=list-component-songs] g text').should('contain', 5);

    // but none of the other levels:
    cy.get('[data-testid=list-component-songs] g text')
    .should('not.contain', 2)
    .should('not.contain', 4)
    .should('not.contain', 4)
    .should('not.contain', 6)
    .should('not.contain', 7)
    .should('not.contain', 8)
    .should('not.contain', 9)
    .should('not.contain', 11)
    .should('not.contain', 12)
    .should('not.contain', 13)
    .should('not.contain', 14)
  });

  it('Adds 1 song to favorites, remove all songs from favorites, then 0 favorite songs exists', () => {

    // filter songs to have less of them on page
    cy.get('[data-testid="FilterButton"]').click();
    cy.get('[data-testid="FilterLevelNumber"]').contains(1).click();

    cy.wait(1500);

    // Find first unfavorite button and click it, to make sure at least one unfavorite button exists
    cy.get('[data-testid=UnFavoriteButton]')
      .first()
      .click();

    cy.get('[data-testid=FavoriteButton]').click({
      multiple: true,
      force: true
    });
    cy.get('[data-testid=FavoriteButton]').should('not.exist');
  });
});
