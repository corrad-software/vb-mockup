<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "default",
});

const showModal = ref(false);

// Table data
const tableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager", status: "Active" },
];
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Component Showcase</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Preview of all UI components before CSS compact design system migration
      </p>
    </div>

    <!-- Buttons Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Buttons</h2>
      </template>
      <template #body>
        <div class="space-y-6">
          <!-- Filled Buttons -->
          <div>
            <h3 class="text-lg font-medium mb-3">Filled Buttons</h3>
            <div class="flex flex-wrap gap-3">
              <RsButton variant="primary" size="sm">Primary SM</RsButton>
              <RsButton variant="primary" size="md">Primary MD</RsButton>
              <RsButton variant="primary" size="lg">Primary LG</RsButton>
            </div>
            <div class="flex flex-wrap gap-3 mt-3">
              <RsButton variant="secondary" size="md">Secondary</RsButton>
              <RsButton variant="success" size="md">Success</RsButton>
              <RsButton variant="info" size="md">Info</RsButton>
              <RsButton variant="warning" size="md">Warning</RsButton>
              <RsButton variant="danger" size="md">Danger</RsButton>
            </div>
          </div>

          <!-- Outline Buttons -->
          <div>
            <h3 class="text-lg font-medium mb-3">Outline Buttons</h3>
            <div class="flex flex-wrap gap-3">
              <RsButton variant="primary-outline" size="md">Primary Outline</RsButton>
              <RsButton variant="secondary-outline" size="md">Secondary Outline</RsButton>
              <RsButton variant="success-outline" size="md">Success Outline</RsButton>
              <RsButton variant="info-outline" size="md">Info Outline</RsButton>
              <RsButton variant="warning-outline" size="md">Warning Outline</RsButton>
              <RsButton variant="danger-outline" size="md">Danger Outline</RsButton>
            </div>
          </div>

          <!-- Text Buttons -->
          <div>
            <h3 class="text-lg font-medium mb-3">Text Buttons</h3>
            <div class="flex flex-wrap gap-3">
              <RsButton variant="primary-text" size="md">Primary Text</RsButton>
              <RsButton variant="secondary-text" size="md">Secondary Text</RsButton>
              <RsButton variant="success-text" size="md">Success Text</RsButton>
              <RsButton variant="info-text" size="md">Info Text</RsButton>
              <RsButton variant="warning-text" size="md">Warning Text</RsButton>
              <RsButton variant="danger-text" size="md">Danger Text</RsButton>
            </div>
          </div>

          <!-- Icon Buttons -->
          <div>
            <h3 class="text-lg font-medium mb-3">Icon Buttons</h3>
            <div class="flex flex-wrap gap-3">
              <RsButton variant="primary" size="md">
                <Icon name="mdi:plus" class="mr-2" />
                Add Item
              </RsButton>
              <RsButton variant="danger" size="md">
                <Icon name="mdi:delete" class="mr-2" />
                Delete
              </RsButton>
              <RsButton variant="success" size="md">
                <Icon name="mdi:check" class="mr-2" />
                Confirm
              </RsButton>
            </div>
          </div>
        </div>
      </template>
    </RsCard>

    <!-- Cards Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Cards</h2>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RsCard>
            <template #header>Simple Card</template>
            <template #body>
              <p>This is a simple card with header and body content.</p>
            </template>
          </RsCard>

          <RsCard>
            <template #header>Card with Footer</template>
            <template #body>
              <p>This card includes a footer section with actions.</p>
            </template>
            <template #footer>
              <div class="flex justify-end gap-2">
                <RsButton variant="secondary-outline" size="sm">Cancel</RsButton>
                <RsButton variant="primary" size="sm">Save</RsButton>
              </div>
            </template>
          </RsCard>

          <RsCard>
            <template #header>
              <div class="flex items-center gap-2">
                <Icon name="mdi:information" />
                <span>Icon Card</span>
              </div>
            </template>
            <template #body>
              <p>Card with an icon in the header.</p>
            </template>
          </RsCard>
        </div>
      </template>
    </RsCard>

    <!-- Alerts Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Alerts</h2>
      </template>
      <template #body>
        <div class="space-y-3">
          <RsAlert variant="primary" icon="mdi:information" :show="true">
            This is a primary alert with an informational message.
          </RsAlert>
          
          <RsAlert variant="success" icon="mdi:check-circle" :show="true">
            Success! Your operation was completed successfully.
          </RsAlert>
          
          <RsAlert variant="info" icon="mdi:lightbulb" :show="true">
            Here's some helpful information you should know about.
          </RsAlert>
          
          <RsAlert variant="warning" icon="mdi:alert" :show="true">
            Warning: Please review this important notice.
          </RsAlert>
          
          <RsAlert variant="danger" icon="mdi:alert-circle" :show="true">
            Error! Something went wrong. Please try again.
          </RsAlert>
          
          <RsAlert variant="secondary" :show="true">
            Secondary alert without an icon.
          </RsAlert>
        </div>
      </template>
    </RsCard>

    <!-- Badges Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Badges</h2>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Basic Badges</h3>
            <div class="flex flex-wrap gap-2">
              <RsBadge variant="primary">Primary</RsBadge>
              <RsBadge variant="secondary">Secondary</RsBadge>
              <RsBadge variant="success">Success</RsBadge>
              <RsBadge variant="info">Info</RsBadge>
              <RsBadge variant="warning">Warning</RsBadge>
              <RsBadge variant="danger">Danger</RsBadge>
              <RsBadge variant="disabled">Disabled</RsBadge>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Badges with Icons</h3>
            <div class="flex flex-wrap gap-2">
              <RsBadge variant="primary" icon="mdi:account">User</RsBadge>
              <RsBadge variant="success" icon="mdi:check">Active</RsBadge>
              <RsBadge variant="danger" icon="mdi:close">Inactive</RsBadge>
              <RsBadge variant="warning" icon="mdi:alert">Pending</RsBadge>
              <RsBadge variant="info" icon="mdi:information">12</RsBadge>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Usage Example</h3>
            <div class="flex items-center gap-2">
              <span class="text-sm">Status:</span>
              <RsBadge variant="success" icon="mdi:circle" icon-size="12">Online</RsBadge>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-sm">Notifications:</span>
              <RsBadge variant="danger">99+</RsBadge>
            </div>
          </div>
        </div>
      </template>
    </RsCard>

    <!-- Tabs Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Tabs</h2>
      </template>
      <template #body>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Default Style Tabs</h3>
          <RsTab type="default" variant="primary">
            <RsTabItem title="Home" :active="true">
              <p class="text-sm">This is the home tab content. It contains information about the homepage and various features available to users.</p>
            </RsTabItem>
            <RsTabItem title="Profile">
              <p class="text-sm">This is the profile tab content. It shows user profile details, settings, and preferences.</p>
            </RsTabItem>
            <RsTabItem title="Settings">
              <p class="text-sm">This is the settings tab content. Configure your application preferences and options here.</p>
            </RsTabItem>
          </RsTab>
        </div>
        
        <div class="mt-6">
          <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Card Style Tabs</h3>
          <RsTab type="card" variant="success">
            <RsTabItem title="Overview" :active="true">
              <p class="text-sm">Overview content with card-style tabs. This provides a clean and modern look.</p>
            </RsTabItem>
            <RsTabItem title="Details">
              <p class="text-sm">Detailed information displayed in card-style tabs with colored headers.</p>
            </RsTabItem>
            <RsTabItem title="History">
              <p class="text-sm">Historical data and activity logs are shown here.</p>
            </RsTabItem>
          </RsTab>
        </div>
        
        <div class="mt-6">
          <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Border Style Tabs</h3>
          <RsTab type="border" variant="info">
            <RsTabItem title="Dashboard" :active="true">
              <p class="text-sm">Dashboard view with border-style tabs showing key metrics and data.</p>
            </RsTabItem>
            <RsTabItem title="Reports">
              <p class="text-sm">Various reports and analytics are displayed in this section.</p>
            </RsTabItem>
            <RsTabItem title="Analytics">
              <p class="text-sm">Deep dive into analytics and performance metrics.</p>
            </RsTabItem>
          </RsTab>
        </div>
      </template>
    </RsCard>

    <!-- Collapse/Accordion Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Collapse / Accordion</h2>
      </template>
      <template #body>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Border Style (Accordion)</h3>
          <RsCollapse :accordion="true" type="border">
            <RsCollapseItem title="What is Nuxt.js?">
              <p class="text-sm">
                Nuxt.js is a free and open-source framework with an intuitive and extendable way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js.
              </p>
            </RsCollapseItem>
            
            <RsCollapseItem title="What is Vue.js?">
              <p class="text-sm">
                Vue.js is a progressive JavaScript framework for building user interfaces. It's designed from the ground up to be incrementally adoptable, and can easily scale between a library and a framework.
              </p>
            </RsCollapseItem>
            
            <RsCollapseItem title="What is TailwindCSS?">
              <p class="text-sm">
                Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without ever leaving your HTML. It's highly customizable and promotes rapid development.
              </p>
            </RsCollapseItem>
            
            <RsCollapseItem title="What is the Compact Design System?">
              <p class="text-sm">
                The Compact Design System is a modern, space-efficient design approach inspired by Shadcn UI/UX. It focuses on reducing unnecessary whitespace while maintaining readability, consistency, and accessibility.
              </p>
            </RsCollapseItem>
          </RsCollapse>
        </div>
        
        <div class="mt-6">
          <h3 class="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Card Style (Multiple Open)</h3>
          <RsCollapse :accordion="false" type="card">
            <RsCollapseItem title="Design Principles">
              <p class="text-sm">
                Our design system follows core principles: consistency, accessibility, responsiveness, and modern aesthetics. Each component is crafted to work seamlessly together.
              </p>
            </RsCollapseItem>
            
            <RsCollapseItem title="Component Library">
              <p class="text-sm">
                We provide a comprehensive library of reusable components including buttons, cards, modals, tables, and more. Each component follows the compact design philosophy.
              </p>
            </RsCollapseItem>
          </RsCollapse>
        </div>
      </template>
    </RsCard>

    <!-- Dropdown Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Dropdowns</h2>
      </template>
      <template #body>
        <div class="flex flex-wrap gap-4">
          <RsDropdown title="Dropdown Menu" position="bottom" size="md" variant="primary">
            <RsDropdownItem>
              <Icon name="mdi:account" class="mr-2" />
              Profile
            </RsDropdownItem>
            <RsDropdownItem>
              <Icon name="mdi:cog" class="mr-2" />
              Settings
            </RsDropdownItem>
            <RsDropdownItem :divider="true" />
            <RsDropdownItem>
              <Icon name="mdi:help-circle" class="mr-2" />
              Help
            </RsDropdownItem>
            <RsDropdownItem>
              <Icon name="mdi:logout" class="mr-2" />
              Logout
            </RsDropdownItem>
          </RsDropdown>

          <RsDropdown title="Actions" position="bottom" size="md" variant="secondary-outline" textAlign="right">
            <RsDropdownItem>
              <Icon name="mdi:pencil" class="mr-2" />
              Edit
            </RsDropdownItem>
            <RsDropdownItem>
              <Icon name="mdi:content-copy" class="mr-2" />
              Duplicate
            </RsDropdownItem>
            <RsDropdownItem>
              <Icon name="mdi:share-variant" class="mr-2" />
              Share
            </RsDropdownItem>
            <RsDropdownItem :divider="true" />
            <RsDropdownItem>
              <Icon name="mdi:delete" class="mr-2 text-red-600" />
              <span class="text-red-600">Delete</span>
            </RsDropdownItem>
          </RsDropdown>
          
          <RsDropdown title="More Options" position="bottom" size="sm" variant="success-outline">
            <RsDropdownItem>
              <Icon name="mdi:eye" class="mr-2" />
              View Details
            </RsDropdownItem>
            <RsDropdownItem>
              <Icon name="mdi:download" class="mr-2" />
              Download
            </RsDropdownItem>
            <RsDropdownItem>
              <Icon name="mdi:printer" class="mr-2" />
              Print
            </RsDropdownItem>
          </RsDropdown>
        </div>
      </template>
    </RsCard>

    <!-- Modal Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Modals</h2>
      </template>
      <template #body>
        <div class="flex flex-wrap gap-3">
          <RsButton variant="primary" size="md" @click="showModal = true">
            <Icon name="mdi:information" class="mr-2" />
            Open Modal
          </RsButton>
          
          <RsModal v-model="showModal" title="Modal Title" position="center" size="md">
            <template #body>
              <p class="mb-4">
                This is a modal dialog. It can contain any content you want, including forms, images, or other components.
              </p>
              <p class="mb-4">
                The modal is positioned in the center of the screen and has a semi-transparent backdrop.
              </p>
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                <p class="text-sm text-blue-800 dark:text-blue-200">
                  <Icon name="mdi:lightbulb" class="inline mr-1" />
                  Modals can be used for confirmations, forms, alerts, and more.
                </p>
              </div>
            </template>
            <template #footer>
              <RsButton variant="secondary-outline" size="md" @click="showModal = false">
                Cancel
              </RsButton>
              <RsButton variant="primary" size="md" @click="showModal = false">
                Confirm
              </RsButton>
            </template>
          </RsModal>
        </div>
        
        <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Click the button above to see the modal in action. The modal supports custom headers, body content, and footer actions.
          </p>
        </div>
      </template>
    </RsCard>

    <!-- Progress Bars Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Progress Bars</h2>
      </template>
      <template #body>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">Small Size</h3>
            <RsProgressBar :value="25" :max="100" size="sm" variant="primary" label="Primary Progress - 25%" />
            <RsProgressBar :value="50" :max="100" size="sm" variant="success" label="Success Progress - 50%" class="mt-3" />
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">Medium Size</h3>
            <RsProgressBar :value="60" :max="100" size="md" variant="info" label="Info Progress - 60%" />
            <RsProgressBar :value="75" :max="100" size="md" variant="warning" label="Warning Progress - 75%" class="mt-3" />
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">Large Size</h3>
            <RsProgressBar :value="90" :max="100" size="lg" variant="danger" label="Danger Progress - 90%" />
            <RsProgressBar :value="100" :max="100" size="lg" variant="success" label="Complete - 100%" class="mt-3" />
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">All Variants (with values shown)</h3>
            <div class="space-y-2">
              <RsProgressBar :value="45" :max="100" size="md" variant="primary" :showValue="true" />
              <RsProgressBar :value="55" :max="100" size="md" variant="secondary" :showValue="true" />
              <RsProgressBar :value="65" :max="100" size="md" variant="success" :showValue="true" />
              <RsProgressBar :value="75" :max="100" size="md" variant="info" :showValue="true" />
              <RsProgressBar :value="85" :max="100" size="md" variant="warning" :showValue="true" />
              <RsProgressBar :value="95" :max="100" size="md" variant="danger" :showValue="true" />
            </div>
          </div>
        </div>
      </template>
    </RsCard>

    <!-- Table Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Table</h2>
      </template>
      <template #body>
        <div class="table-wrapper">
          <div class="table-content">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left p-3 font-semibold text-sm">ID</th>
                  <th class="text-left p-3 font-semibold text-sm">Name</th>
                  <th class="text-left p-3 font-semibold text-sm">Email</th>
                  <th class="text-left p-3 font-semibold text-sm">Role</th>
                  <th class="text-left p-3 font-semibold text-sm">Status</th>
                  <th class="text-left p-3 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableData" :key="row.id" class="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td class="p-3 text-sm">{{ row.id }}</td>
                  <td class="p-3 text-sm">{{ row.name }}</td>
                  <td class="p-3 text-sm">{{ row.email }}</td>
                  <td class="p-3 text-sm">{{ row.role }}</td>
                  <td class="p-3 text-sm">
                    <RsBadge :variant="row.status === 'Active' ? 'success' : 'danger'">
                      {{ row.status }}
                    </RsBadge>
                  </td>
                  <td class="p-3 text-sm">
                    <div class="flex gap-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <Icon name="mdi:pencil" size="18" />
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <Icon name="mdi:delete" size="18" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </RsCard>

    <!-- Fieldset Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">Fieldset</h2>
      </template>
      <template #body>
        <div class="space-y-4">
          <RsFieldset label="Personal Information" :border="true">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="Doe" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" class="w-full px-3 py-2 border rounded-md" placeholder="john.doe@example.com" />
              </div>
            </div>
          </RsFieldset>
          
          <RsFieldset label="Address Information" :border="true">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Street Address</label>
                <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="123 Main St" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">City</label>
                  <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="New York" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">ZIP Code</label>
                  <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="10001" />
                </div>
              </div>
            </div>
          </RsFieldset>
        </div>
      </template>
    </RsCard>

    <!-- FormKit Components Section -->
    <RsCard>
      <template #header>
        <h2 class="text-xl font-semibold">FormKit Components</h2>
      </template>
      <template #body>
        <div class="space-y-8">
          <!-- Text Inputs -->
          <div>
            <h3 class="text-lg font-medium mb-4">Text Inputs</h3>
            <FormKit
              type="text"
              label="Text Input"
              placeholder="Enter text here"
              help="This is a help text"
            />
            <FormKit
              type="email"
              label="Email Input"
              placeholder="your@email.com"
              validation="required|email"
            />
            <FormKit
              type="password"
              label="Password Input"
              placeholder="Enter password"
              validation="required|length:6"
            />
            <FormKit
              type="url"
              label="URL Input"
              placeholder="https://example.com"
            />
            <FormKit
              type="number"
              label="Number Input"
              placeholder="0"
              min="0"
              max="100"
            />
          </div>

          <!-- Textarea -->
          <div>
            <h3 class="text-lg font-medium mb-4">Textarea</h3>
            <FormKit
              type="textarea"
              label="Message"
              placeholder="Enter your message here..."
              help="Maximum 500 characters"
              rows="4"
            />
          </div>

          <!-- Select -->
          <div>
            <h3 class="text-lg font-medium mb-4">Select Dropdown</h3>
            <FormKit
              type="select"
              label="Country"
              placeholder="Select a country"
              :options="['Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Philippines']"
            />
          </div>

          <!-- Checkbox & Radio -->
          <div>
            <h3 class="text-lg font-medium mb-4">Checkbox & Radio</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormKit
                  type="checkbox"
                  label="Checkbox Options"
                  :options="['Option 1', 'Option 2', 'Option 3']"
                />
              </div>
              <div>
                <FormKit
                  type="radio"
                  label="Radio Options"
                  :options="['Choice A', 'Choice B', 'Choice C']"
                />
              </div>
            </div>
          </div>

          <!-- Single Checkbox -->
          <div>
            <h3 class="text-lg font-medium mb-4">Single Checkbox</h3>
            <FormKit
              type="checkbox"
              label="I agree to the terms and conditions"
            />
            <FormKit
              type="checkbox"
              label="Subscribe to newsletter"
              help="Get weekly updates"
            />
          </div>

          <!-- Date & Time -->
          <div>
            <h3 class="text-lg font-medium mb-4">Date & Time</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormKit
                type="date"
                label="Date"
              />
              <FormKit
                type="time"
                label="Time"
              />
            </div>
            <FormKit
              type="datetime-local"
              label="Date & Time"
            />
          </div>

          <!-- Range Slider -->
          <div>
            <h3 class="text-lg font-medium mb-4">Range Slider</h3>
            <FormKit
              type="range"
              label="Volume"
              min="0"
              max="100"
              value="50"
            />
          </div>

          <!-- File Upload -->
          <div>
            <h3 class="text-lg font-medium mb-4">File Upload</h3>
            <FormKit
              type="file"
              label="Upload File"
              help="Select a file to upload"
            />
          </div>

          <!-- Color Picker -->
          <div>
            <h3 class="text-lg font-medium mb-4">Color Picker</h3>
            <FormKit
              type="color"
              label="Choose Color"
              value="#3b82f6"
            />
          </div>

          <!-- Form Example -->
          <div>
            <h3 class="text-lg font-medium mb-4">Complete Form Example</h3>
            <div class="p-4 border rounded-lg">
              <FormKit type="form" :actions="false">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormKit
                    type="text"
                    label="First Name"
                    placeholder="John"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    label="Last Name"
                    placeholder="Doe"
                    validation="required"
                  />
                </div>
                
                <FormKit
                  type="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  validation="required|email"
                />
                
                <FormKit
                  type="select"
                  label="Department"
                  :options="['Engineering', 'Sales', 'Marketing', 'HR']"
                  validation="required"
                />
                
                <FormKit
                  type="textarea"
                  label="Comments"
                  placeholder="Any additional information..."
                  rows="3"
                />
                
                <FormKit
                  type="checkbox"
                  label="I agree to the privacy policy"
                  validation="required"
                />
                
                <div class="flex justify-end gap-2 mt-4">
                  <RsButton variant="secondary-outline" size="md">Cancel</RsButton>
                  <RsButton variant="primary" size="md">Submit</RsButton>
                </div>
              </FormKit>
            </div>
          </div>
        </div>
      </template>
    </RsCard>

    <!-- Combined Example Section -->
    <RsCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Combined Components Example</h2>
          <RsBadge variant="info">Example</RsBadge>
        </div>
      </template>
      <template #body>
        <RsAlert variant="info" icon="mdi:information" :show="true">
          This section demonstrates how multiple components work together.
        </RsAlert>
        
        <div class="mt-4 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-medium">Project Status:</span>
              <RsBadge variant="success" icon="mdi:check-circle">In Progress</RsBadge>
            </div>
            <div class="flex gap-2">
              <RsButton variant="secondary-outline" size="sm">
                <Icon name="mdi:download" class="mr-2" />
                Export
              </RsButton>
              <RsButton variant="primary" size="sm">
                <Icon name="mdi:plus" class="mr-2" />
                Add New
              </RsButton>
            </div>
          </div>
          
          <RsProgressBar :value="67" :max="100" size="md" variant="primary" label="Overall Progress - 67%" />
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Tasks Complete</span>
                <RsBadge variant="success">15/20</RsBadge>
              </div>
              <RsProgressBar :value="75" :max="100" size="sm" variant="success" />
            </div>
            
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Time Remaining</span>
                <RsBadge variant="warning">3 days</RsBadge>
              </div>
              <RsProgressBar :value="40" :max="100" size="sm" variant="warning" />
            </div>
            
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Budget Used</span>
                <RsBadge variant="danger">$8.5k</RsBadge>
              </div>
              <RsProgressBar :value="85" :max="100" size="sm" variant="danger" />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Last updated: October 15, 2025</span>
          <RsButton variant="primary-text" size="sm">View Details →</RsButton>
        </div>
      </template>
    </RsCard>
  </div>
</template>

<style scoped>
input {
  background-color: rgb(var(--bg-2));
  border-color: rgb(var(--border-color));
  color: rgb(var(--text-color));
}

input:focus {
  outline: none;
  border-color: rgb(var(--color-primary));
  box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
}
</style>

