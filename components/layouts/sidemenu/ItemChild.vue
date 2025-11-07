<script setup>
import { useLayoutStore } from "~/stores/layout";
import { useWindowSize } from "vue-window-size";
import RSChildItem from "~/components/layouts/sidemenu/ItemChild.vue";
import { useUserStore } from "~/stores/user";

const layoutStore = useLayoutStore();
const mobileWidth = layoutStore.mobileWidth;
const { width } = useWindowSize();

const user = useUserStore();
const route = useRoute();
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  indent: {
    type: Number,
    default: 0.5,
  },
});
const emit = defineEmits(["openMenu"]);

const indent = ref(props.indent);

const menuItem = props.items ? props.items : [];

// Sub-sub-menu state management
const openSubSubMenus = ref(new Set());

// Toggle sub-sub-menu visibility
function toggleSubSubMenu(itemIndex) {
  if (openSubSubMenus.value.has(itemIndex)) {
    openSubSubMenus.value.delete(itemIndex);
  } else {
    openSubSubMenus.value.add(itemIndex);
  }
}

// Check if sub-sub-menu is open
function isSubSubMenuOpen(itemIndex) {
  return openSubSubMenus.value.has(itemIndex);
}

const username = user.username;
const roles = user.roles;

// validate userExist on meta.auth.user
function userExist(item) {
  if (item.meta?.auth?.user) {
    if (item.meta?.auth?.user.includes(username)) {
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
    if (item.meta?.auth?.role.some((r) => roles.includes(r))) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

// Toggle Open/Close menu
function openMenu(event) {
  emit("openMenu", event);
}

// Active menu
function activeMenu(routePath) {
  return route.path == routePath
    ? `bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-semibold`
    : `text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer`;
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

const indentStyle = computed(() => {
  return { "background-color": `rgba(var(--sidebar-menu), ${indent.value})` };
});
</script>

<template>
  <div class="sub-menu-items space-y-0.5">
    <div
      v-for="(item, index) in menuItem"
      :key="index"
      class="sub-menu-item"
    >
      <div
        v-if="
          !item.meta || !item.meta?.auth || (userExist(item) && roleExist(item))
        "
        class="sub-menu-item-wrapper"
      >
        <!-- Single Sub Menu Item -->
        <NuxtLink
          v-if="
            item.child === undefined || (item.child && item.child.length === 0)
          "
          class="flex items-center px-3 py-1.5 rounded-md transition-colors w-full"
          @click="navigationPage(item.path, item.external)"
          :class="activeMenu(item.path)"
        >
          <Icon 
            :name="item.icon || 'ic:outline-folder'" 
            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2.5 flex-shrink-0" 
          />
          <span class="text-sm text-gray-600 dark:text-gray-400 truncate min-w-0 flex-1">{{ item.title }}</span>
        </NuxtLink>

        <!-- Parent Sub Menu Item with Children -->
        <div v-else class="parent-sub-menu-item w-full">
          <button
            @click="toggleSubSubMenu(index)"
            class="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div class="flex items-center min-w-0 flex-1">
              <Icon 
                :name="item.icon || 'ic:outline-folder'" 
                class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2.5 flex-shrink-0" 
              />
              <span class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ item.title }}</span>
            </div>
            <Icon
              :name="isSubSubMenuOpen(index) ? 'ic:outline-keyboard-arrow-down' : 'ic:outline-keyboard-arrow-right'"
              class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-1"
            />
          </button>
          
          <!-- Sub Sub Menu Items -->
          <div v-if="isSubSubMenuOpen(index)" class="sub-sub-menu mt-0.5 ml-5 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
            <RSChildItem
              :items="item.child"
              :indent="indent + 0.1"
              @openMenu="openMenu"
              @activeMenu="activeMenu"
            ></RSChildItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
