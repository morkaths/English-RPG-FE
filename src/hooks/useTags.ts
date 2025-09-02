import { useState, useCallback, useEffect } from 'react';
import type { Tag } from '../types';
import { TagServiceFake as TagService } from '../services/tag.service';

const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Lấy tất cả thẻ
   */
  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tagList = await TagService.getAll();
      setTags(tagList);
    } catch (err) {
      setError('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tags on mount
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return { 
    tags,
    loading,
    error,
    fetchTags
  };
};

export default useTags;
