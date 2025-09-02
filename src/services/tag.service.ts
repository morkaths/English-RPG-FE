import * as ApiRequest from './index';
import type { Tag } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { tagOptions } from 'src/constants';

const SERVICE: ApiRequest.ApiService = 'catalog';

export const TagService = {
  getAll: async (): Promise<Tag[]> => {
    const response = await ApiRequest.apiGet<Tag[]>(SERVICE, API_CONFIG.endpoints.tag.getAll, undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  getById: async (id: string): Promise<Tag | null> => {
    const response = await ApiRequest.apiGet<Tag>(SERVICE, API_CONFIG.endpoints.tag.getById(id), undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch tag");
  },
  search: async (params: any): Promise<Tag[]> => {
    const response = await ApiRequest.apiGet<Tag[]>(SERVICE, API_CONFIG.endpoints.tag.search, params, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  create: async (data: Partial<Tag>): Promise<Tag | null> => {
    const response = await ApiRequest.apiPost<Tag>(SERVICE, API_CONFIG.endpoints.tag.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create tag");
  },
  update: async (id: string, data: Partial<Tag>): Promise<Tag | null> => {
    const response = await ApiRequest.apiPut<Tag>(SERVICE, API_CONFIG.endpoints.tag.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update tag");
  },
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete(SERVICE, API_CONFIG.endpoints.tag.delete(id));
    return response.success;
  }
};

export const TagServiceFake = {
  getAll: async (): Promise<Tag[]> => {
    return new Promise(resolve => setTimeout(() => resolve(tagOptions), 200));
  },
  getById: async (id: string): Promise<Tag | null> => {
    return new Promise(resolve => setTimeout(() => {
      const tag = tagOptions.find(t => t._id === id);
      resolve(tag || null);
    }, 200));
  },
  create: async (data: Omit<Tag, 'id'>): Promise<Tag | null> => {
    return new Promise(resolve => setTimeout(() => {
      const newTag = { id: String(Date.now()), ...data };
      tagOptions.push(newTag);
      resolve(newTag);
    }, 200));
  },
  update: async (id: string, data: Partial<Tag>): Promise<Tag | null> => {
    return new Promise(resolve => setTimeout(() => {
      const index = tagOptions.findIndex(t => t._id === id);
      if (index !== -1) {
        const updatedTag = { ...tagOptions[index], ...data };
        tagOptions[index] = updatedTag;
        resolve(updatedTag);
      } else {
        resolve(null);
      }
    }, 200));
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise(resolve => setTimeout(() => {
      const index = tagOptions.findIndex(t => t._id === id);
      if (index !== -1) {
        tagOptions.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 200));
  },
  search: async (params: any): Promise<Tag[]> => {
    return new Promise(resolve => setTimeout(() => {
      const keyword = params?.name?.toLowerCase?.() || '';
      const result = tagOptions.filter(t => t.name.toLowerCase().includes(keyword));
      resolve(result);
    }, 200));
  },
};