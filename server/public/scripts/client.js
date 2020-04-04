console.log(`js on`);

$(document).ready(() => {
  console.log(`jq on`);

  getTasksFromDB();

  $(".js-btn-addTask").on("click", clickAddBtn);
  $(".js-tbody-outputTasks").on(
    "click",
    ".js-btn-taskComplete",
    clickCompleteBtn
  );
  $(".js-tbody-outputTasks").on("click", ".js-btn-taskDelete", clickDeleteBtn);
});

//
//  VARIABLES
//

let tasks = [];
let sortBy = "";

//
//  EVENT HANDLERS
//

function clickAddBtn() {
  let task = "";
  if (checkInputField()) {
    task = $(".js-input-addTask").val();
    addTaskToDB(task);
  } else {
    alert(`Please enter a task.`);
  }
}

function clickCompleteBtn() {
  const id = $(this).data("id");
  const completed = $(this).data("complete");

  completeTask(id, completed);
}

function clickDeleteBtn() {
  const id = $(this).data("id");

  deleteTask(id);
}

//
//  SERVER API INTERACTIONS
//

/**
 * Gets array of tasks from database.
 */
function getTasksFromDB() {
  $.ajax({
    method: "GET",
    url: `/tasks/${sortBy}`,
  })
    .then((response) => {
      console.log(response);
      tasks = response;
      renderTasks();
    })
    .catch((err) => {
      console.log(`ERROR GETTING TASKS: ${err}`);
    });
}

/**
 * Inserts a task to the database.
 */
function addTaskToDB(task) {
  const newTask = {
    task: task,
  };

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: newTask,
  })
    .then((response) => {
      console.log(response);
      getTasksFromDB();
    })
    .catch((err) => {
      console.log(`ERROR ADDING TASK: ${err}`);
    });
}

/**
 * Inverts the completed status of an item in the database.
 * @param {number} id The ID of the task in the database
 * @param {*} currentComplete The current completed state of the task in database. This will be inverted.
 */
function completeTask(id, completed) {
  const taskComplete = { completed: !completed }; // toggle the complete state of task

  $.ajax({
    method: "PUT",
    url: `/tasks/${id}`,
    data: taskComplete,
  })
    .then((response) => {
      console.log(response);
      getTasksFromDB();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Deletes a task from the database.
 * @param {number} id The ID of the task in the database.
 */
function deleteTask(id) {
  $.ajax({
    method: "DELETE",
    url: `/tasks/${id}`,
  })
    .then((response) => {
      console.log(response);
      getTasksFromDB();
    })
    .catch((err) => {
      console.log(err);
    });
}

//
//  DOM OUTPUTS
//

/**
 * Renders tasks as li in ul.
 */
function renderTasks() {
  $(".js-tbody-outputTasks").empty();
  for (let item of tasks) {
    $(".js-tbody-outputTasks").append(`
    <tr>
        <td>${item.task}</td>
        <td><button class="js-btn-taskComplete" data-id="${item.id}" data-complete="${item.completed}">complete</button></td>
        <td><button class="js-btn-taskDelete" data-id="${item.id}">delete</button></td>
    </tr>
    `);
  }
}

//
//  FUNCTIONS
//

/**
 * Checks for input in the add task field.
 * @returns bool. True if field has input.
 */
function checkInputField() {
  if ($(".js-input-addTask").val()) {
    return true;
  }
  return false;
}
