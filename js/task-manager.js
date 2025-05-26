// if form is submitted send the data to localhost:8080/api/tasks
// REST APIs
// GET /tasks – List all

// GET /tasks/{id} – Get by ID

// POST /tasks – Create new

// PUT /tasks/{id} – Update

// DELETE /tasks/{id} – Delete
//post
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
  
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const taskData = {
        title: document.getElementById('taskName').value,
        description: document.getElementById('taskDescription').value,
        status: document.getElementById('taskStatus').value,
        dueDate: document.getElementById('taskDueDate').value
      };
  
      await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
  
      await loadTasks();
      taskForm.reset();
    });

    document.getElementById('editTaskForm').addEventListener('submit', async (e) => {
      e.preventDefault();
    
      const taskId = document.getElementById('editTaskId').value;
      const taskData = {
        title: document.getElementById('editTaskName').value,
        description: document.getElementById('editTaskDescription').value,
        status: document.getElementById('editTaskStatus').value,
        dueDate: document.getElementById('editTaskDueDate').value
      };
    
      await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
    
      // Hide modal
      const editModalEl = document.getElementById('editTaskModal');
      const modalInstance = bootstrap.Modal.getInstance(editModalEl);
      modalInstance.hide();
    
      await loadTasks();
    });
    
  });
  
  async function loadTasks() {
    const response = await fetch('http://localhost:8080/api/tasks');
    const data = await response.json();
    const taskTableBody = document.querySelector('#taskTable tbody');
    taskTableBody.innerHTML = '';
    data.forEach(task => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${formatStatus(task.status)}</td>
        <td>${task.dueDate}</td>
        <td>
          <button class="btn btn-primary btn-edit">Edit</button>
          <button class="btn btn-danger btn-delete">Done</button>
        </td>
      `;
      taskTableBody.appendChild(row);
    });
  
    addDeleteListeners();
    addEditListeners();
  }
  
  function addDeleteListeners() {
    document.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', async (e) => {
        const taskId = e.target.closest('tr').querySelector('td:first-child').textContent;
        await fetch(`http://localhost:8080/api/tasks/${taskId}`, { method: 'DELETE' });
        await loadTasks();
      });
    });
  }
  
  function addEditListeners() {
    const statusMap = {
      "Not Started": "not-started",
      "In Progress": "in-progress",
      "Completed": "completed"
    };
  
    document.querySelectorAll('.btn-edit').forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const taskId = row.querySelector('td:nth-child(1)').textContent;
        const title = row.querySelector('td:nth-child(2)').textContent;
        const description = row.querySelector('td:nth-child(3)').textContent;
        const statusText = row.querySelector('td:nth-child(4)').textContent.trim(); // safer
        const statusValue = statusMap[statusText] || "not-started"; // fallback if mapping fails
        const dueDate = row.querySelector('td:nth-child(5)').textContent;
  
        // Prefill modal form
        document.getElementById('editTaskId').value = taskId;
        document.getElementById('editTaskName').value = title;
        document.getElementById('editTaskDescription').value = description;
        document.getElementById('editTaskStatus').value = statusValue;
        document.getElementById('editTaskDueDate').value = dueDate;
  
        // Show modal
        const editModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editModal.show();
      });
    });
  }
  function formatStatus(status) {
    const statusLabels = {
      "not-started": "Not Started",
      "in-progress": "In Progress",
      "completed": "Completed"
    };
    return statusLabels[status] || status;
  }
  