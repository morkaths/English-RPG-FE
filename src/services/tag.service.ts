import * as RequestUtils from '../utils/request';
import type { Tag } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { tagOptions } from 'src/constants';

export const TagService = {
  getAll: async (): Promise<Tag[]> => {
    const response = await RequestUtils.privateGet<Tag[]>(API_CONFIG.endpoints.tag.getAll);
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  getById: async (id: string): Promise<Tag | null> => {
    const response = await RequestUtils.privateGet<Tag>(API_CONFIG.endpoints.tag.getById(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch tag");
  },
  create: async (data: Omit<Tag, 'id'>): Promise<Tag | null> => {
    const response = await RequestUtils.privatePost<Tag>(API_CONFIG.endpoints.tag.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create tag");
  },
  update: async (id: string, data: Partial<Tag>): Promise<Tag | null> => {
    const response = await RequestUtils.privatePut<Tag>(API_CONFIG.endpoints.tag.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update tag");
  },
  delete: async (id: string): Promise<boolean> => {
    const response = await RequestUtils.privateDelete(API_CONFIG.endpoints.tag.delete(id));
    if (response.success) {
      return true;
    }
    throw new Error(response.message || "Failed to delete tag");
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
  }
};