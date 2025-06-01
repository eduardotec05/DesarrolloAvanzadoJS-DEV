import { getTodos, toggleDone, removeTodo } from "./state.js";

/* ---------- utilidades ---------- */
export function renderErrors(form, errors = {}) {
  [...form.elements].forEach((el) => {
    if (!el.name) return;
    el.classList.remove("is-invalid", "is-valid");
    const feedback =
      el.closest(".input-group")?.querySelector(".invalid-feedback") ??
      el.nextElementSibling;
    if (feedback) {
      feedback.textContent = "";
      feedback.classList.remove("d-block");
    }
  });

  Object.entries(errors).forEach(([name, msgs]) => {
    const input = form.elements[name];
    if (!input) return;
    input.classList.add("is-invalid");
    const feedback =
      input.closest(".input-group")?.querySelector(".invalid-feedback") ??
      input.nextElementSibling;
    if (feedback) {
      feedback.textContent = msgs[0];
      feedback.classList.add("d-block");
    }
  });

  if (!Object.keys(errors).length) {
    [...form.elements]
      .filter((el) => el.name)
      .forEach((el) => el.classList.add("is-valid"));
  }
}

export function renderRegisterOutput(container, dataObj) {
    container.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3">Datos del usuario</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Nombre:</strong> ${dataObj.name}</li>
            <li class="list-group-item"><strong>Email:</strong> ${dataObj.email}</li>
            <li class="list-group-item"><strong>Nickname:</strong> ${dataObj.nickname}</li>
            <li class="list-group-item"><strong>Teléfono:</strong> ${dataObj.phone}</li>
          </ul>
        </div>
      </div>
    `;
  }

function createTodoItem(todo) {
  const li = document.createElement("li");
  li.className = `list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn`;

  if (todo.done) {
    li.classList.add("bg-light", "text-muted");
    li.style.textDecoration = "line-through";
  }

  const content = document.createElement("div");
  content.className = "d-flex flex-column";

  const taskText = document.createElement("span");
  taskText.textContent = todo.task;

  const badge = document.createElement("small");
  badge.className = "badge bg-info mt-1 align-self-start";
  badge.textContent = todo.dueDate;

  content.appendChild(taskText);
  content.appendChild(badge);

  const actions = document.createElement("div");

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn btn-sm btn-outline-success me-2";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.dataset.id = todo.id;
  toggleBtn.innerHTML = `<i class="bi bi-check"></i>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-danger me-2";
  deleteBtn.dataset.action = "delete";
  deleteBtn.dataset.id = todo.id;
  deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-primary";
  editBtn.dataset.action = "edit";
  editBtn.dataset.id = todo.id;
  editBtn.innerHTML = `<i class="bi bi-pencil"></i>`;

  actions.append(toggleBtn, deleteBtn, editBtn);
  li.append(content, actions);

  return li;
}

export async function renderTodoList(ul) {
  ul.replaceChildren();

  const todos = await getTodos();

  if (!todos.length) {
    li.innerHTML = `
  <span>${todo.task} <small class="badge bg-info ms-2">${todo.dueDate}</small></span>
  <div class="d-flex align-items-center">
    <button class="btn btn-sm btn-outline-success me-2" data-action="toggle" data-id="${todo.id}">
        <i class="bi bi-check"></i>
    </button>
    ${
      todo.done
        ? '<span class="text-success small me-2">Completado</span>'
        : ''
    }
    <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${todo.id}">
        <i class="bi bi-trash"></i>
    </button>
  </div>
`;
  }
  

  todos.forEach((todo) => {
    const li = createTodoItem(todo);
    ul.appendChild(li);
  });
}

export function setupTodoActions(ul, onChange) {
  ul.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const { action, id } = btn.dataset;

    if (action === "toggle") {
      await toggleDone(id);
      

      const li = btn.closest("li");
      if (li.classList.contains("text-muted")) {
        li.classList.remove("text-muted", "bg-light");
        li.style.textDecoration = "";
      } else {
        li.classList.add("text-muted", "bg-light");
        li.style.textDecoration = "line-through";
      }
      return;
    }

    if (action === "delete") {
      const confirmDelete = confirm("¿Eliminar esta tarea?");
      if (confirmDelete) {
        await removeTodo(id);
        onChange(); // recarga solo si se borra
      }
      return;
    }

    if (action === "edit") {
      alert(`Función 'editar' no implementada aún para ID ${id}`);
    }
  });
}
