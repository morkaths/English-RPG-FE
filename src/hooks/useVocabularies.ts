import { useEffect, useCallback, useState } from "react";
import type { Vocabulary, Translation, Lesson } from "src/types";
import { VocabularyServiceFake as VocabularyService } from "src/services/vocabulary.service";
import { TranslationServiceFake as TranslationService } from "src/services/translation.service";

export interface VocabWithTrans extends Vocabulary {
  translations?: Translation[];
}

const useVocabularies = (lesson?: Lesson) => {
  const [vocabularies, setVocabularies] = useState<VocabWithTrans[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVocabularies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let vocabList: Vocabulary[] = [];
      if (!lesson) {
        vocabList = await VocabularyService.getAll();
      } else if (lesson.vocabularies?.length > 0) {
        vocabList = (await Promise.all(
          lesson.vocabularies.map((id) => VocabularyService.getById(id))
        )).filter((v): v is Vocabulary => v !== null);
      }
      const vocabsWithTrans = await Promise.all(
        vocabList.map(async (vocab) => ({
          ...vocab,
          translations: await TranslationService.getByVocabularyId(vocab._id),
        }))
      );

      setVocabularies(vocabsWithTrans);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lesson]);

  useEffect(() => {
    fetchVocabularies();
  }, [fetchVocabularies]);

  return {
    vocabularies,
    loading,
    error,
    fetchVocabularies,
  };
}

export default useVocabularies;