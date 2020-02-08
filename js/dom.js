// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');

    const field = document.querySelectorAll('.field').forEach(item => {
        if (document.querySelector('p.error') != null) { // for prevent error if the error(when click on any input) //
            document.querySelector('p.error').remove();
        }
    });
  
    var state; // this is our initial todoList

    // local storage 
    if (localStorage.getItem('todos')) {
        state = JSON.parse(localStorage.getItem('todos'));
    } else {
        state = [];
    }

    // Sort todo list
    const sortTodo = document.getElementById('sort');
    sortTodo.addEventListener('click', () => {
        var newState = todoFunctions.sortTodos(state, true);
        update(newState);
    });

    // Search todo list
    const searchTodo = document.getElementById('search');
    searchTodo.addEventListener('keyup', () => {
        const filter = searchTodo.value.toUpperCase();
        const items = todoListNode.getElementsByClassName('item');
        for (let i = 0; i < items.length; i++) {
            let title = item[i].querySelector('#title');
            let titleVal = title.textContent;
            if (titleVal.toUpperCase().indexOf(filter) > -1) {
                item[i].style.display = '';
            } else {
                item[i].style.display = 'none';
            }
        }
    });

    // clear the list
    var reloadBtn = document.querySelector('.reload');
    reloadBtn.addEventListener('click', () => {
        location.reload();
        //clear local Storage
        localStorage.clear();
    });
  
    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function(todo) {
      // Add item
      var todoNode = document.createElement('li');
      todoNode.classList.add('item');
      // Add check circle(mark todo)
      const mark = document.createElement('i');
      mark.classList.add('far');
      mark.classList.add('fa-circle');
      todoNode.appendChild(mark);
      // Add Title
      const title = document.createElement('strong');
      title.setAttribute('id', 'title');
      title.innerText = todo.title;
      todoNode.appendChild(title);
      // Add date
      const date = document.createElement('p');
      date.setAttribute('id', 'date');
      date.innerText = todo.date;
      todoNode.appendChild(date);
      // Add details
      const details = document.createElement('p');
      details.setAttribute('id', 'details');
      details.innerText = todo.details;
      todoNode.appendChild(details);
      // Add delete
      const deleteBtn = document.createElement('i');
      deleteBtn.classList.add('fas');
      deleteBtn.classList.add('fa-trash-alt');
      deleteBtn.classList.add('trash');
      deleteBtn.addEventListener('click', () => {
        const dialog = document.getElementById('dialog');
        // Delete
        const button_ok = document.createElement('button');
        button_ok.textContent = 'Delete';
        // Cancel
        const button_cancel = document.createElement('button');
        button_cancel.textContent = 'Cancel';
        dialog.textContent = '';
        const pragraph = document.createElement('p');
        pragraph.classList.add('delete_content');
        pragraph.innerText = 'Are you sure to Delete?';
        dialog.appendChild(pragraph);
        dialog.appendChild(button_ok);
        dialog.appendChild(button_cancel);
        dialog.showModal();
        // Cancel addEventListener
        button_cancel.addEventListener('click', () => {
        dialog.close();
        });
        // Delete addEventListener
        button_ok.addEventListener('click', () => {
            var newState = todoFunctions.deleteTodo(state, todo.id);
            update(newState);
            dialog.close();
        });
      });
      todoNode.appendChild(deleteBtn);
      // Mark addEventListener
      mark.addEventListener('click', () => {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
      });
      // add classes for css
      if (todo.done === true) {
        title.classList.add('lineThrough');
        mark.setAttribute('class', 'fas');
        mark.classList.add('fa-check-circle');
      }
      return todoNode;
    };
  
    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual submit
        // Get form values
        const title = document.getElementById('addTitle').value;
        const date = document.getElementById('addDate').value;
        const details = document.getElementById('addDetails').value;
        const parent = document.getElementById('addForm');
        const newState = todoFunctions.addTodo(state, title, date, details);
        if (newState === -1) {
            if (document.querySelector('p.error') != null) { // for prevent error if the error(when click on add todo) //
                document.querySelector('p.error').remove();
            }
            const error = document.createElement('p');
            error.classList.add('error');
            error.textContent = "Please fill in all fields and enter a valid title";
            parent.appendChild(error);
        } else {
            update(newState);
        }
        parent.reset(); // clear form input
      });
    }
  
    // you should not need to change this function
    var update = function(newState) {
      state = newState; //state = [{id: 1, title: 'drink', ...}, {}, ...]
      // local storage
      localStorage.setItem('todos', JSON.stringify(state));
      renderState(state);
    };
  
    // you do not need to change this function
    var renderState = function(state) {
      var todoListNode = document.createElement('ul');
      todoListNode.setAttribute('id', 'list');
  
      state.forEach(function(todo) {
        todoListNode.appendChild(createTodoNode(todo));
      }); // todo = {} in arr
  
      // Replace all old list with new list
      container.replaceChild(todoListNode, container.firstChild);
    };
  
    if (container) renderState(state);
  })();