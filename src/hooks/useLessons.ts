import { useState, useCallback, useEffect } from 'react';
import type { Lesson } from '../types';
import { LessonServiceFake as LessonService } from '../services/lesson.service';

const useLessons = (courseId?: string) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = useCallback(async () => {
    if (!courseId) {
      setLessons([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const lessonList = await LessonService.getAll(courseId);
      setLessons(lessonList);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const searchLessons = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const lessonList = await LessonService.search({ query });
      setLessons(lessonList);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return {
    lessons,
    loading,
    error,
    fetchLessons,
    searchLessons,
  }
};

export default useLessons;