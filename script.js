const list = document.getElementById("shoppingList");
let draggedItem = null;

function addItem() {
    const input = document.getElementById("itemInput");
    const text = input.value.trim();
    if (text === "") return;
    createListItem(text);
    input.value = "";
    searchItems(); // Refresh search view
}

function createListItem(text) {
    const li = document.createElement("li");
    li.setAttribute("draggable", true);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => span.classList.toggle("checked");

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "item-text";

    const buttons = document.createElement("div");
    buttons.className = "item-buttons";


    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
        const newText = prompt("Edit item:", span.textContent);
        if (newText) span.textContent = newText;
    };


    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => li.remove();

    buttons.append(editBtn, deleteBtn);
    li.append(checkbox, span, buttons);

    // (Duplicate) Button
    const reorderBtn = document.createElement("button");
    reorderBtn.textContent = "🔁";
    reorderBtn.title = "Reorder (Duplicate)";
    reorderBtn.onclick = () => createListItem(span.textContent);

    buttons.append(editBtn, deleteBtn, reorderBtn);
    li.append(checkbox, span, buttons);

    // Drag and Drop
    li.addEventListener("dragstart", () => {
        draggedItem = li;
        li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
        draggedItem = null;
    });

    li.addEventListener("dragover", (e) => e.preventDefault());
    li.addEventListener("drop", () => {
        if (draggedItem && draggedItem !== li) {
            list.insertBefore(draggedItem, li);
        }
    });

    list.appendChild(li);
}

function searchItems() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const items = list.querySelectorAll("li");
    items.forEach(item => {
        const text = item.querySelector(".item-text").textContent.toLowerCase();
        item.style.display = text.includes(term) ? "" : "none";
    });
}

function toggleMode() {
    document.body.classList.toggle("dark");
    const modeButton = document.getElementById("modeToggle");
    modeButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}
