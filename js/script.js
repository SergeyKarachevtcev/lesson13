"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const todoRemove = document.querySelector(".todo-remove");
let toDoData = [];

const render = function () {
	todoList.innerHTML = "";
	todoCompleted.innerHTML = "";
	toDoData.forEach(function (item) {
		const li = document.createElement("li");
		li.classList.add("todo-item");
		li.innerHTML =
			'<span class="text-todo">' + item.text + "</span>" + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + "</div>";

		if (item.completed) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		li.querySelector(".todo-complete").addEventListener("click", function () {
			item.completed = !item.completed;
			render();
			saveToDoData();
		});

		li.querySelector(".todo-remove").addEventListener("click", function () {
			const listItem = this.closest(".todo-item");
			if (listItem) {
				listItem.remove();
				const text = listItem.querySelector(".text-todo").textContent;
				const index = toDoData.findIndex((item) => item.text === text);
				if (index !== -1) {
					toDoData.splice(index, 1);
				}
				saveToDoData();
			}
		});
	});
};

todoControl.addEventListener("submit", function (event) {
	event.preventDefault();

	if (headerInput.value.trim() === "") {
		return; // Если поле пустое,  выйти из функции
	}

	const newToDo = {
		text: headerInput.value,
		completed: false,
	};
	toDoData.push(newToDo);
	headerInput.value = "";
	render();
});

const saveToDoData = function () {
	localStorage.setItem("toDoData", JSON.stringify(toDoData));
};

const loadToDoData = function () {
	const savedData = localStorage.getItem("toDoData");
	if (savedData) {
		toDoData = JSON.parse(savedData);
		render();
	}
};

loadToDoData();
