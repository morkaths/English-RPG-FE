
import { uniqueId } from "lodash";
import paths from "src/config/path.config";
import type { MenuItem } from 'src/types/layout/sidebar';

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Home",
        icon: "solar:home-2-linear",
        id: uniqueId(),
        url: paths.home,
      },
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: paths.dashboard,
      },
    ],
  },
  {
    heading: "LEARNING",
    children: [
      {
        name: "Courses",
        icon: "solar:book-outline",
        id: uniqueId(),
        url: paths.courses,
      },
    ],
  },
  {
    heading: "UTILITIES",
    children: [
      {
        name: "Typography",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/ui/typography",
      },
      {
        name: "Table",
        icon: "solar:bedside-table-3-linear",
        id: uniqueId(),
        url: "/ui/table",
      },
      {
        name: "Form",
        icon: "solar:password-minimalistic-outline",
        id: uniqueId(),
        url: "/ui/form",
      },
      {
        name: "Shadow",
        icon: "solar:airbuds-case-charge-outline",
        id: uniqueId(),
        url: "/ui/shadow",
      },
    ],
  },
  {
    heading: "USER",
    children: [
      {
        name: "Profile",
        icon: "solar:user-circle-outline",
        id: uniqueId(),
        url: paths.profile,
      },
      {
        name: "Settings",
        icon: "solar:settings-2-linear",
        id: uniqueId(),
        url: paths.settings,
      },
    ],
  },
  {
    heading: "AUTH",
    children: [
      {
        name: "Login",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: paths.login,
      },
      {
        name: "Register",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: paths.register,
      },
    ],
  },
  {
    heading: "EXTRA",
    children: [
      {
        name: "Sample Page",
        icon: "solar:notes-minimalistic-outline",
        id: uniqueId(),
        url: paths.sample,
      },
    ],
  },
];

export default SidebarContent;
