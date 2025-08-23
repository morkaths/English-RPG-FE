// ────────────────────────────────────────────────────────────────────────────────
// User Service: Quản lý người dùng, xác thực & phân quyền
// ────────────────────────────────────────────────────────────────────────────────
// Người dùng (User)
export interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: 'admin' | 'staff' | 'user';
    avatar?: string;
    isVerified: boolean;
    joinedAt: Date;
}

// ────────────────────────────────────────────────────────────────────────────────
// Progress Service: Quản lý tiến trình người chơi
// ────────────────────────────────────────────────────────────────────────────────
// Tiến trình người chơi
export interface UserProgress {
    _id: string;
    userId: string; // User._id
    figure: string;
    level: number;
    exp: number;
    coins: number;
    stats: {
        hp: number;
        atk: number;
        def: number;
        critRate: number;
        critDamage: number;
    };
    updatedAt: Date;
}
// Kho đồ
export interface Inventory {
    _id: string;
    userId: string; // User._id
    itemId: string; // Item._id
    quantity: number;
}
// Tiến trình nhiệm vụ
export interface QuestProgress {
    _id: string;
    userId: string; // User._id
    questId: string; // Quest._id
    status: 'not_started' | 'in_progress' | 'completed';
    progress: number; // 0-100%
    updatedAt: Date;
}
// Tiến trình thành tích
export interface AchievementProgress {
    _id: string;
    userId: string; // User._id
    achievementId: string; // Achievement._id
    achievedAt: Date;
}
// Tiến trình khóa học
export interface CourseProgress {
    _id: string;
    userId: string; // User._id
    courseId: string; // Course._id
    lessons: {
        id: string; // Lesson._id
        status: 'not_started' | 'in_progress' | 'completed';
        completedAt?: Date;
    }[];
    progress: number; // 0-100%
}

// ────────────────────────────────────────────────────────────────────────────────
// Catalog Service: Quản lý nội dung, danh mục
// ────────────────────────────────────────────────────────────────────────────────
// Nhiệm vụ (Quest)
export interface Quest {
    _id: string;
    title: string;
    description: string;
    requiredLevel?: number;
    rewardCoins: number;
    rewardItems: {
        id: string; // Item._id
        quantity: number;
    }[];
}
// Vật phẩm (Item)
export interface Item {
    _id: string;
    name: string;
    description?: string;
    icon?: string;
    type: 'equipment' | 'consumable' | 'quest' | 'other';
    effect?: string;
}
// Thành tích (Achievement)
export interface Achievement {
    _id: string;
    name: string;
    description?: string;
    icon?: string;
    points?: number;
}
// Khóa học (Course)
export interface Course {
    _id: string;
    title: string;
    description?: string;
    lessons: string[]; // Lesson._id[]
    rewardCoins: number;
    rewardItems: { id: string; quantity: number }[];
}
// Bài học (Lesson)
export interface Lesson {
    _id: string;
    courseId: string;
    title: string;
    content: string;
    quizzes: string[]; // Quiz._id[]
    resources: string[];
    monster: {
        name: string;
        figure: string;
        hp: number;
        atk: number;
        def: number;
        critRate?: number;
        critDamage?: number;
    };
    rewardCoins: number;
}
// Câu hỏi trong bài học
export interface BaseQuiz {
    _id: string;
    lessonId: string; // Lesson._id
    type: 'choice' | 'fill_blank' | 'matching';
    question: string;
    timeLimit: number;
    rewardExp: number;
}

export interface ChoiceQuiz extends BaseQuiz {
    type: 'choice';
    options: { text: string; isCorrect: boolean }[];
}

export interface FillBlankQuiz extends BaseQuiz {
    type: 'fill_blank';
    correctAnswers: string[];
}

export interface MatchingQuiz extends BaseQuiz {
    type: 'matching';
    pairs: { left: string; right: string }[];
}

export type Quiz = ChoiceQuiz | FillBlankQuiz | MatchingQuiz;


// ────────────────────────────────────────────────────────────────────────────────
// Gameplay Service: Xử lý logic game, tương tác người chơi
// ────────────────────────────────────────────────────────────────────────────────
// Tiến trình trận đấu
export interface BattleState {
    _id: string;
    userId: string; // User._id
    lessonId: string; // Lesson._id
    currentQuizId: string; // Quiz._id
    playerHP: number;
    enemyHP: number;
    status: 'in_battle' | 'won' | 'lost';
    startedAt: Date;
    endedAt?: Date;
}
// Lượt đi
export interface BattleTurn {
    _id: string;
    battleId: string; // BattleState._id
    quizId: string; // Quiz._id
    playerAnswer?: string | string[];
    isCorrect: boolean;
    turnNumber: number;
    damage: number;
}

// ────────────────────────────────────────────────────────────────────────────────
// API Response: Xử lý phản hồi API
// ────────────────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    token?: string;
    user?: User;
    data?: T;
    statusCode?: number;
}
export interface ApiError {
  message: string;
  errors?: string[];
}


