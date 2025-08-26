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
  level: number;
  exp: number;
  coins: number;
  characterId: string; // Character._id
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
// Gắn thẻ (Tag)
export interface Tag {
  _id: string;
  name: string;
  type?: 'topic' | "skill" | 'item' | 'quest' | 'other';
  icon?: string;
  color?: string;
}

// Nhân vật (Character)
export interface Character {
  _id: string;
  name: string;
  figure: string;
  hp: number;
  atk: number;
  def: number;
  critRate?: number;
  critDamage?: number;
}

// Nhiệm vụ (Quest)
export interface Quest {
  _id: string;
  title: string;
  tags?: string[]; // Tag._id[]
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
  tags?: string[]; // Tag._id[]
  description?: string;
  icon?: string;
  effect?: string;
  type: 'equipment' | 'consumable' | 'quest' | 'other';
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
  tags?: string[]; //Tag._id[]
  thumbnail?: string;
  description?: string;
  level?: string; // A1, A2, B1, B2, C1, C2
  lessons: string[]; // Lesson._id[]
  rewardCoins?: number;
  rewardItems?: { id: string; quantity: number }[];
  createdAt: Date;
  updatedAt: Date;
}
// Bài học (Lesson)
export interface Lesson {
  _id: string;
  courseId: string; // Course._id
  title: string;
  tags?: string[];
  content: string;
  quizzes: string[]; // Quiz._id[]
  resources: string[];
  monster: Character;
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
// Utils: Các interface tiện ích
// ────────────────────────────────────────────────────────────────────────────────
export interface Pagination {
  total: number;  // Tổng số item (bản ghi) trong toàn bộ dữ liệu
  limit: number;  // Số item trên mỗi trang (page size)
  page: number;   // Trang hiện tại (bắt đầu từ 1)
  pages: number;  // Tổng số trang (tính từ total/limit)
}
export interface SearchFilters {
  query: string;      // Từ khóa tìm kiếm
  level?: string[];   // Lọc theo cấp độ (A1, A2, B1, ...)
  tags?: string[];    // Lọc theo tag (nếu có)
  sortBy?: string;    // Sắp xếp (relevance, popular, latest, ...)
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
  pagination?: Pagination;
  statusCode?: number;
}
export interface ApiError {
  message: string;
  errors?: string[];
}


