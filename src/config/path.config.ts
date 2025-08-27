import type { SearchFilters } from "src/types";

const paths = {
  // Public Layout
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  error404: "/auth/error404",
  error403: "/auth/error403",

  // User Profile
  profile: "/user/profile",
  settings: "/user/settings",

  // Dashboard
  dashboard: "/dashboard",

  // Courses
  courses: "/courses",
  courseDetail: (id: string) => `/courses/${id}`,
  courseSearch: (filters: SearchFilters) => {
    const search = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v) search.append(key, v);
        });
      } else if (value !== undefined && value !== null && value !== "") {
        search.set(key, String(value));
      }
    });
    return `/courses?${search.toString()}`;
  },

  // Sample or Misc
  sample: "/sample-page",
}

export default paths;
