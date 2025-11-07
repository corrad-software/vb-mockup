<template>
  <div>
    <!-- Page Header -->
    <div class="mb-4 flex items-end justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-1">Task Board</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Kanban-style view of all tasks organized by status
        </p>
      </div>
      <RsButton @click="navigateTo('/kitchen-sink/task-management')" size="md" variant="outline">
        <Icon name="mdi:view-list" class="w-4 h-4" />
        List View
      </RsButton>
    </div>

    <!-- Master-Detail Grid (40/60) -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
      <!-- Left Panel (40%) - Kanban Board -->
      <div class="lg:col-span-2">
        <div class="space-y-3">
          <!-- To Do Column -->
          <RsCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">To Do</h3>
                <RsBadge variant="info">{{ todoTasks.length }}</RsBadge>
              </div>
            </template>
            <template #body>
              <div class="space-y-2 max-h-[200px] overflow-y-auto">
                <div
                  v-for="task in todoTasks"
                  :key="task.id"
                  @click="selectTask(task)"
                  :class="[
                    'p-2 border rounded-md cursor-pointer transition-colors',
                    selectedTask?.id === task.id
                      ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                  ]"
                >
                  <h4 class="text-sm font-medium mb-1">{{ task.title }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ task.assignedTo }}
                    </span>
                    <RsBadge :variant="getPriorityVariant(task.priority)" size="sm">
                      {{ task.priority }}
                    </RsBadge>
                  </div>
                </div>
                <div v-if="todoTasks.length === 0" class="text-center py-4 text-gray-400 text-sm">
                  No tasks
                </div>
              </div>
            </template>
          </RsCard>

          <!-- In Progress Column -->
          <RsCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">In Progress</h3>
                <RsBadge variant="warning">{{ inProgressTasks.length }}</RsBadge>
              </div>
            </template>
            <template #body>
              <div class="space-y-2 max-h-[200px] overflow-y-auto">
                <div
                  v-for="task in inProgressTasks"
                  :key="task.id"
                  @click="selectTask(task)"
                  :class="[
                    'p-2 border rounded-md cursor-pointer transition-colors',
                    selectedTask?.id === task.id
                      ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                  ]"
                >
                  <h4 class="text-sm font-medium mb-1">{{ task.title }}</h4>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ task.assignedTo }}
                    </span>
                    <RsBadge :variant="getPriorityVariant(task.priority)" size="sm">
                      {{ task.priority }}
                    </RsBadge>
                  </div>
                  <RsProgressBar :value="task.progress" :max="100" size="sm" />
                </div>
                <div v-if="inProgressTasks.length === 0" class="text-center py-4 text-gray-400 text-sm">
                  No tasks
                </div>
              </div>
            </template>
          </RsCard>

          <!-- Done Column -->
          <RsCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">Done</h3>
                <RsBadge variant="success">{{ doneTasks.length }}</RsBadge>
              </div>
            </template>
            <template #body>
              <div class="space-y-2 max-h-[200px] overflow-y-auto">
                <div
                  v-for="task in doneTasks"
                  :key="task.id"
                  @click="selectTask(task)"
                  :class="[
                    'p-2 border rounded-md cursor-pointer transition-colors',
                    selectedTask?.id === task.id
                      ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                  ]"
                >
                  <h4 class="text-sm font-medium mb-1 line-through text-gray-500">
                    {{ task.title }}
                  </h4>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ task.assignedTo }}
                    </span>
                    <Icon name="mdi:check-circle" class="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <div v-if="doneTasks.length === 0" class="text-center py-4 text-gray-400 text-sm">
                  No tasks
                </div>
              </div>
            </template>
          </RsCard>

          <!-- Blocked Column -->
          <RsCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">Blocked</h3>
                <RsBadge variant="danger">{{ blockedTasks.length }}</RsBadge>
              </div>
            </template>
            <template #body>
              <div class="space-y-2 max-h-[200px] overflow-y-auto">
                <div
                  v-for="task in blockedTasks"
                  :key="task.id"
                  @click="selectTask(task)"
                  :class="[
                    'p-2 border rounded-md cursor-pointer transition-colors',
                    selectedTask?.id === task.id
                      ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                  ]"
                >
                  <h4 class="text-sm font-medium mb-1">{{ task.title }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ task.assignedTo }}
                    </span>
                    <RsBadge :variant="getPriorityVariant(task.priority)" size="sm">
                      {{ task.priority }}
                    </RsBadge>
                  </div>
                </div>
                <div v-if="blockedTasks.length === 0" class="text-center py-4 text-gray-400 text-sm">
                  No tasks
                </div>
              </div>
            </template>
          </RsCard>
        </div>
      </div>

      <!-- Right Panel (60%) - Task Quick View -->
      <div class="lg:col-span-3">
        <RsCard v-if="selectedTask">
          <template #header>
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h2 class="text-lg font-semibold">{{ selectedTask.title }}</h2>
                  <RsBadge :variant="getStatusVariant(selectedTask.status)">
                    {{ selectedTask.status }}
                  </RsBadge>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Due: {{ selectedTask.dueDate }}
                </p>
              </div>
              <div class="flex gap-2 flex-shrink-0 ml-3">
                <RsButton @click="changeStatus('todo')" size="sm" variant="outline">
                  To Do
                </RsButton>
                <RsButton @click="changeStatus('in-progress')" size="sm" variant="outline">
                  In Progress
                </RsButton>
                <RsButton @click="changeStatus('done')" size="sm" variant="outline">
                  Done
                </RsButton>
              </div>
            </div>
          </template>
          <template #body>
            <div class="space-y-3">
              <!-- Priority & Assignee -->
              <div class="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Priority
                  </label>
                  <RsBadge :variant="getPriorityVariant(selectedTask.priority)">
                    {{ selectedTask.priority }}
                  </RsBadge>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Assigned To
                  </label>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    {{ selectedTask.assignedTo }}
                  </p>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                  Description
                </label>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  {{ selectedTask.description }}
                </p>
              </div>

              <!-- Progress (if in progress) -->
              <div v-if="selectedTask.status === 'in-progress'">
                <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                  Progress
                </label>
                <RsProgressBar :value="selectedTask.progress" :max="100" />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ selectedTask.progress }}% complete
                </p>
              </div>

              <!-- Tags -->
              <div>
                <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                  Tags
                </label>
                <div class="flex gap-2 flex-wrap">
                  <RsBadge v-for="tag in selectedTask.tags" :key="tag" variant="info">
                    {{ tag }}
                  </RsBadge>
                </div>
              </div>

              <!-- Recent Activity -->
              <div>
                <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-2">
                  Recent Activity
                </label>
                <div class="space-y-2">
                  <div
                    v-for="activity in selectedTask.activities.slice(-3)"
                    :key="activity.id"
                    class="flex items-start gap-2 text-sm"
                  >
                    <Icon name="mdi:circle-small" class="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <p class="text-gray-700 dark:text-gray-300">
                        <span class="font-medium">{{ activity.user }}</span>
                        {{ activity.action }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ activity.date }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Comments Count -->
              <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Icon name="mdi:comment-outline" class="w-4 h-4" />
                  <span>{{ selectedTask.comments.length }} comments</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <RsButton @click="viewDetails" size="md" class="flex-1">
                  View Full Details
                </RsButton>
                <RsButton @click="editTask" size="md" variant="outline">
                  <Icon name="mdi:pencil" class="w-4 h-4" />
                </RsButton>
              </div>
            </div>
          </template>
        </RsCard>

        <RsCard v-else>
          <template #body>
            <div class="text-center py-12 text-gray-500 dark:text-gray-400">
              <Icon name="mdi:view-dashboard-outline" class="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p class="text-sm">Select a task from the board to view details</p>
            </div>
          </template>
        </RsCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock data - same as index.vue
const mockTasks = ref([
  {
    id: 1,
    title: "Implement user authentication system",
    description: "Add JWT-based authentication with login, registration, and password reset functionality. Include email verification and two-factor authentication support.",
    status: "in-progress",
    priority: "high",
    assignedTo: "John Doe",
    createdBy: "Jane Smith",
    dueDate: "2025-10-20",
    createdAt: "2025-10-10",
    tags: ["backend", "security"],
    progress: 60,
    comments: [
      { id: 1, user: "Jane Smith", text: "Started working on this task", date: "2025-10-10" },
      { id: 2, user: "John Doe", text: "JWT implementation completed", date: "2025-10-12" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-10 09:00" },
      { id: 2, user: "John Doe", action: "changed status to In Progress", date: "2025-10-10 14:30" }
    ]
  },
  {
    id: 2,
    title: "Design responsive dashboard layout",
    description: "Create a mobile-first responsive dashboard with widgets for analytics, recent activities, and quick actions.",
    status: "todo",
    priority: "medium",
    assignedTo: "Sarah Johnson",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-25",
    createdAt: "2025-10-12",
    tags: ["frontend", "design", "ui"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-12 10:15" }
    ]
  },
  {
    id: 3,
    title: "Optimize database queries",
    description: "Review and optimize slow database queries. Add indexes where necessary and implement query caching.",
    status: "done",
    priority: "high",
    assignedTo: "David Chen",
    createdBy: "Jane Smith",
    dueDate: "2025-10-15",
    createdAt: "2025-10-08",
    tags: ["backend", "performance", "database"],
    progress: 100,
    comments: [
      { id: 1, user: "David Chen", text: "All queries optimized", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-08 08:30" },
      { id: 2, user: "David Chen", action: "changed status to Done", date: "2025-10-14 16:45" }
    ]
  },
  {
    id: 4,
    title: "Write API documentation",
    description: "Create comprehensive API documentation using OpenAPI/Swagger.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Emily Brown",
    createdBy: "John Doe",
    dueDate: "2025-10-22",
    createdAt: "2025-10-11",
    tags: ["documentation", "api"],
    progress: 45,
    comments: [],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-11 11:00" }
    ]
  },
  {
    id: 5,
    title: "Fix mobile navigation menu",
    description: "The mobile hamburger menu is not closing properly on iOS devices.",
    status: "blocked",
    priority: "urgent",
    assignedTo: "Alex Turner",
    createdBy: "Sarah Johnson",
    dueDate: "2025-10-18",
    createdAt: "2025-10-13",
    tags: ["frontend", "bug", "mobile"],
    progress: 20,
    comments: [
      { id: 1, user: "Alex Turner", text: "Blocked by iOS testing device", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-13 15:30" }
    ]
  },
  {
    id: 6,
    title: "Implement dark mode theme",
    description: "Add dark mode support across the entire application.",
    status: "todo",
    priority: "low",
    assignedTo: "Sarah Johnson",
    createdBy: "Mike Wilson",
    dueDate: "2025-11-01",
    createdAt: "2025-10-14",
    tags: ["frontend", "ui", "theme"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-14 09:15" }
    ]
  },
  {
    id: 7,
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment pipeline using GitHub Actions.",
    status: "in-progress",
    priority: "high",
    assignedTo: "David Chen",
    createdBy: "John Doe",
    dueDate: "2025-10-19",
    createdAt: "2025-10-09",
    tags: ["devops", "automation"],
    progress: 75,
    comments: [],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-09 10:00" }
    ]
  },
  {
    id: 8,
    title: "Create user onboarding flow",
    description: "Design and implement a step-by-step onboarding process for new users.",
    status: "todo",
    priority: "medium",
    assignedTo: "Emily Brown",
    createdBy: "Sarah Johnson",
    dueDate: "2025-10-28",
    createdAt: "2025-10-14",
    tags: ["frontend", "ux"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-14 13:45" }
    ]
  },
  {
    id: 9,
    title: "Refactor authentication middleware",
    description: "Clean up and optimize the authentication middleware code.",
    status: "done",
    priority: "medium",
    assignedTo: "John Doe",
    createdBy: "Jane Smith",
    dueDate: "2025-10-16",
    createdAt: "2025-10-10",
    tags: ["backend", "refactoring"],
    progress: 100,
    comments: [],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-10 16:00" }
    ]
  },
  {
    id: 10,
    title: "Add email notification system",
    description: "Implement email notifications for important events.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Alex Turner",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-24",
    createdAt: "2025-10-12",
    tags: ["backend", "notifications"],
    progress: 30,
    comments: [],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-12 14:20" }
    ]
  },
  {
    id: 11,
    title: "Implement file upload feature",
    description: "Add file upload functionality with drag-and-drop support.",
    status: "in-progress",
    priority: "high",
    assignedTo: "Sarah Johnson",
    createdBy: "Jane Smith",
    dueDate: "2025-10-21",
    createdAt: "2025-10-11",
    tags: ["frontend", "feature"],
    progress: 55,
    comments: [],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-11 10:45" }
    ]
  },
  {
    id: 12,
    title: "Fix memory leak in dashboard",
    description: "Investigate and fix the memory leak in the dashboard.",
    status: "blocked",
    priority: "urgent",
    assignedTo: "Emily Brown",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-17",
    createdAt: "2025-10-13",
    tags: ["frontend", "bug", "performance"],
    progress: 10,
    comments: [],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-13 09:00" }
    ]
  },
  {
    id: 13,
    title: "Implement search functionality",
    description: "Add full-text search with filters and sorting.",
    status: "done",
    priority: "high",
    assignedTo: "Alex Turner",
    createdBy: "Sarah Johnson",
    dueDate: "2025-10-14",
    createdAt: "2025-10-07",
    tags: ["backend", "feature", "search"],
    progress: 100,
    comments: [],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-07 09:30" }
    ]
  },
  {
    id: 14,
    title: "Implement real-time notifications",
    description: "Add WebSocket-based real-time notifications.",
    status: "in-progress",
    priority: "high",
    assignedTo: "Emily Brown",
    createdBy: "Jane Smith",
    dueDate: "2025-10-23",
    createdAt: "2025-10-12",
    tags: ["backend", "frontend", "realtime"],
    progress: 65,
    comments: [],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-12 13:00" }
    ]
  },
  {
    id: 15,
    title: "Optimize image loading",
    description: "Implement lazy loading and responsive images.",
    status: "done",
    priority: "medium",
    assignedTo: "Sarah Johnson",
    createdBy: "John Doe",
    dueDate: "2025-10-15",
    createdAt: "2025-10-09",
    tags: ["frontend", "performance"],
    progress: 100,
    comments: [],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-09 14:00" }
    ]
  }
]);

const selectedTask = ref(null);

// Computed task groups by status
const todoTasks = computed(() => mockTasks.value.filter(t => t.status === "todo"));
const inProgressTasks = computed(() => mockTasks.value.filter(t => t.status === "in-progress"));
const doneTasks = computed(() => mockTasks.value.filter(t => t.status === "done"));
const blockedTasks = computed(() => mockTasks.value.filter(t => t.status === "blocked"));

// Methods
const selectTask = (task) => {
  selectedTask.value = task;
};

const getStatusVariant = (status) => {
  const variants = {
    "todo": "info",
    "in-progress": "warning",
    "done": "success",
    "blocked": "danger"
  };
  return variants[status] || "default";
};

const getPriorityVariant = (priority) => {
  const variants = {
    "low": "default",
    "medium": "info",
    "high": "warning",
    "urgent": "danger"
  };
  return variants[priority] || "default";
};

const changeStatus = (newStatus) => {
  if (selectedTask.value) {
    selectedTask.value.status = newStatus;
    alert(`Task status changed to ${newStatus} (in prototype)`);
  }
};

const viewDetails = () => {
  navigateTo('/kitchen-sink/task-management');
};

const editTask = () => {
  alert("Edit functionality would open a modal (in prototype)");
};
</script>

