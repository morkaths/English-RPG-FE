import * as ApiRequest from './index';
import type { Translation } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { translations } from 'src/constants';

const SERVICE: ApiRequest.ApiService = 'catalog';

export const TranslationService = {
  getAll: async (): Promise<Translation[]> => {
    const response = await ApiRequest.apiGet<Translation[]>(SERVICE, API_CONFIG.endpoints.translation.getAll, undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  getByVocabularyId: async (vocabularyId: string): Promise<Translation[]> => {
    const response = await ApiRequest.apiGet<Translation[]>(SERVICE, API_CONFIG.endpoints.translation.getByVocabularyId(vocabularyId), undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  create: async (data: Partial<Translation>): Promise<Translation | null> => {
    const response = await ApiRequest.apiPost<Translation>(SERVICE, API_CONFIG.endpoints.translation.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create translation");
  },
  update: async (id: string, data: Partial<Translation>): Promise<Translation | null> => {
    const response = await ApiRequest.apiPut<Translation>(SERVICE, API_CONFIG.endpoints.translation.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update translation");
  },
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete( SERVICE, API_CONFIG.endpoints.translation.delete(id));
    return response.success;
  }
};

export const TranslationServiceFake = {
  getAll: async (): Promise<Translation[]> => {
    return new Promise(resolve => setTimeout(() => resolve(translations), 200));
  },
  getByVocabularyId: async (vocabularyId: string): Promise<Translation[]> => {
    return new Promise(resolve => setTimeout(() => {
      const result = translations.filter(t => t.vocabularyId === vocabularyId);
      resolve(result);
    }, 200));
  },
  create: async (data: Partial<Translation>): Promise<Translation | null> => {
    return new Promise(resolve => setTimeout(() => {
      const newTrans = { _id: String(Date.now()), ...data } as Translation;
      translations.push(newTrans);
      resolve(newTrans);
    }, 200));
  },
  update: async (id: string, data: Partial<Translation>): Promise<Translation | null> => {
    return new Promise(resolve => setTimeout(() => {
      const index = translations.findIndex(t => t._id === id);
      if (index !== -1) {
        translations[index] = { ...translations[index], ...data };
        resolve(translations[index]);
      } else {
        resolve(null);
      }
    }, 200));
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise(resolve => setTimeout(() => {
      const index = translations.findIndex(t => t._id === id);
      if (index !== -1) {
        translations.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 200));
  }
};

