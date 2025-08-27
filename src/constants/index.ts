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

export const characters: Types.Character[] = [
  { _id: "1", name: "Warrior", figure: "warrior.png", hp: 100, atk: 20, def: 15 },
  { _id: "2", name: "Mage", figure: "mage.png", hp: 80, atk: 25, def: 10 },
  { _id: "3", name: "Archer", figure: "archer.png", hp: 90, atk: 22, def: 12 },
  { _id: "4", name: "Slime", figure: "slime.png", hp: 50, atk: 10, def: 5 },
  { _id: "5", name: "Goblin", figure: "goblin.png", hp: 70, atk: 15, def: 8 },
  { _id: "6", name: "Orc", figure: "orc.png", hp: 120, atk: 25, def: 18 }
];

export const quizzes: Types.Quiz[] = [
  {
    _id: "1",
    lessonId: "1",
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
    lessonId: "1",
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
    lessonId: "1",
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
    lessonId: "2",
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
    lessonId: "2",
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
    lessonId: "2",
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
    lessonId: "3",
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
    lessonId: "3",
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
    lessonId: "3",
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

export const lessons: Types.Lesson[] = [
  {
    _id: "1",
    title: "Mời khách xơi nước",
    tags: [],
    content: "Bài học về cách mời khách lịch sự.",
    quizzes: []
  },
  {
    _id: "2",
    title: "Chào hỏi cơ bản",
    tags: [],
    content: "Bài học về các câu chào hỏi thông dụng.",
    quizzes: []
  },
  {
    _id: "3",
    title: "Giới thiệu bản thân",
    tags: [],
    content: "Bài học về cách giới thiệu bản thân.",
    quizzes: []
  },

];

export const courses: Types.Course[] = [
  {
    _id: "1",
    title: "Tiếng Anh giao tiếp A1",
    tags: ["1", "8"],
    thumbnail: "",
    description: "Khóa học tiếng Anh giao tiếp cho người mới bắt đầu.",
    level: "A1",
    lessons: [ "1", "2", "3" ],
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
    lessons: [ "1", "2", "3" ],
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
    lessons: [ "1", "2", "3" ],
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
    lessons: [ "1", "2", "3" ],
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
    lessons: [ "1", "2", "3" ],
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
    lessons: [ "1", "2", "3" ],
    rewardCoins: 100,
    rewardItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];