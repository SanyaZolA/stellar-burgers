describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

describe('Тесты главной страницы и модального окна', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.get('body').as('MainPage');
    cy.get(':nth-child(2) > :nth-child(2) > .common_button').as('addButtonBun');
    cy.get(':nth-child(4) > :nth-child(2) > .common_button').as(
      'addButtonMeet'
    );
    cy.get(':nth-child(6) > :nth-child(2) > .common_button').as(
      'addButtonSauce'
    );
    cy.get('#modals').as('modalComponent');
    cy.contains('Краторная булка N-200i').as('kratorBun');
  });

  it('проверка добавления в конструктор булки: верх и низ', () => {
    cy.get('@MainPage').contains('Флюоресцентная булка R2-D3');
    cy.get('@addButtonBun').click();
    cy.get('@addButtonMeet').click();
    cy.get('@addButtonSauce').click();
    cy.get('.constructor-element_pos_top').as('topBun');
    cy.get('@topBun').contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get('.constructor-element_pos_bottom').as('bottomBun');
    cy.get('@bottomBun').contains('Флюоресцентная булка R2-D3 (низ)');
    cy.get('.constructor-element').as('middleIngredients');
    cy.get('@middleIngredients').contains('Соус фирменный Space Sauce');
    cy.get('@middleIngredients').contains(
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  it('Проверка модального окна ингредиента: открытие', () => {
    cy.get('@kratorBun').click();
    cy.get('@modalComponent').children().should('have.length', 2);
    cy.get('@modalComponent').contains('Краторная булка N-200i');
  });

  it('Проверка модального окна ингредиента: закрытие по кнопке', () => {
    cy.get('@kratorBun').click();
    cy.get('@modalComponent').children().should('have.length', 2);
    cy.get('@modalComponent').find('button').click();
    cy.get('@modalComponent').children().should('have.length', 0);
  });

  it('Проверка закрытия модального окна ингредиента: закрытие по нажатию (escape)', () => {
    cy.get('@kratorBun').click();
    cy.get('@modalComponent').children().should('have.length', 2);
    cy.get('@MainPage').type('{esc}');
    cy.get('@modalComponent').children().should('have.length', 0);
  });

  it('Проверка закрытия модального окна ингредиента: закрытие по нажатию (оверлей)', () => {
    cy.get('@kratorBun').click();
    cy.get('@modalComponent').children().should('have.length', 2);
    cy.get('#overlay').click({ force: true });
    cy.get('@modalComponent').children().should('have.length', 0);
  });
});

describe('Тесты создания заказа', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'orders.json' });
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit('/');
    cy.get('body').as('MainPage');
    cy.get(':nth-child(2) > :nth-child(2) > .common_button').as('addButtonBun');
    cy.get(':nth-child(4) > :nth-child(2) > .common_button').as(
      'addButtonMeet'
    );
    cy.get(':nth-child(6) > :nth-child(2) > .common_button').as(
      'addButtonSauce'
    );
    cy.get('#modals').as('modalComponent');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Сборка заказа и отправка заказа', () => {
    cy.get('@MainPage').contains('Флюоресцентная булка R2-D3');
    cy.get('@addButtonBun').click();
    cy.get('@MainPage').contains('Филе Люминесцентного тетраодонтимформа');
    cy.get('@addButtonMeet').click();
    cy.get('@MainPage').contains('Соус с шипами Антарианского плоскоходца');
    cy.get('@addButtonSauce').click();
    cy.contains('Оформить заказ').click();
    cy.get('@modalComponent').children().should('have.length', 2);
    cy.get('[data-cy=order-id]').should('have.text', '58383');
    cy.get('@modalComponent').find('button').click();
    cy.get('@modalComponent').children().should('have.length', 0);
    cy.get('@MainPage').contains('Выберите булки');
    cy.get('@MainPage').contains('Выберите начинку');
  });
});
