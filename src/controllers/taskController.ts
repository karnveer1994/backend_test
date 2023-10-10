import { Request, Response } from 'express';

class TaskController {
  public getAllTasks(req: Request, res: Response): void {
    console.log("I am in all tasks")
    res.json()
  }

  public createTask(req: Request, res: Response): void {
    // Logic to create a new todo and save it to the database
    // Send response to client
  }
}

const taskController = new TaskController();
export default taskController;
