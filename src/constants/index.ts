import type * as Types from "src/types";
export const levels = [
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
];

export const sortOptions = [
  { value: "relevance", label: "Liên quan nhất" },
  { value: "popular", label: "Phổ biến nhất" },
  { value: "newest", label: "Mới nhất" },
];

export const tagOptions: Types.Tag[] = [
  { _id: "1", name: "Ngữ pháp", type: "skill", color: "#f59e42" },
  { _id: "2", name: "Nói", type: "skill", color: "#38bdf8" },
  { _id: "3", name: "Từ vựng", type: "skill", color: "#34d399" },
  { _id: "4", name: "Nghe", type: "skill", color: "#a78bfa" },
  { _id: "5", name: "Đọc", type: "skill", color: "#f87171" },
  { _id: "6", name: "Viết", type: "skill", color: "#fbbf24" },
  { _id: "7", name: "Phát âm", type: "skill", color: "#10b981" },
  { _id: "8", name: "Giao tiếp", type: "skill", color: "#3b82f6" },
  { _id: "9", name: "Kiểm tra", type: "topic", color: "#8b5cf6" },
  { _id: "10", name: "Giải trí", type: "topic", color: "#ec4899" },
];

export const vowels = [
  { symbol: "ɑ", word: "hot",  audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ɑ" },
  { symbol: "æ", word: "cat",  audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/æ" },
  { symbol: "ʌ", word: "but",  audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ʌ" },
  { symbol: "ɛ", word: "bed", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ɛ" },
  { symbol: "eɪ", word: "say", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/eɪ" },
  { symbol: "ɜː", word: "bird", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ɜː" },
  { symbol: "ɪ", word: "ship", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ɪ" },
  { symbol: "i", word: "sheep", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/i" },
  { symbol: "ə", word: "about", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ə" },
  { symbol: "oʊ", word: "boat", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/oʊ" },
  { symbol: "ʊ", word: "foot", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ʊ" },
  { symbol: "u", word: "food", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/u" },
  { symbol: "aʊ", word: "cow", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/aʊ" },
  { symbol: "aɪ", word: "time", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/aɪ" },
  { symbol: "ɔɪ", word: "boy", audioUrl: "https://dictionary.cambridge.org/topics/pronunciation/ɔɪ" },
];

export const consonants = [
  { symbol: "b", word: "book" },
  { symbol: "tʃ", word: "chair" },
  { symbol: "d", word: "day" },
  { symbol: "f", word: "fish" },
  { symbol: "g", word: "go" },
  { symbol: "h", word: "home" },
  { symbol: "dʒ", word: "job" },
  { symbol: "k", word: "key" },
  { symbol: "l", word: "lion" },
];

export const courses: Types.Course[] = [
  {
    _id: "1",
    title: "Tiếng Anh giao tiếp A1",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "A1",
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    title: "Tiếng Anh giao tiếp A2",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "A2",
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    title: "Tiếng Anh giao tiếp B1",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "B1",
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    title: "Tiếng Anh giao tiếp B2",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "B2",
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "5",
    title: "Tiếng Anh giao tiếp C1",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "C1",
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "6",
    title: "Tiếng Anh giao tiếp C2",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "C2",
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const lessons: Types.Lesson[] = [
  {
    _id: "1",
    courseId: "1",
    title: "Greating",
    tags: ["1", "3", "8"],
    content: "Greeting is the first step in communication.",
    vocabularies: ["1", "2", "3", "4"],
    grammars: [],
    quizzes: [],
  },
  {
    _id: "2",
    courseId: "1",
    title: "Introductions",
    tags: ["3", "8"],
    content: "Introduction is how you tell others about yourself.",
    vocabularies: ["1", "2"],
    grammars: [],
    quizzes: []
  },
  {
    _id: "3",
    courseId: "1",
    title: "Jobs",
    tags: ["3", "8"],
    content: "Learning vocabulary related to jobs can help you in conversations about work.",
    vocabularies: ["3", "4"],
    grammars: [],
    quizzes: []
  },

];

export const vocabularies: Types.Vocabulary[] = [
  {
    _id: "1",
    code: "en",
    word: "Hello",
    quizzes: ["1", "2"],
    phonetic: "həˈloʊ",
    example: "Hello! How are you?",
    imageUrl: ""
  },
  {
    _id: "2",
    code: "en",
    word: "Goodbye",
    quizzes: ["3", "4"],
    phonetic: "ɡʊdˈbaɪ",
    example: "Goodbye! See you later.",
    imageUrl: ""
  },
  {
    _id: "3",
    code: "en",
    word: "Please",
    quizzes: ["5", "6"],
    phonetic: "pliːz",
    example: "Please help me with this task.",
    imageUrl: ""
  },
  {
    _id: "4",
    code: "en",
    word: "Thank you",
    quizzes: ["7", "8"],
    phonetic: "ˈθæŋk juː",
    example: "Thank you for your assistance.",
    imageUrl: ""
  },
];

export const translations: Types.Translation[] = [
  { _id: "1", vocabularyId: "1", code: "vi", meaning: "Xin chào" },
  { _id: "2", vocabularyId: "2", code: "vi", meaning: "Tạm biệt" },
  { _id: "3", vocabularyId: "3", code: "vi", meaning: "Làm ơn" },
  { _id: "4", vocabularyId: "4", code: "vi", meaning: "Cảm ơn" },
];

export const grammars: Types.Grammar[] = [
  {
    _id: "1",
    title: "Present Simple",
    explanation: "Describe habits, unchanging situations, general truths, and fixed arrangements.",
    quizzes: ["9", "10"]
  },
  {
    _id: "2",
    title: "Past Simple",
    explanation: "Describe completed actions or events that happened at a specific time in the past.",
    quizzes: ["11", "12"]
  },
  {
    _id: "3",
    title: "Future Simple",
    explanation: "Describe actions that will happen at a specific time in the future.",
    quizzes: ["13", "14"]
  }
];

export const quizzes: Types.Quiz[] = [
  {
    _id: "1",
    type: "choice",
    question: "What do you say to offer a guest a drink?",
    timeLimit: 30,
    rewardExp: 100,
    options: [
      { _id: "1", text: "Would you like some water?", isCorrect: true },
      { _id: "2", text: "Goodbye!", isCorrect: false },
    ],
  },
  {
    _id: "2",
    type: "fill_blank",
    question: "She is drinking ____.",
    timeLimit: 30,
    rewardExp: 100,
    answers: [
      { _id: "1", text: "water" }
    ]
  },
  {
    _id: "3",
    type: "matching",
    question: "Match the English words with their Vietnamese meanings.",
    timeLimit: 40,
    rewardExp: 120,
    pairs: [
      { _id: "1", left: "Water", right: "Nước" },
      { _id: "2", left: "Milk", right: "Sữa" },
      { _id: "3", left: "Tea", right: "Trà" },
    ]
  },
  {
    _id: "4",
    type: "choice",
    question: "How do you greet someone in the morning?",
    timeLimit: 20,
    rewardExp: 80,
    options: [
      { _id: "1", text: "Good morning!", isCorrect: true },
      { _id: "2", text: "Good night!", isCorrect: false },
      { _id: "3", text: "See you!", isCorrect: false },
    ],
  },
  {
    _id: "5",
    type: "fill_blank",
    question: "____ morning!",
    timeLimit: 20,
    rewardExp: 80,
    answers: [
      { _id: "1", text: "Good" }
    ]
  },
  {
    _id: "6",
    type: "choice",
    question: "Which sentence is used to introduce yourself?",
    timeLimit: 25,
    rewardExp: 90,
    options: [
      { _id: "1", text: "My name is Anna.", isCorrect: true },
      { _id: "2", text: "How old are you?", isCorrect: false },
      { _id: "3", text: "Nice to meet you.", isCorrect: false },
    ],
  },
  {
    _id: "7",
    type: "fill_blank",
    question: "My name is ____.",
    timeLimit: 25,
    rewardExp: 90,
    answers: [
      { _id: "1", text: "Anna" }
    ]
  },
  {
    _id: "8",
    type: "matching",
    question: "Match the English sentences with their Vietnamese meanings.",
    timeLimit: 40,
    rewardExp: 120,
    pairs: [
      { _id: "1", left: "My name is Anna.", right: "Tên tôi là Anna." },
      { _id: "2", left: "How old are you?", right: "Bạn bao nhiêu tuổi?" },
      { _id: "3", left: "Nice to meet you.", right: "Rất vui được gặp bạn." },
    ]
  },
  {
    _id: "9",
    type: "choice",
    question: "My name is ____.",
    timeLimit: 25,
    rewardExp: 90,
    options: [
      { _id: "1", text: "Anna", isCorrect: true },
      { _id: "2", text: "John", isCorrect: false },
      { _id: "3", text: "Mary", isCorrect: false },
    ]
  }

];