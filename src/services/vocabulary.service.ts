import * as ApiRequest from './index';
import type { Vocabulary } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { vocabularies } from 'src/constants';

const SERVICE: ApiRequest.ApiService = 'catalog';

export const VocabularyService = {
  getAll: async (): Promise<Vocabulary[]> => {
    const response = await ApiRequest.apiGet<Vocabulary[]>(SERVICE, API_CONFIG.endpoints.vocabulary.getAll, undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  getById: async (id: string): Promise<Vocabulary | null> => {
    const response = await ApiRequest.apiGet<Vocabulary>(SERVICE, API_CONFIG.endpoints.vocabulary.getById(id), undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch vocabulary");
  },
  search: async (params: any): Promise<Vocabulary[]> => {
    const response = await ApiRequest.apiGet<Vocabulary[]>(SERVICE, API_CONFIG.endpoints.vocabulary.search, params, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  create: async (data: Partial<Vocabulary>): Promise<Vocabulary | null> => {
    const response = await ApiRequest.apiPost<Vocabulary>(SERVICE, API_CONFIG.endpoints.vocabulary.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create vocabulary");
  },
  update: async (id: string, data: Partial<Vocabulary>): Promise<Vocabulary | null> => {
    const response = await ApiRequest.apiPut<Vocabulary>(SERVICE, API_CONFIG.endpoints.vocabulary.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update vocabulary");
  },
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete(SERVICE, API_CONFIG.endpoints.vocabulary.delete(id));
    return response.success;
  }
}

export const VocabularyServiceFake = {
  getAll: async (): Promise<Vocabulary[]> => {
      return new Promise(resolve => setTimeout(() => resolve(vocabularies), 200));
    },
  getById: async (id: string): Promise<Vocabulary | null> => {
    return new Promise(resolve => setTimeout(() => {
      const vocab = vocabularies.find(v => v._id === id);
      resolve(vocab || null);
    }, 200));
  },
  create: async (data: Partial<Vocabulary>): Promise<Vocabulary | null> => {
    return new Promise(resolve => setTimeout(() => {
      const newVocab = { _id: String(Date.now()), ...data } as Vocabulary;
      vocabularies.push(newVocab);
      resolve(newVocab);
    }, 200));
  },
  update: async (id: string, data: Partial<Vocabulary>): Promise<Vocabulary | null> => {
    return new Promise(resolve => setTimeout(() => {
      const index = vocabularies.findIndex(v => v._id === id);
      if (index !== -1) {
        vocabularies[index] = { ...vocabularies[index], ...data };
        resolve(vocabularies[index]);
      } else {
        resolve(null);
      }
    }, 200));
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise(resolve => setTimeout(() => {
      const index = vocabularies.findIndex(v => v._id === id);
      if (index !== -1) {
        vocabularies.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 200));
  },
  search: async (params: any): Promise<Vocabulary[]> => {
    let results = vocabularies;
    if (params?.query) {
      const q = params.query.toLowerCase();
      results = results.filter(v =>
        v.word.toLowerCase().includes(q)
      );
    }
    return new Promise(resolve => setTimeout(() => resolve(results), 200));
  }
}