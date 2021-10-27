var todoList = {
    todo: document.querySelector(".todo-list-wrapper .todo"),
    inProgress: document.querySelector(".todo-list-wrapper .in-progress"),
    done: document.querySelector(".todo-list-wrapper .done"),
};

var form = document.querySelector("#add-card-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = event.target.querySelector("input[name=title]").value;
    var type = event.target.querySelector("select[name=type]").value;
    var task = {
        title,
        type
    };
    addTask(task);
});

function addCard(data) {
    var template = document.querySelector("#todoCardTemplate");
    var clone = template.content.cloneNode(true);
    clone.querySelector(".title").innerText = data.title;
    clone.querySelector(".card").dataset.task = JSON.stringify(data);
    clone.querySelector(".card").dataset.taskId = data.id;
    clone.querySelector("button[name=remove]").addEventListener("click", function(event) {
        removeTask(JSON.parse(event.target.parentNode.dataset.task));
    });
    setButton(clone.querySelector("button[name=button1]"), data);
    setButton(clone.querySelector("button[name=button2]"), data);
    switch (data.type) {
        case 'todo': todoList.todo.appendChild(clone); break;
        case 'in_progress': todoList.inProgress.appendChild(clone); break;
        case 'done': todoList.done.appendChild(clone); break;
    }
}

function setButton(button, task) {
    var buttonNumber = button.getAttribute("name");
    var target = '';
    switch (task.type) {
        case 'todo': target = buttonNumber === 'button1' ? 'in_progress' : 'done';
                        button.innerText = buttonNumber === 'button1' ? 'in progress' : 'done';
                        break;
        case 'in_progress': button.innerText = target = buttonNumber === 'button1' ? 'todo' : 'done';
                        break;
        case 'done': target = buttonNumber === 'button1' ? 'todo' : 'in_progress';
                        button.innerText = buttonNumber === 'button1' ? 'todo' : 'in progress';
                        break;
    }
    button.addEventListener("click", function(event) {
        var task = JSON.parse(event.target.parentNode.dataset.task);
        task.type = target;
        editTask(task);
    });
}

function removeCard(data) {
    var card = document.querySelector('.card[data-task-id="' + data.id + '"]');
    card.remove();
}

function getTasks() {
    axios.get("http://localhost:3000/tasks")
        .then(function(response) {
            var data = response.data;
            for (var i in data) {
                addCard(data[i]);
            }
        });
}
getTasks();

function addTask(task) {
    axios.post("http://localhost:3000/tasks", task)
        .then(function(response) {
            if (response.status === 201) {
                addCard(response.data);
                form.querySelector("input[name=title]").value = "";
                form.querySelector("select[name=type]").value = "todo";
            }
        });
}

function removeTask(task) {
    axios.delete("http://localhost:3000/tasks/" + task.id)
        .then(function(response) {
            if (response.status === 200) {
                removeCard(task);
            }
        });
}

function editTask(task) {
    axios.put("http://localhost:3000/tasks/" + task.id, task)
        .then(function(response) {
            console.log(response);
            if (response.status === 200) {
                removeCard(task);
                addCard(task);
            }
        });
}
