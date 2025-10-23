import { draggable , findFreePosition } from './main.js';

const container = document.getElementById('todo-list');
const todoButton = document.getElementById('add-todo');
let todoItems = [];
getTodos();
renderTodos();
todoButton.onclick = addTodo;
//Logic for Adding Todos
function addTodo() {
    const todoText = document.getElementById('todo-input');
    if (todoText.value.trim() == '') {
        return;
    }
    const data = {
        id: Date.now(),
        value: todoText.value
    }
    todoItems.push(data);
    storeTodos();
    renderTodos();
}

function renderTodos() {
  container.innerHTML = '';
  todoItems.forEach(item => {
    const todo = document.createElement('div');
    todo.classList.add('todo-item');
    todo.id = 'todo-line-item' + item.id;
    todo.innerText = item.value;
    container.append(todo);

    requestAnimationFrame(() => {
      const pos = item.top && item.left
        ? { top: item.top, left: item.left }
        : findFreePosition(todo, container);

      todo.style.top = pos.top;
      todo.style.left = pos.left;
      draggable(todo.id, container);
    });
  });
}

function storeTodos() {
    localStorage.setItem('Todos', JSON.stringify(todoItems));
}

function getTodos() {
    todoItems = JSON.parse(localStorage.getItem('Todos')) || [];
    return todoItems;
}

window.addEventListener('beforeunload', storePositions);

function storePositions() {
  const containerRect = container.getBoundingClientRect();
  const allElements = document.querySelectorAll('[id^="todo-line-item"]');
  const allTodos = Array.from(allElements);

  allTodos.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const index = todoItems.findIndex((todo) => item.id.includes(todo.id));

    if (index !== -1) {
      // store relative position
      todoItems[index] = {
        ...todoItems[index],
        left: rect.left - containerRect.left + 'px',
        top: rect.top - containerRect.top + 'px',
      };
    }
  });

  storeTodos();
}


