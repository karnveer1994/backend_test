import { Request, Response } from 'express';
import * as TaskModel from '../models/task';

class TaskController {
  public createTask(req: Request, res: Response): void {
    const { title, description, dueDate, assignedTo, category, status } = req.body;
    const params = {
      title,
      description,
      dueDate,
      assignedTo,
      category,
      status
    }
    res.json(TaskModel.createTask(params))
  }

  public getTask(req: Request, res: Response): void {
    res.json(TaskModel.getTask(req.params.id))
  }

  public updateTask(req: Request, res: Response): void {
    const id = req.params.id
    const params = req.body
    const result =  TaskModel.updateTask(id, params)
    res.json(result)
  }

  public deleteTask(req: Request, res: Response): void {
    const id = req.params.id
    const result = TaskModel.deleteTask(id)
    res.json(result)
  }

  public getAllTasks(req: Request, res: Response): void {
    const { assignedTo, category } = req.query
    let tasks = []
    if (assignedTo) {
      tasks = TaskModel.filterByAssignedTo(assignedTo)
    } else if (category) {
      tasks = TaskModel.filterByCategory(category)
    } else {
      let perPage: number = 100
      let page: number = 1 
      if (req.query.perPage) {
        perPage = parseInt(req.query.perPage as string)
      }
      if (page) {
        page = parseInt(req.query.page as string)
      }
      tasks = TaskModel.getAllTask(perPage, page)
    }
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.json("No Results Found")
    }
  }
}

const taskController = new TaskController();
export default taskController;
