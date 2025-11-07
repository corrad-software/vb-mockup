<template>
  <div>
    <!-- Page Header -->
    <div class="mb-4 flex items-end justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-1">Task Management</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Manage and track all your tasks in one place
        </p>
      </div>
      <RsButton @click="showCreateModal = true" size="md">
        <Icon name="mdi:plus" class="w-4 h-4" />
        Create Task
      </RsButton>
    </div>

    <!-- Master-Detail Grid (40/60) -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
      <!-- Left Panel (40%) - Task List -->
      <div class="lg:col-span-2">
        <RsCard>
          <template #header>
            <h2 class="text-lg font-semibold">Tasks ({{ filteredTasks.length }})</h2>
          </template>
          <template #body>
            <!-- Search & Filters -->
            <div class="mb-3 space-y-2">
              <FormKit
                type="text"
                v-model="searchQuery"
                placeholder="Search tasks..."
                :classes="{ outer: 'mb-0' }"
              />
              <div class="grid grid-cols-2 gap-2">
                <FormKit
                  type="select"
                  v-model="filterStatus"
                  placeholder="All Status"
                  :options="statusOptions"
                  :classes="{ outer: 'mb-0' }"
                />
                <FormKit
                  type="select"
                  v-model="filterPriority"
                  placeholder="All Priority"
                  :options="priorityOptions"
                  :classes="{ outer: 'mb-0' }"
                />
              </div>
            </div>

            <!-- Task List -->
            <div class="space-y-2 max-h-[600px] overflow-y-auto">
              <div
                v-for="task in filteredTasks"
                :key="task.id"
                @click="selectTask(task)"
                :class="[
                  'p-2 border rounded-md cursor-pointer transition-colors',
                  selectedTask?.id === task.id
                    ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                ]"
              >
                <div class="flex items-start justify-between mb-1">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium truncate">{{ task.title }}</h3>
                  </div>
                  <RsBadge :variant="getStatusVariant(task.status)" class="ml-2 flex-shrink-0">
                    {{ task.status }}
                  </RsBadge>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{{ task.assignedTo }}</span>
                  <RsBadge :variant="getPriorityVariant(task.priority)" size="sm">
                    {{ task.priority }}
                  </RsBadge>
                </div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Due: {{ task.dueDate }}
                </div>
              </div>
            </div>
          </template>
        </RsCard>
      </div>

      <!-- Right Panel (60%) - Complex Grid Layout -->
      <div class="lg:col-span-3">
        <div v-if="selectedTask" class="grid grid-cols-1 gap-3 h-full">
          <!-- Top Panel - Task Header & Actions -->
          <RsCard>
            <template #header>
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h2 class="text-lg font-semibold mb-1">{{ selectedTask.title }}</h2>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Created {{ selectedTask.createdAt }} by {{ selectedTask.createdBy }}
                  </p>
                </div>
                <div class="flex gap-2 flex-shrink-0 ml-3">
                  <RsButton @click="editTask" size="sm" variant="outline">
                    <Icon name="mdi:pencil" class="w-4 h-4" />
                    Edit
                  </RsButton>
                  <RsButton @click="deleteTask" size="sm" variant="danger">
                    <Icon name="mdi:delete" class="w-4 h-4" />
                    Delete
                  </RsButton>
                </div>
              </div>
            </template>
            <template #body>
              <!-- Quick Info Grid -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Status
                  </label>
                  <RsBadge :variant="getStatusVariant(selectedTask.status)">
                    {{ selectedTask.status }}
                  </RsBadge>
                </div>
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
                <div>
                  <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Due Date
                  </label>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    {{ selectedTask.dueDate }}
                  </p>
                </div>
              </div>
              
              <!-- Progress Bar -->
              <div class="mt-3">
                <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                  Progress
                </label>
                <RsProgressBar :value="selectedTask.progress" :max="100" />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ selectedTask.progress }}% complete
                </p>
              </div>
            </template>
          </RsCard>

          <!-- Bottom Row - Two Equal Panels -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <!-- Left Bottom Panel - Task Details -->
            <RsCard>
              <template #header>
                <h3 class="text-base font-semibold">Task Details</h3>
              </template>
              <template #body>
                <div class="space-y-3">
                  <!-- Description -->
                  <div>
                    <label class="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Description
                    </label>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      {{ selectedTask.description }}
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
                </div>
              </template>
            </RsCard>

            <!-- Right Bottom Panel - Comments & Activity -->
            <RsCard>
              <template #header>
                <h3 class="text-base font-semibold">Comments & Activity</h3>
              </template>
              <template #body>
                <RsTab>
                  <RsTabItem title="Comments">
                    <template #title>
                      <span class="flex items-center gap-1">
                        <Icon name="mdi:comment-outline" class="w-4 h-4" />
                        Comments ({{ selectedTask.comments.length }})
                      </span>
                    </template>
                    <div class="space-y-3">
                      <!-- Add Comment -->
                      <div class="pb-3 border-b border-gray-200 dark:border-gray-700">
                        <FormKit
                          type="textarea"
                          v-model="newComment"
                          placeholder="Add a comment..."
                          :classes="{ outer: 'mb-2' }"
                        />
                        <RsButton @click="addComment" size="sm">
                          Post Comment
                        </RsButton>
                      </div>

                      <!-- Comments List -->
                      <div class="space-y-2 max-h-[200px] overflow-y-auto">
                        <div
                          v-for="comment in selectedTask.comments"
                          :key="comment.id"
                          class="p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                        >
                          <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {{ comment.user }}
                            </span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                              {{ comment.date }}
                            </span>
                          </div>
                          <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ comment.text }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RsTabItem>

                  <RsTabItem title="Activity">
                    <template #title>
                      <span class="flex items-center gap-1">
                        <Icon name="mdi:history" class="w-4 h-4" />
                        Activity
                      </span>
                    </template>
                    <div class="space-y-2 max-h-[200px] overflow-y-auto">
                      <div
                        v-for="activity in selectedTask.activities"
                        :key="activity.id"
                        class="flex items-start gap-2 p-2 border-l-2 border-primary-300 dark:border-primary-700"
                      >
                        <Icon name="mdi:circle-small" class="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <div class="flex-1 min-w-0">
                          <p class="text-sm text-gray-700 dark:text-gray-300">
                            <span class="font-medium">{{ activity.user }}</span>
                            {{ activity.action }}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ activity.date }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RsTabItem>
                </RsTab>
              </template>
            </RsCard>
          </div>
        </div>

        <RsCard v-else>
          <template #body>
            <div class="text-center py-12 text-gray-500 dark:text-gray-400">
              <Icon name="mdi:clipboard-text-outline" class="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p class="text-sm">Select a task to view details</p>
            </div>
          </template>
        </RsCard>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <RsModal v-model="showCreateModal" title="Create New Task">
      <template #body>
        <div class="space-y-3">
          <FormKit type="text" label="Title" placeholder="Enter task title" />
          <FormKit type="textarea" label="Description" placeholder="Enter task description" />
          <div class="grid grid-cols-2 gap-3">
            <FormKit type="select" label="Status" :options="statusOptions" />
            <FormKit type="select" label="Priority" :options="priorityOptions" />
          </div>
          <FormKit type="text" label="Assigned To" placeholder="Enter assignee name" />
          <FormKit type="date" label="Due Date" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <RsButton @click="showCreateModal = false" variant="outline" size="md">
            Cancel
          </RsButton>
          <RsButton @click="createTask" size="md">
            Create Task
          </RsButton>
        </div>
      </template>
    </RsModal>
  </div>
</template>

<script setup>
// Mock data
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
      { id: 2, user: "John Doe", text: "JWT implementation completed", date: "2025-10-12" },
      { id: 3, user: "John Doe", text: "Working on email verification now", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-10 09:00" },
      { id: 2, user: "John Doe", action: "changed status to In Progress", date: "2025-10-10 14:30" },
      { id: 3, user: "John Doe", action: "updated progress to 60%", date: "2025-10-14 11:20" }
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
    comments: [
      { id: 1, user: "Mike Wilson", text: "Please review the wireframes first", date: "2025-10-12" }
    ],
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
      { id: 1, user: "David Chen", text: "Identified 5 slow queries", date: "2025-10-09" },
      { id: 2, user: "David Chen", text: "All queries optimized and tested", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-08 08:30" },
      { id: 2, user: "David Chen", action: "changed status to In Progress", date: "2025-10-09 09:00" },
      { id: 3, user: "David Chen", action: "changed status to Done", date: "2025-10-14 16:45" }
    ]
  },
  {
    id: 4,
    title: "Write API documentation",
    description: "Create comprehensive API documentation using OpenAPI/Swagger. Include examples and authentication details.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Emily Brown",
    createdBy: "John Doe",
    dueDate: "2025-10-22",
    createdAt: "2025-10-11",
    tags: ["documentation", "api"],
    progress: 45,
    comments: [
      { id: 1, user: "Emily Brown", text: "Working on authentication endpoints", date: "2025-10-13" }
    ],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-11 11:00" },
      { id: 2, user: "Emily Brown", action: "changed status to In Progress", date: "2025-10-11 14:20" }
    ]
  },
  {
    id: 5,
    title: "Fix mobile navigation menu",
    description: "The mobile hamburger menu is not closing properly on iOS devices. Investigate and fix the issue.",
    status: "blocked",
    priority: "urgent",
    assignedTo: "Alex Turner",
    createdBy: "Sarah Johnson",
    dueDate: "2025-10-18",
    createdAt: "2025-10-13",
    tags: ["frontend", "bug", "mobile"],
    progress: 20,
    comments: [
      { id: 1, user: "Alex Turner", text: "Blocked by iOS testing device availability", date: "2025-10-14" },
      { id: 2, user: "Sarah Johnson", text: "Device will be available tomorrow", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-13 15:30" },
      { id: 2, user: "Alex Turner", action: "changed status to Blocked", date: "2025-10-14 10:00" }
    ]
  },
  {
    id: 6,
    title: "Implement dark mode theme",
    description: "Add dark mode support across the entire application with smooth transitions and user preference persistence.",
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
    description: "Configure automated testing and deployment pipeline using GitHub Actions. Include staging and production environments.",
    status: "in-progress",
    priority: "high",
    assignedTo: "David Chen",
    createdBy: "John Doe",
    dueDate: "2025-10-19",
    createdAt: "2025-10-09",
    tags: ["devops", "automation"],
    progress: 75,
    comments: [
      { id: 1, user: "David Chen", text: "Staging pipeline is complete", date: "2025-10-13" },
      { id: 2, user: "David Chen", text: "Working on production deployment now", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-09 10:00" },
      { id: 2, user: "David Chen", action: "changed status to In Progress", date: "2025-10-09 11:30" },
      { id: 3, user: "David Chen", action: "updated progress to 75%", date: "2025-10-14 14:00" }
    ]
  },
  {
    id: 8,
    title: "Create user onboarding flow",
    description: "Design and implement a step-by-step onboarding process for new users with interactive tutorials.",
    status: "todo",
    priority: "medium",
    assignedTo: "Emily Brown",
    createdBy: "Sarah Johnson",
    dueDate: "2025-10-28",
    createdAt: "2025-10-14",
    tags: ["frontend", "ux"],
    progress: 0,
    comments: [
      { id: 1, user: "Sarah Johnson", text: "Please check the design mockups in Figma", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-14 13:45" }
    ]
  },
  {
    id: 9,
    title: "Refactor authentication middleware",
    description: "Clean up and optimize the authentication middleware code. Add better error handling and logging.",
    status: "done",
    priority: "medium",
    assignedTo: "John Doe",
    createdBy: "Jane Smith",
    dueDate: "2025-10-16",
    createdAt: "2025-10-10",
    tags: ["backend", "refactoring"],
    progress: 100,
    comments: [
      { id: 1, user: "John Doe", text: "Refactoring complete and tested", date: "2025-10-15" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-10 16:00" },
      { id: 2, user: "John Doe", action: "changed status to In Progress", date: "2025-10-11 09:00" },
      { id: 3, user: "John Doe", action: "changed status to Done", date: "2025-10-15 17:30" }
    ]
  },
  {
    id: 10,
    title: "Add email notification system",
    description: "Implement email notifications for important events like task assignments, mentions, and deadlines.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Alex Turner",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-24",
    createdAt: "2025-10-12",
    tags: ["backend", "notifications"],
    progress: 30,
    comments: [
      { id: 1, user: "Alex Turner", text: "Email templates are ready", date: "2025-10-13" }
    ],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-12 14:20" },
      { id: 2, user: "Alex Turner", action: "changed status to In Progress", date: "2025-10-13 10:00" }
    ]
  },
  {
    id: 11,
    title: "Upgrade to latest framework version",
    description: "Update the framework to the latest stable version and test all features for compatibility.",
    status: "todo",
    priority: "low",
    assignedTo: "David Chen",
    createdBy: "John Doe",
    dueDate: "2025-11-05",
    createdAt: "2025-10-14",
    tags: ["maintenance", "upgrade"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-14 11:30" }
    ]
  },
  {
    id: 12,
    title: "Implement file upload feature",
    description: "Add file upload functionality with drag-and-drop support, progress indicators, and file type validation.",
    status: "in-progress",
    priority: "high",
    assignedTo: "Sarah Johnson",
    createdBy: "Jane Smith",
    dueDate: "2025-10-21",
    createdAt: "2025-10-11",
    tags: ["frontend", "feature"],
    progress: 55,
    comments: [
      { id: 1, user: "Sarah Johnson", text: "Drag and drop is working", date: "2025-10-13" },
      { id: 2, user: "Sarah Johnson", text: "Adding file type validation next", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-11 10:45" },
      { id: 2, user: "Sarah Johnson", action: "changed status to In Progress", date: "2025-10-11 15:00" }
    ]
  },
  {
    id: 13,
    title: "Fix memory leak in dashboard",
    description: "Investigate and fix the memory leak that occurs when the dashboard is left open for extended periods.",
    status: "blocked",
    priority: "urgent",
    assignedTo: "Emily Brown",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-17",
    createdAt: "2025-10-13",
    tags: ["frontend", "bug", "performance"],
    progress: 10,
    comments: [
      { id: 1, user: "Emily Brown", text: "Need profiling tools access", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-13 09:00" },
      { id: 2, user: "Emily Brown", action: "changed status to Blocked", date: "2025-10-14 11:00" }
    ]
  },
  {
    id: 14,
    title: "Create admin dashboard",
    description: "Build a comprehensive admin dashboard with user management, system stats, and configuration options.",
    status: "todo",
    priority: "medium",
    assignedTo: "John Doe",
    createdBy: "Jane Smith",
    dueDate: "2025-10-30",
    createdAt: "2025-10-14",
    tags: ["frontend", "admin"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-14 14:00" }
    ]
  },
  {
    id: 15,
    title: "Implement search functionality",
    description: "Add full-text search with filters, sorting, and pagination. Include search history and suggestions.",
    status: "done",
    priority: "high",
    assignedTo: "Alex Turner",
    createdBy: "Sarah Johnson",
    dueDate: "2025-10-14",
    createdAt: "2025-10-07",
    tags: ["backend", "feature", "search"],
    progress: 100,
    comments: [
      { id: 1, user: "Alex Turner", text: "Search is working great!", date: "2025-10-13" },
      { id: 2, user: "Sarah Johnson", text: "Tested and approved", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-07 09:30" },
      { id: 2, user: "Alex Turner", action: "changed status to In Progress", date: "2025-10-08 10:00" },
      { id: 3, user: "Alex Turner", action: "changed status to Done", date: "2025-10-13 16:00" }
    ]
  },
  {
    id: 16,
    title: "Add unit tests for API endpoints",
    description: "Write comprehensive unit tests for all API endpoints with edge cases and error scenarios.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "David Chen",
    createdBy: "John Doe",
    dueDate: "2025-10-26",
    createdAt: "2025-10-13",
    tags: ["backend", "testing"],
    progress: 40,
    comments: [
      { id: 1, user: "David Chen", text: "Authentication tests complete", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-13 11:15" },
      { id: 2, user: "David Chen", action: "changed status to In Progress", date: "2025-10-13 14:00" }
    ]
  },
  {
    id: 17,
    title: "Design new landing page",
    description: "Create a modern, conversion-optimized landing page with hero section, features, testimonials, and CTA.",
    status: "todo",
    priority: "low",
    assignedTo: "Sarah Johnson",
    createdBy: "Mike Wilson",
    dueDate: "2025-11-10",
    createdAt: "2025-10-14",
    tags: ["frontend", "design", "marketing"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-14 15:30" }
    ]
  },
  {
    id: 18,
    title: "Implement real-time notifications",
    description: "Add WebSocket-based real-time notifications for task updates, mentions, and system alerts.",
    status: "in-progress",
    priority: "high",
    assignedTo: "Emily Brown",
    createdBy: "Jane Smith",
    dueDate: "2025-10-23",
    createdAt: "2025-10-12",
    tags: ["backend", "frontend", "realtime"],
    progress: 65,
    comments: [
      { id: 1, user: "Emily Brown", text: "WebSocket connection is stable", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-12 13:00" },
      { id: 2, user: "Emily Brown", action: "changed status to In Progress", date: "2025-10-12 16:00" }
    ]
  },
  {
    id: 19,
    title: "Create data export feature",
    description: "Allow users to export their data in CSV, JSON, and PDF formats with customizable fields.",
    status: "todo",
    priority: "medium",
    assignedTo: "Alex Turner",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-29",
    createdAt: "2025-10-14",
    tags: ["backend", "feature"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-14 16:45" }
    ]
  },
  {
    id: 20,
    title: "Optimize image loading",
    description: "Implement lazy loading, responsive images, and WebP format support for better performance.",
    status: "done",
    priority: "medium",
    assignedTo: "Sarah Johnson",
    createdBy: "John Doe",
    dueDate: "2025-10-15",
    createdAt: "2025-10-09",
    tags: ["frontend", "performance"],
    progress: 100,
    comments: [
      { id: 1, user: "Sarah Johnson", text: "All images are now lazy loaded", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "John Doe", action: "created task", date: "2025-10-09 14:00" },
      { id: 2, user: "Sarah Johnson", action: "changed status to In Progress", date: "2025-10-10 09:00" },
      { id: 3, user: "Sarah Johnson", action: "changed status to Done", date: "2025-10-14 18:00" }
    ]
  },
  {
    id: 21,
    title: "Add keyboard shortcuts",
    description: "Implement keyboard shortcuts for common actions to improve power user productivity.",
    status: "todo",
    priority: "low",
    assignedTo: "Emily Brown",
    createdBy: "Sarah Johnson",
    dueDate: "2025-11-08",
    createdAt: "2025-10-14",
    tags: ["frontend", "ux", "accessibility"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Sarah Johnson", action: "created task", date: "2025-10-14 17:20" }
    ]
  },
  {
    id: 22,
    title: "Fix timezone handling",
    description: "Resolve issues with timezone conversion and display. Ensure all dates are properly localized.",
    status: "in-progress",
    priority: "high",
    assignedTo: "David Chen",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-19",
    createdAt: "2025-10-13",
    tags: ["backend", "bug"],
    progress: 50,
    comments: [
      { id: 1, user: "David Chen", text: "Implementing moment-timezone", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-13 10:30" },
      { id: 2, user: "David Chen", action: "changed status to In Progress", date: "2025-10-13 15:00" }
    ]
  },
  {
    id: 23,
    title: "Create mobile app prototype",
    description: "Build a React Native prototype for iOS and Android with core features.",
    status: "todo",
    priority: "low",
    assignedTo: "Alex Turner",
    createdBy: "Jane Smith",
    dueDate: "2025-11-15",
    createdAt: "2025-10-14",
    tags: ["mobile", "prototype"],
    progress: 0,
    comments: [],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-14 18:00" }
    ]
  },
  {
    id: 24,
    title: "Implement rate limiting",
    description: "Add rate limiting to API endpoints to prevent abuse and ensure fair usage.",
    status: "done",
    priority: "high",
    assignedTo: "John Doe",
    createdBy: "Jane Smith",
    dueDate: "2025-10-13",
    createdAt: "2025-10-08",
    tags: ["backend", "security"],
    progress: 100,
    comments: [
      { id: 1, user: "John Doe", text: "Rate limiting is active on all endpoints", date: "2025-10-12" }
    ],
    activities: [
      { id: 1, user: "Jane Smith", action: "created task", date: "2025-10-08 11:00" },
      { id: 2, user: "John Doe", action: "changed status to In Progress", date: "2025-10-09 09:00" },
      { id: 3, user: "John Doe", action: "changed status to Done", date: "2025-10-12 17:00" }
    ]
  },
  {
    id: 25,
    title: "Add analytics dashboard",
    description: "Create an analytics dashboard with charts showing user activity, task completion rates, and system usage.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Sarah Johnson",
    createdBy: "Mike Wilson",
    dueDate: "2025-10-27",
    createdAt: "2025-10-13",
    tags: ["frontend", "analytics"],
    progress: 35,
    comments: [
      { id: 1, user: "Sarah Johnson", text: "Working on the chart components", date: "2025-10-14" }
    ],
    activities: [
      { id: 1, user: "Mike Wilson", action: "created task", date: "2025-10-13 12:00" },
      { id: 2, user: "Sarah Johnson", action: "changed status to In Progress", date: "2025-10-13 16:30" }
    ]
  }
]);

// Filter and search state
const searchQuery = ref("");
const filterStatus = ref("");
const filterPriority = ref("");
const selectedTask = ref(null);
const showCreateModal = ref(false);
const newComment = ref("");

// Options for filters
const statusOptions = [
  { label: "All Status", value: "" },
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
  { label: "Blocked", value: "blocked" }
];

const priorityOptions = [
  { label: "All Priority", value: "" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" }
];

// Computed filtered tasks
const filteredTasks = computed(() => {
  let tasks = mockTasks.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    tasks = tasks.filter(
      task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.assignedTo.toLowerCase().includes(query)
    );
  }

  // Filter by status
  if (filterStatus.value) {
    tasks = tasks.filter(task => task.status === filterStatus.value);
  }

  // Filter by priority
  if (filterPriority.value) {
    tasks = tasks.filter(task => task.priority === filterPriority.value);
  }

  return tasks;
});

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

const editTask = () => {
  alert("Edit functionality would open a modal with the task form");
};

const deleteTask = () => {
  if (confirm("Are you sure you want to delete this task?")) {
    alert("Task deleted (in prototype)");
    selectedTask.value = null;
  }
};

const createTask = () => {
  alert("Task created (in prototype)");
  showCreateModal.value = false;
};

const addComment = () => {
  if (newComment.value.trim() && selectedTask.value) {
    selectedTask.value.comments.push({
      id: selectedTask.value.comments.length + 1,
      user: "Current User",
      text: newComment.value,
      date: new Date().toISOString().split('T')[0]
    });
    newComment.value = "";
  }
};
</script>

