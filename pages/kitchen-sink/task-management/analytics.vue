<template>
  <div>
    <!-- Page Header -->
    <div class="mb-4 flex items-end justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-1">Task Analytics</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Overview of task completion metrics and team performance
        </p>
      </div>
      <RsButton @click="navigateTo('/kitchen-sink/task-management')" size="md" variant="outline">
        <Icon name="mdi:view-list" class="w-4 h-4" />
        List View
      </RsButton>
    </div>

    <!-- Master-Detail Grid (40/60) -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
      <!-- Left Panel (40%) - Metrics & Filters -->
      <div class="lg:col-span-2">
        <div class="space-y-3">
          <!-- Filters -->
          <RsCard>
            <template #header>
              <h2 class="text-lg font-semibold">Filters</h2>
            </template>
            <template #body>
              <div class="space-y-2">
                <FormKit
                  type="select"
                  label="Time Period"
                  v-model="selectedPeriod"
                  :options="periodOptions"
                  :classes="{ outer: 'mb-2' }"
                />
                <FormKit
                  type="select"
                  label="Team Member"
                  v-model="selectedMember"
                  :options="memberOptions"
                  :classes="{ outer: 'mb-0' }"
                />
              </div>
            </template>
          </RsCard>

          <!-- Key Metrics Cards -->
          <RsCard>
            <template #header>
              <h2 class="text-lg font-semibold">Key Metrics</h2>
            </template>
            <template #body>
              <div class="grid grid-cols-2 gap-3">
                <!-- Total Tasks -->
                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <div class="flex items-center justify-between mb-1">
                    <Icon name="mdi:clipboard-text" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <RsBadge variant="info">{{ stats.total }}</RsBadge>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Total Tasks</p>
                </div>

                <!-- Completed -->
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <div class="flex items-center justify-between mb-1">
                    <Icon name="mdi:check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
                    <RsBadge variant="success">{{ stats.completed }}</RsBadge>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Completed</p>
                </div>

                <!-- In Progress -->
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                  <div class="flex items-center justify-between mb-1">
                    <Icon name="mdi:progress-clock" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <RsBadge variant="warning">{{ stats.inProgress }}</RsBadge>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">In Progress</p>
                </div>

                <!-- Blocked -->
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                  <div class="flex items-center justify-between mb-1">
                    <Icon name="mdi:alert-circle" class="w-5 h-5 text-red-600 dark:text-red-400" />
                    <RsBadge variant="danger">{{ stats.blocked }}</RsBadge>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Blocked</p>
                </div>
              </div>

              <!-- Completion Rate -->
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Completion Rate
                  </span>
                  <span class="text-sm font-bold text-green-600 dark:text-green-400">
                    {{ completionRate }}%
                  </span>
                </div>
                <RsProgressBar :value="completionRate" :max="100" variant="success" />
              </div>
            </template>
          </RsCard>

          <!-- Priority Distribution -->
          <RsCard>
            <template #header>
              <h2 class="text-lg font-semibold">Priority Distribution</h2>
            </template>
            <template #body>
              <div class="space-y-2">
                <div
                  v-for="priority in priorityStats"
                  :key="priority.name"
                  class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                >
                  <div class="flex items-center gap-2">
                    <RsBadge :variant="getPriorityVariant(priority.name)">
                      {{ priority.name }}
                    </RsBadge>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ priority.count }}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      ({{ priority.percentage }}%)
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </RsCard>
        </div>
      </div>

      <!-- Right Panel (60%) - Detailed Stats -->
      <div class="lg:col-span-3">
        <div class="space-y-3">
          <!-- Status Breakdown -->
          <RsCard>
            <template #header>
              <h2 class="text-lg font-semibold">Status Breakdown</h2>
            </template>
            <template #body>
              <RsTable
                :field="statusTableFields"
                :data="statusTableData"
                :basic="true"
                :options="{
                  variant: 'default',
                  striped: true,
                  hover: true
                }"
              />
            </template>
          </RsCard>

          <!-- Team Performance -->
          <RsCard>
            <template #header>
              <h2 class="text-lg font-semibold">Team Performance</h2>
            </template>
            <template #body>
              <RsTable
                :field="teamTableFields"
                :data="teamTableData"
                :basic="true"
                :options="{
                  variant: 'default',
                  striped: true,
                  hover: true
                }"
              />
            </template>
          </RsCard>

          <!-- Recent Completions -->
          <RsCard>
            <template #header>
              <h2 class="text-lg font-semibold">Recently Completed Tasks</h2>
            </template>
            <template #body>
              <div class="space-y-2">
                <div
                  v-for="task in recentCompletions"
                  :key="task.id"
                  class="p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                      {{ task.title }}
                    </h3>
                    <Icon name="mdi:check-circle" class="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{{ task.assignedTo }}</span>
                    <span>{{ task.dueDate }}</span>
                  </div>
                  <div class="flex gap-1 mt-1">
                    <RsBadge
                      v-for="tag in task.tags.slice(0, 2)"
                      :key="tag"
                      variant="info"
                      size="sm"
                    >
                      {{ tag }}
                    </RsBadge>
                  </div>
                </div>
              </div>
            </template>
          </RsCard>

          <!-- Overdue & At Risk -->
          <RsCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">Overdue & At Risk</h2>
                <RsBadge variant="danger">{{ overdueCount }}</RsBadge>
              </div>
            </template>
            <template #body>
              <div v-if="overdueCount > 0" class="space-y-2">
                <RsAlert variant="warning">
                  <p class="text-sm">
                    There are {{ overdueCount }} tasks that need immediate attention.
                  </p>
                </RsAlert>
                <div class="space-y-2">
                  <div
                    v-for="task in atRiskTasks"
                    :key="task.id"
                    class="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
                  >
                    <div class="flex items-start justify-between mb-1">
                      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                        {{ task.title }}
                      </h3>
                      <RsBadge :variant="getPriorityVariant(task.priority)" class="flex-shrink-0 ml-2">
                        {{ task.priority }}
                      </RsBadge>
                    </div>
                    <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{{ task.assignedTo }}</span>
                      <span class="text-red-600 dark:text-red-400 font-medium">
                        Due: {{ task.dueDate }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
                <Icon name="mdi:check-circle-outline" class="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p class="text-sm">All tasks are on track!</p>
              </div>
            </template>
          </RsCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock data - same tasks as other pages
const mockTasks = ref([
  {
    id: 1,
    title: "Implement user authentication system",
    description: "Add JWT-based authentication",
    status: "in-progress",
    priority: "high",
    assignedTo: "John Doe",
    createdBy: "Jane Smith",
    dueDate: "2025-10-20",
    createdAt: "2025-10-10",
    tags: ["backend", "security"],
    progress: 60
  },
  {
    id: 2,
    title: "Design responsive dashboard layout",
    status: "todo",
    priority: "medium",
    assignedTo: "Sarah Johnson",
    dueDate: "2025-10-25",
    tags: ["frontend", "design"],
    progress: 0
  },
  {
    id: 3,
    title: "Optimize database queries",
    status: "done",
    priority: "high",
    assignedTo: "David Chen",
    dueDate: "2025-10-15",
    tags: ["backend", "performance"],
    progress: 100
  },
  {
    id: 4,
    title: "Write API documentation",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Emily Brown",
    dueDate: "2025-10-22",
    tags: ["documentation"],
    progress: 45
  },
  {
    id: 5,
    title: "Fix mobile navigation menu",
    status: "blocked",
    priority: "urgent",
    assignedTo: "Alex Turner",
    dueDate: "2025-10-18",
    tags: ["frontend", "bug"],
    progress: 20
  },
  {
    id: 6,
    title: "Implement dark mode theme",
    status: "todo",
    priority: "low",
    assignedTo: "Sarah Johnson",
    dueDate: "2025-11-01",
    tags: ["frontend", "ui"],
    progress: 0
  },
  {
    id: 7,
    title: "Set up CI/CD pipeline",
    status: "in-progress",
    priority: "high",
    assignedTo: "David Chen",
    dueDate: "2025-10-19",
    tags: ["devops"],
    progress: 75
  },
  {
    id: 8,
    title: "Create user onboarding flow",
    status: "todo",
    priority: "medium",
    assignedTo: "Emily Brown",
    dueDate: "2025-10-28",
    tags: ["frontend", "ux"],
    progress: 0
  },
  {
    id: 9,
    title: "Refactor authentication middleware",
    status: "done",
    priority: "medium",
    assignedTo: "John Doe",
    dueDate: "2025-10-16",
    tags: ["backend"],
    progress: 100
  },
  {
    id: 10,
    title: "Add email notification system",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Alex Turner",
    dueDate: "2025-10-24",
    tags: ["backend"],
    progress: 30
  },
  {
    id: 11,
    title: "Implement file upload feature",
    status: "in-progress",
    priority: "high",
    assignedTo: "Sarah Johnson",
    dueDate: "2025-10-21",
    tags: ["frontend"],
    progress: 55
  },
  {
    id: 12,
    title: "Fix memory leak in dashboard",
    status: "blocked",
    priority: "urgent",
    assignedTo: "Emily Brown",
    dueDate: "2025-10-17",
    tags: ["frontend", "bug"],
    progress: 10
  },
  {
    id: 13,
    title: "Implement search functionality",
    status: "done",
    priority: "high",
    assignedTo: "Alex Turner",
    dueDate: "2025-10-14",
    tags: ["backend"],
    progress: 100
  },
  {
    id: 14,
    title: "Implement real-time notifications",
    status: "in-progress",
    priority: "high",
    assignedTo: "Emily Brown",
    dueDate: "2025-10-23",
    tags: ["backend", "frontend"],
    progress: 65
  },
  {
    id: 15,
    title: "Optimize image loading",
    status: "done",
    priority: "medium",
    assignedTo: "Sarah Johnson",
    dueDate: "2025-10-15",
    tags: ["frontend"],
    progress: 100
  }
]);

// Filter state
const selectedPeriod = ref("this-month");
const selectedMember = ref("");

const periodOptions = [
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "This Quarter", value: "this-quarter" },
  { label: "This Year", value: "this-year" }
];

const memberOptions = [
  { label: "All Members", value: "" },
  { label: "John Doe", value: "John Doe" },
  { label: "Sarah Johnson", value: "Sarah Johnson" },
  { label: "David Chen", value: "David Chen" },
  { label: "Emily Brown", value: "Emily Brown" },
  { label: "Alex Turner", value: "Alex Turner" }
];

// Computed statistics
const stats = computed(() => {
  const tasks = mockTasks.value;
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "done").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    todo: tasks.filter(t => t.status === "todo").length,
    blocked: tasks.filter(t => t.status === "blocked").length
  };
});

const completionRate = computed(() => {
  if (stats.value.total === 0) return 0;
  return Math.round((stats.value.completed / stats.value.total) * 100);
});

const priorityStats = computed(() => {
  const tasks = mockTasks.value;
  const priorities = ["urgent", "high", "medium", "low"];
  
  return priorities.map(priority => {
    const count = tasks.filter(t => t.priority === priority).length;
    const percentage = stats.value.total > 0 
      ? Math.round((count / stats.value.total) * 100) 
      : 0;
    
    return {
      name: priority,
      count,
      percentage
    };
  });
});

const recentCompletions = computed(() => {
  return mockTasks.value
    .filter(t => t.status === "done")
    .slice(0, 5);
});

const atRiskTasks = computed(() => {
  return mockTasks.value
    .filter(t => t.status === "blocked" || t.priority === "urgent")
    .slice(0, 3);
});

const overdueCount = computed(() => atRiskTasks.value.length);

// Table data for status breakdown
const statusTableFields = [
  { label: "Status", key: "status" },
  { label: "Count", key: "count" },
  { label: "Percentage", key: "percentage" }
];

const statusTableData = computed(() => [
  {
    status: "To Do",
    count: stats.value.todo,
    percentage: `${Math.round((stats.value.todo / stats.value.total) * 100)}%`
  },
  {
    status: "In Progress",
    count: stats.value.inProgress,
    percentage: `${Math.round((stats.value.inProgress / stats.value.total) * 100)}%`
  },
  {
    status: "Done",
    count: stats.value.completed,
    percentage: `${Math.round((stats.value.completed / stats.value.total) * 100)}%`
  },
  {
    status: "Blocked",
    count: stats.value.blocked,
    percentage: `${Math.round((stats.value.blocked / stats.value.total) * 100)}%`
  }
]);

// Table data for team performance
const teamTableFields = [
  { label: "Team Member", key: "member" },
  { label: "Assigned", key: "assigned" },
  { label: "Completed", key: "completed" },
  { label: "In Progress", key: "inProgress" }
];

const teamTableData = computed(() => {
  const members = ["John Doe", "Sarah Johnson", "David Chen", "Emily Brown", "Alex Turner"];
  
  return members.map(member => {
    const memberTasks = mockTasks.value.filter(t => t.assignedTo === member);
    return {
      member,
      assigned: memberTasks.length,
      completed: memberTasks.filter(t => t.status === "done").length,
      inProgress: memberTasks.filter(t => t.status === "in-progress").length
    };
  });
});

// Methods
const getPriorityVariant = (priority) => {
  const variants = {
    "low": "default",
    "medium": "info",
    "high": "warning",
    "urgent": "danger"
  };
  return variants[priority] || "default";
};
</script>

