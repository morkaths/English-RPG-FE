import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import type { Lesson } from "src/types";
import useTags from 'src/hooks/useTags';
import useGrammars from 'src/hooks/useGrammars';
import useVocabularies from 'src/hooks/useVocabularies';
import { playAudio } from "src/utils/speech";

type StepStatus = "locked" | "unlocked" | "current";

interface StepButtonProps {
  index: number;
  lesson: Lesson;
  icon: string;
  status: StepStatus
}

const COLORS = [
  "rgb(59, 130, 246)",   // blue-500
  "rgb(139, 92, 246)",   // purple-500
  "rgb(16, 185, 129)",   // emerald-500
  "rgb(236, 72, 153)",   // pink-500
  "rgb(251, 191, 36)",   // yellow-400 (vàng dịu)
  "rgb(34, 197, 94)",    // green-500
  "rgb(244, 63, 94)",    // rose-500
  "rgb(168, 85, 247)",   // violet-500
  "rgb(52, 211, 153)",   // teal-400
  "rgb(96, 165, 250)",   // blue-400
];

const StepButton: React.FC<StepButtonProps> = ({ index, lesson, icon, status = "locked" }) => {
  const { tags, loading: tagLoading, error: tagError } = useTags();
  const { grammars, loading: grammarLoading, error: grammarError } = useGrammars(lesson);
  const { vocabularies, loading: vocabLoading, error: vocabError } = useVocabularies(lesson);

  const [show, setShow] = useState(false);
  const color = COLORS[index % COLORS.length];

  const handlePlayAudio = (text: string) => {
    playAudio(text, 'en-US', 'Microsoft Zira - English (United States)');
  }

  return (
    <>
      <div className="relative flex items-center justify-center w-20 h-20 group">
        <div
          className="absolute inset-0 rounded-full border-4 border-gray-300 z-0 group-active:invisible"
          style={{ boxSizing: "border-box" }}
        ></div>
        <button
          type="button"
          className={` 
            z-10
            w-max h-[60px] !h-auto !w-min px-16
            inline-flex items-center justify-center gap-3
            break-words select-none
            rounded-full rounded-medium !p-[15px]
            text-label-m-bold text-white
            bg-primary-base hover:bg-primary-sub active:bg-base-blue
            disabled:bg-primary-soft disabled:cursor-not-allowed
            shadow-[0px_-5px_0px_0px_rgba(0,0,0,0.20)_inset]
            transition-all
            active:translate-y-[2px] active:shadow-none active:h-[58px]
            outline-neutral-soft-200 outline-4 outline-offset-3
          `}
          style={{ backgroundColor: color }}
          onClick={() => setShow(true)}
          disabled={status === "locked"}
        >
          <span className="flex items-center justify-center w-[35px] h-[35px]">
            <Icon icon={icon} width={35} height={35} />
          </span>
        </button>
      </div>



      {/* Modal */}
      <Modal show={show} onClose={() => setShow(false)} size="xl">
        <div className="rounded-2xl overflow-hidden">
          {/* Header custom */}
          <div className="px-8 pt-6 pb-4" style={{ backgroundColor: color }}>
            <div className="flex flex-col items-center w-full">
              <div className="text-white text-2xl font-bold text-center">{lesson.title}</div>
              <div className="text-white/90 text-base mb-2 text-center">{lesson.content || "How to learn"}</div>
              <div className="flex gap-2 mb-2 justify-center">
                <span className="bg-gray-300/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {(lesson.vocabularies && lesson.vocabularies.length) || 0} Vocabularies
                </span>
                <span className="bg-gray-300/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {(lesson.grammars && lesson.grammars.length) || 0} Grammars
                </span>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition"
              aria-label="Đóng"
              type="button"
            >
              <Icon icon="mdi:close" width={24} height={24} />
            </button>
          </div>
          {/* Body */}
          <div className="bg-white dark:bg-gray-900 px-8 py-6 overflow-y-auto max-h-[60vh]">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-2">
              {tagError && (
                <div className="col-span-2 text-center text-red-500 italic py-2">
                  {tagError}
                </div>
              )}
              {tagLoading ? (
                <div className="col-span-2 text-center text-blue-400 italic py-4">
                  Đang tải thẻ...
                </div>
              ) : (
                lesson.tags?.slice(0, 3).map((tagId, idx) => {
                  const tag = tags.find((t) => t._id === tagId);
                  if (!tag) return null;
                  return (
                    <span
                      key={idx}
                      className="border rounded-full px-4 py-1 font-semibold text-xs flex items-center gap-1"
                      style={{
                        background: tag.color + "22",
                        color: tag.color,
                        borderColor: tag.color + "55",
                        borderWidth: 1,
                      }}
                    >
                      <Icon icon={tag.icon || "mdi:tag"} /> {tag.name}
                    </span>
                  );
                })
              )}
              { }
            </div>
            {/* Grammar */}
            <div className="mb-4">
              <div className="font-semibold mb-2">GRAMMARS</div>
              {grammarError && (
                <div className="col-span-2 text-center text-red-500 italic py-2">
                  {grammarError}
                </div>
              )}
              {grammarLoading ? (
                <div className="col-span-2 text-center text-blue-400 italic py-4">
                  Đang tải ngữ pháp...
                </div>
              ) : (
                (grammars && grammars.length > 0) ? (
                  grammars.map((g, idx) => (
                    <div
                      key={idx}
                      className="border border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-800 rounded-2xl flex items-center gap-2.5 p-3 mb-2"
                      style={{ border: `1.5px solid ${color}` }}
                    >
                      <Icon icon="mdi:book-open-page-variant" className="h-6 w-6 shrink-0" />
                      <span className="text-sm font-bold" style={{ color }}>
                        {g.title} - {g.explanation}
                      </span>
                    </div>
                  ))
                ) : (
                  !grammarError && (
                    <div
                      className="border border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-800 rounded-xl flex items-center gap-2.5 p-3 mb-2 shadow-sm"
                    >
                      <Icon icon="mdi:book-open-page-variant" className="h-6 w-6 shrink-0 text-blue-400" />
                      <span className="text-sm font-semibold text-blue-800 dark:text-white">
                        There are no grammar exercises for this article yet.
                      </span>
                    </div>
                  )
                )
              )}
            </div>
            {/* Vocabulary */}
            <div className="mb-4">
              <div className="font-semibold mb-2">VOCABULARIES</div>
              {vocabError && (
                <div className="col-span-2 text-center text-red-500 italic py-2">
                  {vocabError}
                </div>
              )}
              {vocabLoading ? (
                <div className="col-span-2 text-center text-blue-400 italic py-4">
                  Đang tải từ vựng...
                </div>
              ) : (
                < div className="grid grid-cols-2 gap-2 mb-4">
                  {(vocabularies && vocabularies.length > 0) ? (
                    vocabularies.map((v, idx) => (

                      <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900 rounded-xl px-4 py-3 flex items-center gap-2 shadow-sm"
                      >
                        <button
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition"
                          onClick={() => handlePlayAudio(v.word)}
                          type="button"
                          aria-label={`Nghe phát âm ${v.word}`}
                        >
                          <Icon icon="mdi:volume-high" className="text-blue-400" width={22} height={22} />
                        </button>
                        <div>
                          <div className="font-semibold text-blue-800 dark:text-white flex items-center gap-2">
                            {v.word}
                            {v.phonetic && (
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-normal">[{v.phonetic}]</span>
                            )}
                          </div>
                          {(() => {
                            const lang = localStorage.getItem("language");
                            const translation = v.translations?.find(t => t.code === lang);
                            return translation?.meaning ? (
                              <div className="text-xs text-blue-400">{translation.meaning}</div>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    ))
                  ) : (
                    !vocabError && (
                      <div className="col-span-2 text-center text-gray-400 italic py-4">
                        There are no vocabulary items for this lesson yet.
                      </div>
                    )
                  )}
                </div>
              )}

            </div>
            {/* Button */}
            <Button
              style={{ backgroundColor: color }}
              className="w-full text-white font-bold hover:brightness-90"
              onClick={() => setShow(false)}
            >
              Đã hiểu!
            </Button>
          </div>
        </div>
      </Modal >
    </>
  );
}

export default StepButton;