var todoFunctions = require('./logic.js');

const arr = [
  { id: 1, description: 'first todo', done:false },
  { id: 2, description: 'drink coffee', done:false }
]

describe('Testing todo return new array', () => {
  // test addTodo
  test('Should return new array with new todo added to the end',  () => {
    const actual = todoFunctions.addTodo([], 'first todo');
    const expected = [
      { id: 1, description: 'first todo', done:false }
    ];
    expect(actual).toEqual(expected);
  });

  // add another todo
  test('Should return new array with new todo added to the end',  () => {
    const actual = todoFunctions.addTodo([{ id: 1, description: 'first todo', done:false }], 'drink coffee');
    const expected = [
      { id: 1, description: 'first todo', done:false },
      { id: 2, description: 'drink coffee', done:false }
    ];
    expect(actual).toEqual(expected);
  });

  // test deleteTodo
  test('Should return new array not contain any todo with an id of idToDelete', () => {
    const actual = todoFunctions.deleteTodo(arr, 1);
    const expected = [{ id: 2, description: 'drink coffee', done:false }];
    expect(actual).toEqual(expected);
  });
   
  // test markTodo
  test('Should return new array, all elements will remain unchanged except the one with id: idToMark this element will have its done value toggled', () => {
    const actual = todoFunctions.markTodo(arr, 1);
    const expected = [
      { id: 1, description: 'first todo', done:true },
      { id: 2, description: 'drink coffee', done:false }
    ];
    expect(actual).toEqual(expected);
  });

  // test sortTodos
  test('Should sort array alphaptic from a-z', () => {
    const actual = todoFunctions.sortTodos(arr, true);
    const expected = [
      { id: 2, description: 'drink coffee', done:false },
      { id: 1, description: 'first todo', done:false }
    ];
    expect(actual).toEqual(expected);
  });

});