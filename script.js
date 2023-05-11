const $ = (selector, root = document, type = "single") => root[`querySelector${type === "multiple" ? "All" : ""}`](selector),
  createEl = (tagName) => document.createElement(tagName),
  localData = (method, key, data) => method === "set" ? localStorage.setItem(key, JSON.stringify(data)) : JSON.parse(localStorage.getItem(key)),
  input = $("#input"),
  todos = localData("get", "todos");

if (todos) todos.forEach((todo) => addTodo(todo));

$("#form").onsubmit = (e) => {
  e.preventDefault();
  addTodo();
}

function addTodo(todo) {
  let todoText = input.value;

  if (todo) todoText = todo.text;

  if (todoText) {
    const todoEl = createEl("li");

    if (todo && todo.completed) todoEl.classList.add("completed");

    todoEl.innerText = todoText;

    todoEl.onclick = () => todoEl.classList.toggle("completed") && updateLS();

    todoEl.oncontextmenu = (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    }

    $("#todos").appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

function updateLS() {
  const todos = [];

  $("li", document, "multiple").forEach((todoEl) => todos.push({
    text: todoEl.innerText,
    completed: todoEl.classList.contains("completed"),
  }));

  localData("set", "todos", todos);
}
