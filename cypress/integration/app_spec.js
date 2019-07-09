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

  it('Searching for "Love" returns some love songs', function() {
    cy.visit('/')
    cy.get('[data-testid=SearchComponentInputBox]').type('Love');
    cy.get('[data-testid=SearchSubmitButton]').click();
    cy.get('[data-testid=list-component-songs] li').should('contain', 'Love');
  })

  it('Loads 50 songs initially', function() {
    cy.visit('/')
    cy.get('[data-testid=list-component-songs] li').should('have.length', 50);
  })

  it('Loads 50 more songs after scrolling to the end of page', function() {
    cy.visit('/')
    cy.wait(1500)
    cy.get('[data-testid=FooterComponent]').scrollIntoView();
    cy.get('[data-testid=list-component-songs] li').should('have.length', 100);
  })

  it('Filters song to only show level 1,5,15, and hides any other level', function() {
    cy.visit('/')
    // levels we click:
    cy.get('[data-testid="FilterButton"]').click();
    cy.get('[data-testid="FilterLevelNumber"]').contains(1).click();
    cy.get('[data-testid="FilterLevelNumber"]').contains(5).click();
    cy.get('[data-testid="FilterLevelNumber"]').contains(15).click();

    // unselected levels
    cy.get('[data-testid=list-component-songs] g text').should('contain', 5);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 2);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 3);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 4);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 6);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 7);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 8);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 9);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 10);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 11);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 12);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 13);
    cy.get('[data-testid=list-component-songs] g text').should('not.contain', 14);
  })

  it.only('Favorite one song, then unfavorite all songs so that no favorited songs exist', function() {
    cy.visit('/')
    cy.get('[data-testid="FilterButton"]').click();
    cy.get('[data-testid="FilterLevelNumber"]').contains(1).click();
    cy.get('[data-testid=UnFavoriteButton]').first().click();

    cy.wait(500)
    cy.get('[data-testid=FavoriteButton]').click({multiple: true, force: true});
    cy.get('[data-testid=FavoriteButton]').should('not.exist');
  })

  })


