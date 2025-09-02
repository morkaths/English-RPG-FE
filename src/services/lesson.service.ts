import * as ApiRequest from './index';
import type { Lesson } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { lessons } from 'src/constants';

const SERVICE: ApiRequest.ApiService = 'catalog';

export const LessonService = {
  getAll: async (): Promise<Lesson[]> => {
    const response = await ApiRequest.apiGet<Lesson[]>(SERVICE, API_CONFIG.endpoints.lesson.getAll, undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  getById: async (id: string): Promise<Lesson | null> => {
    const response = await ApiRequest.apiGet<Lesson>(SERVICE, API_CONFIG.endpoints.lesson.getById(id), undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch lesson");
  },
  search: async (params: any): Promise<Lesson[]> => {
    const response = await ApiRequest.apiGet<Lesson[]>(SERVICE, API_CONFIG.endpoints.lesson.search, params, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  create: async (data: Partial<Lesson>): Promise<Lesson | null> => {
    const response = await ApiRequest.apiPost<Lesson>(SERVICE, API_CONFIG.endpoints.lesson.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create lesson");
  },
  update: async (id: string, data: Partial<Lesson>): Promise<Lesson | null> => {
    const response = await ApiRequest.apiPut<Lesson>(SERVICE, API_CONFIG.endpoints.lesson.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update lesson");
  },
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete(SERVICE, API_CONFIG.endpoints.lesson.delete(id));
    return response.success;
  }
};

export const LessonServiceFake = {
  getAll: async (courseId: string): Promise<Lesson[]> => {
    return new Promise(resolve => setTimeout(() => {
      resolve(lessons.filter(l => l.courseId === courseId))
    }, 200));
  },
  getById: async (id: string): Promise<Lesson | null> => {
    return new Promise(resolve => setTimeout(() => {
      const lesson = lessons.find(l => l._id === id);
      resolve(lesson || null);
    }, 200));
  },
  create: async (data: Partial<Lesson>): Promise<Lesson | null> => {
    return new Promise(resolve => setTimeout(() => {
      const newLesson = { _id: String(Date.now()), ...data } as Lesson;
      lessons.push(newLesson);
      resolve(newLesson);
    }, 200));
  },
  update: async (id: string, data: Partial<Lesson>): Promise<Lesson | null> => {
    return new Promise(resolve => setTimeout(() => {
      const index = lessons.findIndex(l => l._id === id);
      if (index !== -1) {
        lessons[index] = { ...lessons[index], ...data };
        resolve(lessons[index]);
      } else {
        resolve(null);
      }
    }, 200));
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise(resolve => setTimeout(() => {
      const index = lessons.findIndex(l => l._id === id);
      if (index !== -1) {
        lessons.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 200));
  },
  search: async (params: any): Promise<Lesson[]> => {
    let results = lessons;
    if (params?.query) {
      const q = params.query.toLowerCase();
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.content?.toLowerCase().includes(q)
      );
    }
    return new Promise(resolve => setTimeout(() => resolve(results), 200));
  }

}