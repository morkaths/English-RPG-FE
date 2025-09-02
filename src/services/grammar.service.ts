import * as ApiRequest from './index';
import type { Grammar } from '../types';
import { API_CONFIG } from 'src/config/api.config';
import { grammars } from 'src/constants';

const SERVICE: ApiRequest.ApiService = 'catalog';

export const GrammarService = {
  getAll: async (): Promise<Grammar[]> => {
    const response = await ApiRequest.apiGet<Grammar[]>(SERVICE, API_CONFIG.endpoints.grammar.getAll, undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  getById: async (id: string): Promise<Grammar | null> => {
    const response = await ApiRequest.apiGet<Grammar>(SERVICE, API_CONFIG.endpoints.grammar.getById(id), undefined, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch grammar");
  },
  search: async (params: any): Promise<Grammar[]> => {
    const response = await ApiRequest.apiGet<Grammar[]>(SERVICE, API_CONFIG.endpoints.grammar.search, params, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  create: async (data: Partial<Grammar>): Promise<Grammar | null> => {
    const response = await ApiRequest.apiPost<Grammar>(SERVICE, API_CONFIG.endpoints.grammar.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create grammar");
  },
  update: async (id: string, data: Partial<Grammar>): Promise<Grammar | null> => {
    const response = await ApiRequest.apiPut<Grammar>(SERVICE, API_CONFIG.endpoints.grammar.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update grammar");
  },
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete(SERVICE, API_CONFIG.endpoints.grammar.delete(id));
    return response.success;
  }
}

export const GrammarServiceFake = {
  getAll: async (): Promise<Grammar[]> => {
    return new Promise(resolve => setTimeout(() => resolve(grammars), 200));
  },
  getById: async (id: string): Promise<Grammar | null> => {
    return new Promise(resolve => setTimeout(() => {
      const grammar = grammars.find(g => g._id === id);
      resolve(grammar || null);
    }, 200));
  },
  create: async (data: Partial<Grammar>): Promise<Grammar | null> => {
    return new Promise(resolve => setTimeout(() => {
      const newGrammar = { _id: String(Date.now()), ...data } as Grammar;
      grammars.push(newGrammar);
      resolve(newGrammar);
    }, 200));
  },
  update: async (id: string, data: Partial<Grammar>): Promise<Grammar | null> => {
    return new Promise(resolve => setTimeout(() => {
      const index = grammars.findIndex(g => g._id === id);
      if (index !== -1) {
        grammars[index] = { ...grammars[index], ...data };
        resolve(grammars[index]);
      } else {
        resolve(null);
      }
    }, 200));
  },
  delete: async (id: string): Promise<boolean> => {
    return new Promise(resolve => setTimeout(() => {
      const index = grammars.findIndex(g => g._id === id);
      if (index !== -1) {
        grammars.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 200));
  },
  search: async (params: any): Promise<Grammar[]> => {
    let results = grammars;
    if (params?.query) {
      const q = params.query.toLowerCase();
      results = results.filter(g =>
        g.title?.toLowerCase().includes(q) ||
        g.explanation?.toLowerCase().includes(q)
      );
    }
    return new Promise(resolve => setTimeout(() => resolve(results), 200));
  }
};