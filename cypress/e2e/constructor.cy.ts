describe('проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:4000', function() {
      cy.visit('http://localhost:4000'); 
  });
}); 

describe('Тесты главной страницы и модального окна', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  });
;

  it('проверка добавления в конструктор булки: верх и низ', () => {
    cy.get('body').contains('Флюоресцентная булка R2-D3');
    cy.get(':nth-child(2) > :nth-child(2) > .common_button').click();
    cy.get('body').contains('Филе Люминесцентного тетраодонтимформа');
    cy.get(':nth-child(4) > :nth-child(2) > .common_button').click();
    cy.get('body').contains('Соус с шипами Антарианского плоскоходца');
    cy.get(':nth-child(6) > :nth-child(4) > .common_button').click();
    cy.get('.constructor-element_pos_top').contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get('.constructor-element').contains('Соус с шипами Антарианского плоскоходца');
    cy.get('.constructor-element').contains('Филе Люминесцентного тетраодонтимформа');
    cy.get('.constructor-element_pos_bottom').contains('Флюоресцентная булка R2-D3 (низ)');  
  })

  it ('Проверка модального окна ингредиента: открытие', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').contains('Краторная булка N-200i');
  });

  it ('Проверка модального окна ингредиента: закрытие по кнопке', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it ('Проверка закрытия модального окна ингредиента: закрытие по нажатию (escape)', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);
  });

  it ('Проверка закрытия модального окна ингредиента: закрытие по нажатию (оверлей)', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#overlay').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
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
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it ('Сборка заказа и отправка заказа', () => {
    cy.get('body').contains('Флюоресцентная булка R2-D3');
    cy.get(':nth-child(2) > :nth-child(2) > .common_button').click();
    cy.get('body').contains('Филе Люминесцентного тетраодонтимформа');
    cy.get(':nth-child(4) > :nth-child(2) > .common_button').click();
    cy.get('body').contains('Соус с шипами Антарианского плоскоходца');
    cy.get(':nth-child(6) > :nth-child(4) > .common_button').click();
    cy.contains('Оформить заказ').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.wait(500);
    cy.get('[data-cy=order-id]').should('have.text','58383');
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
    cy.get('body').contains('Выберите булки');
    cy.get('body').contains('Выберите начинку');
  });
});