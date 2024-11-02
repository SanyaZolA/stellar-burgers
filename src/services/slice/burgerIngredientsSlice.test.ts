import {
  reducer,
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  delIngredient,
  getBurgerIngredient
} from './burgerIngredientsSlice';

const initialSateTwoIngredients = {
  ingredients: [
    {
      _id: '111',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      uniqueId: '333'
    },
    {
      _id: '222',
      name: 'Краторная булка N-200i',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      uniqueId: '111'
    },
    {
      _id: '333',
      name: 'Смешная булка N-200i',
      type: 'main',
      proteins: 56,
      fat: 44,
      carbohydrates: 23,
      calories: 420,
      price: 1555,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      uniqueId: '111'
    }
  ],
  bun: null
};

describe('Тест слайса - burgerIngredientsSlice', () => {
  const initialState = {
    ingredients: [],
    bun: null
  };

  test('добавление ингредиента', () => {
    const ingredient = {
      _id: '7467',
      name: 'Флюоресцентная булка R2-D3',
      type: 'sauce',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/bun-01.jpg',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.jpg',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
    };
    const nextState = reducer(initialState, addIngredient(ingredient));
    expect(nextState.ingredients[0]).toMatchObject(ingredient);
    expect(nextState.ingredients).toHaveLength(1);
    expect(null).toEqual(nextState.bun);
  });

  test('добавление ингредиента булки', () => {
    const ingredient = {
      _id: '7467',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/bun-01.jpg',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.jpg',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
    };
    const nextState = reducer(initialState, addIngredient(ingredient));
    expect(nextState.bun).toMatchObject(ingredient);
    expect([]).toEqual(nextState.ingredients);
  });

  test('удаление ингредиента', () => {
    const action = removeIngredient(0);
    const state = reducer(initialSateTwoIngredients, action);
    expect(state.ingredients).toHaveLength(2);
  });

  test('Тест перемещения ингредиента вверх', () => {
    const action = moveIngredientUp(1);
    const state = reducer(initialSateTwoIngredients, action);
    expect(state.ingredients[0]._id).toBe('222');
    expect(state.ingredients[1]._id).toBe('111');
    expect(state.ingredients[2]._id).toBe('333');
  });

  test('Тест перемещения ингредиента вверх если ингредиент первый', () => {
    const action = moveIngredientUp(0);
    const state = reducer(initialSateTwoIngredients, action);
    expect(state.ingredients[0]._id).toBe('111');
    expect(state.ingredients[1]._id).toBe('222');
    expect(state.ingredients[2]._id).toBe('333');
  });

  test('Тест перемещения ингредиента вниз', () => {
    const action = moveIngredientDown(1);
    const state = reducer(initialSateTwoIngredients, action);
    expect(state.ingredients[0]._id).toBe('111');
    expect(state.ingredients[1]._id).toBe('333');
    expect(state.ingredients[2]._id).toBe('222');
  });

  test('Тест перемещения ингредиента вниз если булка в самом низу', () => {
    const action = moveIngredientDown(3);
    const state = reducer(initialSateTwoIngredients, action);
    expect(state.ingredients[0]._id).toBe('111');
    expect(state.ingredients[1]._id).toBe('222');
    expect(state.ingredients[2]._id).toBe('333');
  });

  test('Тест удаления всех ингредиентов из конструктора', () => {
    const action = delIngredient();
    const state = reducer(initialSateTwoIngredients, action);
    expect(state.ingredients).toStrictEqual([]);
    expect(state.bun).toBe(null);
  });

  test('Тест селектора getBurgerIngredient', () => {
    const state = {
      burgerIngredients: initialState
    };
    const result = getBurgerIngredient(state);
    expect(result).toEqual(state.burgerIngredients);
  });
});
