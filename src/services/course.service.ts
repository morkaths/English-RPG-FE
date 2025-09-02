import * as ApiRequest from './index';
import type { Course } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { courses } from 'src/constants';

const SERVICE: ApiRequest.ApiService = 'catalog';

export const CourseService = {
  /**
   * Get all courses
   * @returns Promise<Course[]>
   */
  getAll: async (): Promise<Course[]> => {
    const response = await ApiRequest.apiGet<Course[]>(SERVICE, API_CONFIG.endpoints.course.getAll, undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  /**
   * Get course by ID
   * @param id - id of the course
   * @returns Promise<Course | null>
   */
  getById: async (id: string): Promise<Course | null> => {
    const response = await ApiRequest.apiGet<Course>(SERVICE, API_CONFIG.endpoints.course.getById(id), undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch course");
  },
  /**
   * Search courses
   * @param params - search parameters
   * @returns Promise<Course[]>
   */
  search: async (params: any): Promise<Course[]> => {
    const response = await ApiRequest.apiGet<Course[]>(SERVICE, API_CONFIG.endpoints.course.search, params, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  /**
   * Create a new course
   * @param data - course data
   * @returns Promise<Course | null>
   */
  create: async (data: Partial<Course>): Promise<Course | null> => {
    const response = await ApiRequest.apiPost<Course>(SERVICE, API_CONFIG.endpoints.course.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create course");
  },
  /**
   * Update course information
   * @param id - id of the course
   * @param data - course data
   * @returns Promise<Course | null>
   */
  update: async (id: string, data: Partial<Course>): Promise<Course | null> => {
    const response = await ApiRequest.apiPut<Course>(SERVICE, API_CONFIG.endpoints.course.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update course");
  },
  /**
   * Delete a course
   * @param id - id of the course
   * @returns Promise<boolean>
   */
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete(SERVICE, API_CONFIG.endpoints.course.delete(id));
    return response.success;
  },

}

export const CourseServiceFake = {
  getAll: async (): Promise<Course[]> => {
    return new Promise(resolve => setTimeout(() => resolve(courses), 200));
  },
  getById: async (id: string): Promise<Course | null> => {
    const course = courses.find(c => c._id === id) || null;
    return new Promise(resolve => setTimeout(() => resolve(course), 200));
  },
  create: async (data: Partial<Course>): Promise<Course | null> => {
    const newCourse = { _id: Date.now().toString(), ...data } as Course;
    courses.push(newCourse);
    return new Promise(resolve => setTimeout(() => resolve(newCourse), 200));
  },
  update: async (id: string, data: Partial<Course>): Promise<Course | null> => {
    const index = courses.findIndex(c => c._id === id);
    if (index === -1) return null;
    const updatedCourse = { ...courses[index], ...data };
    courses[index] = updatedCourse;
    return new Promise(resolve => setTimeout(() => resolve(updatedCourse), 200));
  },
  delete: async (id: string): Promise<boolean> => {
    const index = courses.findIndex(c => c._id === id);
    if (index === -1) return false;
    courses.splice(index, 1);
    return new Promise(resolve => setTimeout(() => resolve(true), 200));
  },
  search: async (params: any): Promise<Course[]> => {
    let results = courses;
    if (params?.query) {
      const q = params.query.toLowerCase();
      results = results.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    if (params?.level && Array.isArray(params.level) && params.level.length > 0) {
      results = results.filter(c =>
        typeof c.level === "string" && params.level.includes(c.level)
      );
    }
    if (params?.tags && Array.isArray(params.tags) && params.tags.length > 0) {
      results = results.filter(c =>
        Array.isArray(c.tags) && c.tags.some(tag => params.tags.includes(tag))
      );
    }
    return new Promise(resolve => setTimeout(() => resolve(results), 200));
  }
}
