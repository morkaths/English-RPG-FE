import * as RequestUtils from '../utils/request';
import type { Course } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { courses } from 'src/constants';

export const CourseService = {
  /**
   * Lấy tất cả khóa học
   * @returns Promise<Course[]>
   */
  getAll: async (): Promise<Course[]> => {
    const response = await RequestUtils.privateGet<Course[]>(API_CONFIG.endpoints.course.getAll);
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  /**
   * Lấy khóa học theo ID
   * @param id - id của khóa học
   * @returns Promise<Course | null>
   */
  getById: async (id: string): Promise<Course | null> => {
    const response = await RequestUtils.privateGet<Course>(API_CONFIG.endpoints.course.getById(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch course");
  },
  /**
   * Tạo khóa học mới
   * @param data - thông tin khóa học
   * @returns Promise<Course | null>
   */
  create: async (data: Partial<Course>): Promise<Course | null> => {
    const response = await RequestUtils.privatePost<Course>(API_CONFIG.endpoints.course.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create course");
  },
  /**
   * Cập nhật thông tin khóa học
   * @param id - id của khóa học
   * @param data - thông tin khóa học
   * @returns Promise<Course | null>
   */
  update: async (id: string, data: Partial<Course>): Promise<Course | null> => {
    const response = await RequestUtils.privatePut<Course>(API_CONFIG.endpoints.course.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update course");
  },
  /**
   * Xoá khóa học
   * @param id - id của khóa học
   * @returns Promise<boolean>
   */
  delete: async (id: string): Promise<boolean> => {
    const response = await RequestUtils.privateDelete(API_CONFIG.endpoints.course.delete(id));
    return response.success;
  },
  /**
   * Tìm kiếm khóa học
   * @param params - tham số tìm kiếm
   * @returns Promise<Course[]>
   */
  search: async (params: any): Promise<Course[]> => {
    const response = await RequestUtils.privateGet<Course[]>(API_CONFIG.endpoints.course.search, { params });
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  }

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
