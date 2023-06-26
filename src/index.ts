import { v4 as uuidV4 } from 'uuid';
//define types of the properties of the object Task
type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
};
//array task that contains all the tasks of our list
const tasks : Task[] = [];
const app = {
  init () {
    app.addListenerToForm();
  },

  listElm : document.querySelector<HTMLUListElement>("#list"),
  formElm : document.getElementById("new-task-form") as HTMLFormElement | null,
  inputElm : document.querySelector<HTMLInputElement>("#new-task-title"),
  
  addListenerToForm () {
    app.formElm?.addEventListener("submit", e => {
      e.preventDefault();
      if (app.inputElm?.value == ""|| app.inputElm?.value == null ) 
      {
        return
      } else {
        const newTask: Task = {
          id: uuidV4(), //using uuid to get a new unique id for each task
          title: app.inputElm?.value,
          completed: false,
          createdAt: new Date()
        };
        tasks.push(newTask);

        app.addListItem(newTask);
        app.inputElm.value = "";
      }
    });
    
    
  },

  addListItem (task: Task) {
    const itemElm = document.createElement("li");
    const labelElm = document.createElement("label");
    const checkboxElm = document.createElement("input");
    checkboxElm.type = "checkbox";
    checkboxElm.checked = task.completed;
    checkboxElm.addEventListener('change', () => {
      task.completed = checkboxElm.checked;
    });
    console.log(task.title);
    labelElm.append(checkboxElm, task.title);
    itemElm.append(labelElm);
    app.listElm?.append(itemElm);
  }
}
document.addEventListener('DOMContentLoaded', app.init );