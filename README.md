# Task Manager Application

A simple and intuitive Task Manager web application that helps you organize and track your tasks efficiently. This application allows you to create, read, update, and delete tasks, along with viewing task statistics on a dashboard.

## Features

- **Task Management**: Create, view, edit, and delete tasks
- **Task Status Tracking**: Track tasks as 'Not Started', 'In Progress', or 'Completed'
- **Dashboard**: View task statistics including total tasks, in-progress tasks, and completed tasks
- **Responsive Design**: Works on both desktop and mobile devices
- **Motivational Quotes**: Get inspired with random motivational quotes
- **Due Date Tracking**: Set and track due dates for your tasks

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with Bootstrap 5.3.0)
  - JavaScript (ES6+)
  - Fetch API for RESTful service communication

- **Backend**:
  - RESTful API (Node.js/Express.js or similar - not included in this frontend code)

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local server to serve the application (if not using a development server)
- Backend API server running on `http://localhost:8080` (as per the frontend code)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-fd
   ```

2. **Set up the backend**
   - Ensure you have a backend server running that implements the following REST API endpoints:
     - `GET /api/tasks` - List all tasks
     - `POST /api/tasks` - Create a new task
     - `PUT /api/tasks/{id}` - Update a task
     - `DELETE /api/tasks/{id}` - Delete a task

3. **Run the application**
   - Open `index.htm` in your web browser
   - If you encounter CORS issues, serve the files using a local development server

## Usage

1. **Adding a New Task**
   - Click on the "Add New Task" tab
   - Fill in the task details (name, description, status, and due date)
   - Click "Add Task" to save

2. **Viewing Tasks**
   - Click on the "Dashboard" tab to view all tasks
   - The dashboard shows statistics about your tasks

3. **Editing a Task**
   - Click the "Edit" button next to any task
   - Update the task details in the modal
   - Click "Save Changes" to update

4. **Deleting a Task**
   - Click the "Done" button next to any task to delete it

## Project Structure

```
task-manager-fd/
├── index.htm          # Main HTML file
├── js/
│   └── task-manager.js  # Main JavaScript file
└── README.md          # This file
```

## API Documentation

The frontend expects the following API endpoints to be available:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

Built with ❤️ by Mohammed Saffan
