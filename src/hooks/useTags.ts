
import { useState, useCallback, useEffect } from 'react';
import { Tag } from '../types';
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
            const data = await TagService.getAll();
            setTags(data);
        } catch (err) {
            setError('Failed to fetch tags');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch tags on mount
    useEffect(() => {
        fetchTags();
    }, []);

    return { tags, loading, error };
};

export default useTags;
