const api = "/api/v1/tasks";
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const editTaskForm$ = document.getElementById("edit-task");
const taskID$ = document.getElementById("taskID");
const taskName$ = document.getElementById("name");
const taskCompleted$ = document.getElementById("completed");

const showTask = async () => {
  try {
    const {
      data: { task }
    } = await axios.get(`${api}/${id}`);
    const { _id: taskID, completed, name } = task;
    taskID$.innerText += ` ${taskID}`;
    taskName$.value = name;
    taskCompleted$.checked = completed;
  } catch (error) {}
};

showTask();

editTaskForm$.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    const taskName = taskName$.value;
    const taskCompleted = taskCompleted$.checked;
    const {
      data: { task }
    } = await axios.patch(`${api}/${id}`, {
      name: taskName,
      completed: taskCompleted
    });
    const { _id: taskID, completed, name } = task;
    taskID$.innerText = `Task ID: ${taskID}`;
    taskName$.value = name;
    taskCompleted$.checked = completed;
  } catch (error) {}
});
