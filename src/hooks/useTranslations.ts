import { useEffect, useState, useCallback } from "react";
import type { Translation } from "../types";
import { TranslationServiceFake as TranslationService } from "../services/translation.service";

const useTranslations = (vocabularyId: string) => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTranslations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const transList = await TranslationService.getByVocabularyId(vocabularyId);
      setTranslations(transList);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [vocabularyId]);

  useEffect(() => {
    fetchTranslations();
  }, [fetchTranslations]);

  return {
    translations,
    loading,
    error,
    fetchTranslations
  };
};

export default useTranslations;