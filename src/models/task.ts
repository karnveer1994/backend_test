import QueryString, { ParsedQs } from "qs";

export interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}

export interface createOrUpdateTaskParams {
  title: string;
  description: string;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}

let tasks: Task[] = [];

export function getAllTodos(): Task[] {
  return tasks;
}

export function createTask(params: createOrUpdateTaskParams): Task {
  const { title, description, dueDate, assignedTo, category, status } = params
  const newTask: Task = {
    id: (tasks.length + 1).toString(),
    title,
    description,
    dueDate: new Date(dueDate),
    assignedTo,
    category,
    status,
    creationDate: new Date()
  };
  tasks.push(newTask);
  return newTask;
}

export function getTask(id: string): Task | string {
  const task = tasks.find(t => t.id === id)
  if (task){
    return task
  } else {
    return `Task not found with id = ${id}`
  }
}

export function updateTask(id: string, params: createOrUpdateTaskParams): Task | string {  
  const index = tasks.findIndex(obj => obj.id === id);

  if (index !== -1) {
    const updatedObject = { ...tasks[index], ...params };
    tasks[index] = updatedObject;
    return tasks[index]
  }

  return `Task not found with id = ${id}`
}

export function deleteTask(id: string): string {
  const index = tasks.findIndex((task) => task.id === id);
  if (index >= 0) {
    tasks.splice(index, 1)
    return "Task has been deleted Successfully"
  }
  return `Task not found with id = ${id}`
}

export function getAllTask(perPage: number, page: number): Task[] {
  const array = tasks;
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  array.slice(startIndex, endIndex)
  return array
}

export function filterByAssignedTo(username: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined): Task[] | [] {
  const filteredTasks = tasks.filter(t => t.assignedTo === username)
  return filteredTasks
}

export function filterByCategory(categoryName: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined): Task[] | [] {
  const filteredTasks = tasks.filter(t => t.category === categoryName)
  return filteredTasks
}
