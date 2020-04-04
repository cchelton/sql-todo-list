console.log(`js on`);

$(document).ready(() => {
  console.log(`jq on`);

  getTasksFromDB();
});

//
//  VARIABLES
//

let tasks = [];
let sortBy = "";

//
//  EVENT HANDLERS
//

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

function addTaskToDB() {
  const testTask = {
    task: "DOM TEST TASK",
  };

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: testTask,
  })
    .then((response) => {
      console.log(response);
      getTasksFromDB();
    })
    .catch((err) => {
      console.log(`ERROR ADDING TASK: ${err}`);
    });
}

//
//  DOM OUTPUTS
//

/**
 * Renders tasks as li in ul.
 */
function renderTasks() {
  $(".js-ul-outputTasks").empty();
  for (let item of tasks) {
    $(".js-ul-outputTasks").append(`
    <li>${item.task}</li>
    `);
  }
}

//
//  FUNCTIONS
//
