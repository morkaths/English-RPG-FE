import { useEffect, useCallback, useState } from "react";
import type { Grammar, Lesson } from "src/types";
import { GrammarServiceFake as GrammarService } from "src/services/grammar.service";

const useGrammars = (lesson?: Lesson) => {
  const [grammars, setGrammars] = useState<Grammar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGrammars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let grammarList: Grammar[] = [];
      if (!lesson) {
        grammarList = await GrammarService.getAll();
      } else if (lesson.grammars?.length > 0) {
        grammarList = (await Promise.all(
          lesson.grammars.map((id) => GrammarService.getById(id))
        )).filter((g): g is Grammar => g !== null);
      }
      setGrammars(grammarList);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lesson]);

  useEffect(() => {
    fetchGrammars();
  }, [fetchGrammars]);

  return {
    grammars,
    loading,
    error,
    fetchGrammars,
  };
};

export default useGrammars;