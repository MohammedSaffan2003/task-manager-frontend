// if form is submitted send the data to localhost:8080/api/tasks
// REST APIs
// GET /tasks – List all

// GET /tasks/{id} – Get by ID

// POST /tasks – Create new

// PUT /tasks/{id} – Update

// DELETE /tasks/{id} – Delete
//post

// Motivational quotes functionality
const quotes = [
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "The best way to predict your future is to create it. - Abraham Lincoln",
  "Opportunities don't happen. You create them. - Chris Grosser",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill"
];

// Function to get a random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to update quote based on hour
function updateQuote() {
  const quoteElement = document.getElementById('quoteText');
  const currentHour = new Date().getHours();
  // Store the quote for the current hour in localStorage
  const storedQuote = localStorage.getItem(`quote_${currentHour}`);
  
  if (!storedQuote) {
    const newQuote = getRandomQuote();
    localStorage.setItem(`quote_${currentHour}`, newQuote);
    quoteElement.textContent = newQuote;
  } else {
    quoteElement.textContent = storedQuote;
  }
}

// Function to format status display
function formatStatus(status) {
  const statusLabels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    "completed": "Completed"
  };
  return statusLabels[status] || status;
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only update quote when Add New Task tab is active
  const tasksTab = document.getElementById('tasks-tab');
  if (tasksTab.classList.contains('active')) {
    updateQuote();
  }

  // Update quote when Add New Task tab is shown
  tasksTab.addEventListener('shown.bs.tab', () => {
    updateQuote();
  });

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

  // Edit task form submission
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

// Function to load tasks from API
async function loadTasks() {
  const response = await fetch('http://localhost:8080/api/tasks');
  const tasks = await response.json();

  // Update dashboard statistics
  updateDashboardStats(tasks);

  const taskTableBody = document.querySelector('#taskTable tbody');
  taskTableBody.innerHTML = '';
  tasks.forEach(task => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <!-- <td>${task.id}</td> -->
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

// Function to update dashboard statistics
function updateDashboardStats(tasks) {
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  document.getElementById('totalTasks').textContent = totalTasks;
  document.getElementById('inProgressTasks').textContent = inProgressTasks;
  document.getElementById('completedTasks').textContent = completedTasks;
}

// Function to add delete listeners to task table
function addDeleteListeners() {
  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async (e) => {
      const taskId = e.target.closest('tr').querySelector('td:first-child').textContent;
      await fetch(`http://localhost:8080/api/tasks/${taskId}`, { method: 'DELETE' });
      await loadTasks();
    });
  });
}

// Function to add edit listeners to task table
function addEditListeners() {
  const statusMap = {
    "Not Started": "not-started",
    "In Progress": "in-progress",
    "Completed": "completed"
  };

  document.querySelectorAll('.btn-edit').forEach((button, index) => {
    button.addEventListener('click', (e) => {
      const row = e.target.closest('tr');

      // Use dataset or hidden id instead of relying on table text for ID
      // Assuming task ID is not in table, fetch tasks from API and store with DOM if needed
      // For now we'll skip setting ID correctly

      const title = row.querySelector('td:nth-child(1)').textContent;
      const description = row.querySelector('td:nth-child(2)').textContent;
      const statusText = row.querySelector('td:nth-child(3)').textContent.trim();
      const statusValue = statusMap[statusText] || "not-started";
      const dueDate = row.querySelector('td:nth-child(4)').textContent;

      // This ID setting won't work unless you embed ID elsewhere (recommend using a data attribute or hidden field)
      // document.getElementById('editTaskId').value = taskId;

      document.getElementById('editTaskName').value = title;
      document.getElementById('editTaskDescription').value = description;
      document.getElementById('editTaskStatus').value = statusValue;
      document.getElementById('editTaskDueDate').value = dueDate;

      const editModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
      editModal.show();
    });
  });
}


// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  updateQuote();
  
  // Update quote when tab changes
  document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(button => {
    button.addEventListener('shown.bs.tab', () => {
      updateQuote();
    });
  });

  loadTasks();
});