import { useState, useCallback, useEffect } from 'react';
import type { Course, SearchFilters } from '../types';
import { CourseServiceFake as CourseService } from '../services/course.service';

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Lấy tất cả khóa học
   */
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const courseList = await CourseService.getAll();
      setCourses(courseList);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Tìm kiếm khóa học theo bộ lọc
   */
  const searchCourses = useCallback(async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Searching with filters:", filters);
      const courseList = await CourseService.search(filters);
      console.log("Search result:", courseList);
      setCourses(courseList);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    searchCourses,
  }
};

export default useCourses;
