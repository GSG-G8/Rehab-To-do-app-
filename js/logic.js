// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
    // todoFunctions.generateId() will give you a unique id
    // You do not need to understand the implementation of this function.
    generateId: (function() {
      var idCounter = 0;
  
      function incrementCounter() {
        return (idCounter += 1);
      }
  
      return incrementCounter;
    })(),
    
    //cloneArrayOfObjects will create a copy of the todos array 
    //changes to the new array don't affect the original
    cloneArrayOfObjects: function(todos) {
      return todos.map(function(todo){
        return JSON.parse(JSON.stringify(todo));
      });
    },
    
    addTodo: function(todos, newTitle, newDate, newDetails) {
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // returns a new array, it should contain todos with the newTodo added to the end.
      // add an id to the newTodo. You can use the generateId function to create an id.
      // hint: array.concat

      if (newTitle === '' || newDate === '' || newDetails === '' || !isNaN(newTitle)) return -1; // Validate
      const newArr = todoFunctions.cloneArrayOfObjects(todos);
      const obj = {
          id: todoFunctions.generateId(),
          title: newTitle,
          date: newDate,
          details: newDetails,
          done:false
      }
      return newArr.concat(obj);
    },
    deleteTodo: function(todos, idToDelete) {
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // return a new array, this should not contain any todo with an id of idToDelete
      // hint: array.filter
      const newArr = todoFunctions.cloneArrayOfObjects(todos);
      return newArr.filter(todo => todo.id !== idToDelete);
    },
    markTodo: function(todos, idToMark) {
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // in the new todo array, all elements will remain unchanged except the one with id: idToMark
      // this element will have its done value toggled
      // hint: array.map
      const newArr = todoFunctions.cloneArrayOfObjects(todos);
      const markFunc = todo => {
          if (todo.id === idToMark) todo.done = (!todo.done);
          return todo;
      }
      return newArr.map(markFunc);
    },
    sortTodos: function(todos, sortFunction) {
      // stretch goal! Do this last
      // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
      // sortFunction will have same signature as the sort function in array.sort
      // hint: array.slice, array.sort
      const newArr = todoFunctions.cloneArrayOfObjects(todos); 
      const newTodosDone = newArr.filter(todo => todo.done); //put the done in new array
      const newTodosNotDone = newArr.filter(todo => !todo.done); //put not done in new array
      //function for sort alphaptic from a-z
      const sortFunc = (a,b) => {
          if (a.title > b.title) {
              return 1;
          } else {
              return -1;
          }
        }
      newTodosNotDone.sort(sortFunc); //sort the not done array
      newTodosDone.sort(sortFunc);//sort the done array
      //merge the two array in one array and return it
      return newTodosNotDone.concat(newTodosDone);
    }
  };
  
  
  // Why is this if statement necessary?
  // The answer has something to do with needing to run code both in the browser and in Node.js
  // See this article for more details: 
  // http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
  if (typeof module !== 'undefined') {
    module.exports = todoFunctions;
  }