const request = require('supertest')
const app = require('../server');
const { createTask } = require('../models/task');

describe('Tasks Api', () => {
  let server;

  beforeAll(async () => {
    server = await app.listen(3000);
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return no results found message when tasks is empty', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toBe("No Results Found");
  });

  it('should create a task and return it', async () => {
    const data = {
      title: "Test Task",
      description: "This is a test task",
      dueDate: "15/10/2023",
      assignedTo: "john_doe",
      category: "Finance",
      status: "Pending"
    }
    const response = await request(app).post('/task').send(data)
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(data.title);
  });

  it('should return a list of tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it('should return a task with id', async () => {
    const response = await request(app).get("/task/1");
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Test Task");
    expect(response.body.id).toBe("1");
  });

  it('should return a message, task not found with id = 2', async () => {
    const response = await request(app).get("/task/2");
    expect(response.status).toBe(200);
    expect(response.body).toBe("Task not found with id = 2");
  });

  it('should update a task with id', async () => {
    const data = {
      title: "Test Task 2"
    }
    const response = await request(app).put("/task/1").send(data);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(data.title);
  });

  it('should return a message, task not found with id = 2', async () => {
    const data = {
      title: "Test Task 2"
    }
    const response = await request(app).put("/task/2").send(data);
    expect(response.status).toBe(200);
    expect(response.body).toBe("Task not found with id = 2");
  });

  it('should filter tasks by assignedTo', async () => {
    createTask({
      title: "Test Task 3",
      description: "This is a test task",
      dueDate: "15/10/2023",
      assignedTo: "john_doe2",
      category: "Account",
      status: "Pending"
    })
    const response = await request(app).get('/tasks?assignedTo=john_doe')
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should filter tasks by Category', async () => {
    createTask({
      title: "Test Task 3",
      description: "This is a test task",
      dueDate: "15/10/2023",
      assignedTo: "john_doe2",
      category: "Finance",
      status: "Pending"
    })
    const response = await request(app).get('/tasks?category=Account')
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should filter tasks by Category', async () => {
    createTask({
      title: "Test Task 3",
      description: "This is a test task",
      dueDate: "15/10/2023",
      assignedTo: "john_doe2",
      category: "Finance",
      status: "Pending"
    })
    const response = await request(app).get('/tasks?category=Account')
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  
});
