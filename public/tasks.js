const api = "/api/v1/tasks";
const tasksContainer$ = document.getElementById("tasks-container");
const saveTaskForm$ = document.getElementById("save-task");
const nameInput$ = document.getElementById("name");
const completedInput$ = document.getElementById("completed");

const showTasks = async () => {
  try {
    const {
      data: { tasks }
    } = await axios.get(api);
    if (tasks.length < 1) {
      tasksContainer$.innerHTML = "<h5>No tasks added yet...</h5>";
      return;
    }
    const allTasks = tasks
      .map(task => {
        const { completed, _id: taskID, name } = task;
        return `<div class="task ${completed && "completed"}" id="${taskID}">
                <h5>${name}</h5>
                <div>
                    <button class="delete">Delete</button>
                </div>
            </div>`;
      })
      .join("");
    tasksContainer$.innerHTML = allTasks;
  } catch (error) {
    tasksContainer$.innerHTML =
      "<h5>There was an error, try again later...</h5>";
  }
};

showTasks();

saveTaskForm$.addEventListener("submit", async e => {
  e.preventDefault();
  const name = nameInput$.value;
  const completed = completedInput$.checked;
  try {
    await axios.post(api, { name, completed });
    showTasks();
  } catch (error) {}
});

tasksContainer$.addEventListener("click", async e => {
  const el = e.target;
  if (el.classList.contains("delete")) {
    const id = el.parentElement.parentElement.id;
    try {
      await axios.delete(`${api}/${id}`);
      showTasks();
    } catch (error) {}
  } else {
    const id = el.id;
    window.location.href = `task.html?id=${id}`;
  }
});
