<script setup>
import { useLayoutStore } from "~/stores/layout";
import { useWindowSize } from "vue-window-size";
import RSChildItem from "~/components/layouts/sidemenu/ItemChild.vue";
import { useUserStore } from "~/stores/user";
import draggable from "vuedraggable";

const layoutStore = useLayoutStore();
const mobileWidth = layoutStore.mobileWidth;
const { width } = useWindowSize();

const user = useUserStore();
const route = useRoute();
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const username = user.username;
const roles = user.roles;

// Make menuItem reactive so draggable can reorder it
const menuItem = ref([...props.items]);

// Watch for changes in props.items to update menuItem
watch(() => props.items, (newItems) => {
  menuItem.value = [...newItems];
}, { deep: true });

// Save menu order to localStorage
function saveMenuOrder() {
  try {
    localStorage.setItem('menuOrder', JSON.stringify(menuItem.value));
  } catch (e) {
    console.error('Failed to save menu order:', e);
  }
}

// Load menu order from localStorage
function loadMenuOrder() {
  try {
    const saved = localStorage.getItem('menuOrder');
    if (saved) {
      menuItem.value = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load menu order:', e);
  }
}

// Section and sub-menu state management
const openSubMenus = ref(new Map());
const openSections = ref(new Map());

// Initialize sections as open by default and load saved order
onMounted(() => {
  loadMenuOrder();

  // Use nextTick to ensure menuItem is updated after loadMenuOrder
  nextTick(() => {
    if (Array.isArray(menuItem.value)) {
      menuItem.value.forEach((item, index) => {
        if (item.header) {
          openSections.value.set(index, true);
        }
      });
    }
  });
});

// Toggle section visibility
function toggleSection(sectionIndex) {
  if (openSections.value.has(sectionIndex)) {
    openSections.value.delete(sectionIndex);
  } else {
    openSections.value.set(sectionIndex, true);
  }
}

// Check if section is open
function isSectionOpen(sectionIndex) {
  return openSections.value.has(sectionIndex);
}

// Toggle sub-menu visibility
function toggleSubMenu(sectionIndex, itemIndex) {
  const key = `${sectionIndex}-${itemIndex}`;
  if (openSubMenus.value.has(key)) {
    openSubMenus.value.delete(key);
  } else {
    openSubMenus.value.set(key, true);
  }
}

// Check if sub-menu is open
function isSubMenuOpen(sectionIndex, itemIndex) {
  const key = `${sectionIndex}-${itemIndex}`;
  return openSubMenus.value.has(key);
}

// validate userExist on meta.auth.user
function userExist(item) {
  if (item.meta?.auth?.user) {
    if (item.meta?.auth?.user.some((e) => e === username)) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

// validate roleExist on meta.auth.role
function roleExist(item) {
  if (item.meta?.auth?.role) {
    if (item.meta?.auth?.role.some((e) => roles?.includes(e))) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

// Toggle show and hide menu content
function openMenu(event) {
  const target = event.currentTarget;
  try {
    target.querySelector("a").classList.toggle("nav-open");
    target.querySelector("ul").classList.toggle("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
}

// Active menu
function activeMenu(routePath) {
  return route.path == routePath
    ? `bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-semibold`
    : `text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer`;
}

function toggleMenu() {
  document.querySelector(".v-layout").classList.toggle("menu-hide");
  document.getElementsByClassName("menu-overlay")[0].classList.toggle("hide");
}

function navigationPage(path, external) {
  if (width.value <= mobileWidth) toggleMenu();
  navigateTo(path, {
    external: external,
  });
}
</script>

<template>
  <draggable
    v-model="menuItem"
    item-key="header"
    handle=".drag-handle"
    @end="saveMenuOrder"
    ghost-class="ghost-section"
    animation="200"
  >
    <template #item="{ element: item, index }">
      <div
        v-if="
          !item.meta || !item.meta?.auth || (userExist(item) && roleExist(item))
        "
        class="navigation-wrapper"
      >
        <!-- Section Header (Collapsible & Draggable) -->
        <div
          v-if="item.header"
          class="px-3 pt-3 pb-1.5"
        >
          <div class="flex items-center gap-1">
            <div class="drag-handle cursor-move p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
              <Icon name="mdi:drag-vertical" class="w-4 h-4 text-gray-400" />
            </div>
            <button
              @click="toggleSection(index)"
              class="flex-1 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 transition-colors cursor-pointer"
            >
              <div class="flex-1 text-left">
                <span class="block font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider leading-tight">
                  {{ item.header }}
                </span>
                <p v-if="item.description" class="text-xs text-gray-500 dark:text-gray-500 mt-0.5 leading-tight">
                  {{ item.description }}
                </p>
              </div>
              <Icon
                :name="isSectionOpen(index) ? 'ic:outline-keyboard-arrow-down' : 'ic:outline-keyboard-arrow-right'"
                class="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2"
              />
            </button>
          </div>
        </div>

      <!-- Menu Items (Show only if section is open) -->
      <div v-if="isSectionOpen(index)" class="menu-items space-y-0.5 px-2">
        <div
          v-for="(item2, index2) in item.child"
          :key="index2"
          class="menu-item"
        >
          <div
            v-if="
              !item2.meta ||
              !item2.meta?.auth ||
              (userExist(item2) && roleExist(item2))
            "
            class="menu-item-wrapper"
          >
            <!-- Single Menu Item -->
            <NuxtLink
              v-if="
                item2.child === undefined ||
                (item2.child && item2.child.length === 0)
              "
              :to="item2.path"
              :external="item2.external"
              class="flex items-center px-3 py-1.5 rounded-md transition-colors w-full"
              :class="activeMenu(item2.path)"
              @click="() => { if (width <= mobileWidth) toggleMenu() }"
            >
              <Icon
                :name="item2.icon || 'ic:outline-folder'"
                class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2.5 flex-shrink-0"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300 truncate min-w-0 flex-1">{{ item2.title }}</span>
            </NuxtLink>

            <!-- Parent Menu Item with Children -->
            <div v-else class="parent-menu-item w-full">
              <button
                @click="toggleSubMenu(index, index2)"
                class="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div class="flex items-center min-w-0 flex-1">
                  <Icon 
                    :name="item2.icon || 'ic:outline-folder'" 
                    class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2.5 flex-shrink-0" 
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ item2.title }}</span>
                </div>
                <Icon
                  :name="isSubMenuOpen(index, index2) ? 'ic:outline-keyboard-arrow-down' : 'ic:outline-keyboard-arrow-right'"
                  class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-1"
                />
              </button>
              
              <!-- Sub Menu Items -->
              <div v-if="isSubMenuOpen(index, index2)" class="sub-menu mt-0.5 ml-5 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                <RSChildItem
                  :items="item2.child"
                  @openMenu="openMenu"
                  @activeMenu="activeMenu"
                ></RSChildItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
  </draggable>
</template>

<style scoped>
.ghost-section {
  opacity: 0.5;
  background: rgb(var(--bg-1));
}

.drag-handle {
  touch-action: none;
}
</style>
