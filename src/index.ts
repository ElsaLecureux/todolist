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

  listElm : document.querySelector<HTMLUListElement>("#list"), // this element is a HTML ul element or null
  formElm : document.getElementById("new-task-form") as HTMLFormElement | null, // this element is a form element or null
  inputElm : document.querySelector<HTMLInputElement>("#new-task-title"),
  // adding a event listener on the form, every time the form is submited (the button is pushed) the function addLIstItem is called
  addListenerToForm () {
    app.formElm?.addEventListener("submit", e => {
      //prevent from refresh the page
      e.preventDefault();
      //if input is a empty string or null then we don't execute the code after
      if (app.inputElm?.value == ""|| app.inputElm?.value == null ) return
        const newTask: Task = {
          id: uuidV4(), //using uuid to get a new unique id for each task
          title: app.inputElm?.value,
          completed: false,
          createdAt: new Date()
        };
        tasks.push(newTask);

        app.addListItem(newTask);
        app.inputElm.value = "";
    });
    
    
  },
  // creating a new task
  addListItem (task: Task) { // precising the types of task by using the object Task declared previoulsy
    const itemElm = document.createElement("li");
    const labelElm = document.createElement("label");
    const checkboxElm = document.createElement("input");
    checkboxElm.type = "checkbox";
    // the checkbox is created checked or unchecked depending on if the task is completed or not
    checkboxElm.checked = task.completed;
    //we put an event listener on the checkbox, when the checkbox is changed, the information completed on the task is updated
    checkboxElm.addEventListener('change', () => {
      task.completed = checkboxElm.checked;
    });
    labelElm.append(checkboxElm, task.title);
    itemElm.append(labelElm);
    app.listElm?.append(itemElm);
  }
}
document.addEventListener('DOMContentLoaded', app.init );