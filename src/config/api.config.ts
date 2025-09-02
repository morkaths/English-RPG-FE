import * as ENV from './env.config';

export const API_CONFIG = {
  timeout: 10000,
  baseURLs: {
    user: ENV.USER_API_URL,
    catalog: ENV.CATALOG_API_URL,
  },
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      profile: '/auth/profile',
      update: '/auth/update-profile'
    },
    user: {
      getAll: '/users',
      search: '/users/search',
      getById: (id: string) => `/users/${id}`,
      create: '/users',
      update: (id: string) => `/users/${id}`,
      delete: (id: string) => `/users/${id}`,
    },
    tag: {
      getAll: '/tags',
      search: '/tags/search',
      getById: (id: string) => `/tags/${id}`,
      create: '/tags',
      update: (id: string) => `/tags/${id}`,
      delete: (id: string) => `/tags/${id}`,
    },
    course: {
      getAll: '/courses',
      search: '/courses/search',
      getById: (id: string) => `/courses/${id}`,
      create: '/courses',
      update: (id: string) => `/courses/${id}`,
      delete: (id: string) => `/courses/${id}`,
    },
    lesson: {
      getAll: '/lessons',
      search: '/lessons/search',
      getById: (id: string) => `/lessons/${id}`,
      create: '/lessons',
      update: (id: string) => `/lessons/${id}`,
      delete: (id: string) => `/lessons/${id}`,
    },
    vocabulary: {
      getAll: '/vocabularies',
      search: '/vocabularies/search',
      getById: (id: string) => `/vocabularies/${id}`,
      create: '/vocabularies',
      update: (id: string) => `/vocabularies/${id}`,
      delete: (id: string) => `/vocabularies/${id}`,
    },
    translation: {
      getAll: '/translations',
      getByVocabularyId: (vocabularyId: string) => `/translations/vocabulary/${vocabularyId}`,
      create: '/translations',
      update: (id: string) => `/translations/${id}`,
      delete: (id: string) => `/translations/${id}`,
    },
    grammar: {
      getAll: '/grammars',
      search: '/grammars/search',
      getById: (id: string) => `/grammars/${id}`,
      create: '/grammars',
      update: (id: string) => `/grammars/${id}`,
      delete: (id: string) => `/grammars/${id}`,
    },
    quiz: {
      getAll: '/quizzes',
      search: '/quizzes/search',
      getById: (id: string) => `/quizzes/${id}`,
      create: '/quizzes',
      update: (id: string) => `/quizzes/${id}`,
      delete: (id: string) => `/quizzes/${id}`,
    }

  }
};