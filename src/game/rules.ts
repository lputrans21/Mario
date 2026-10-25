/**
 * Pure Game Rules & Educational Quiz Data for "Petualangan Bintang Teater"
 */

export interface QuizQuestion {
  id: string;
  level: number;
  category: 'intrinsik' | 'ekstrinsik' | 'pementasan';
  categoryLabel: string;
  question: string;
  options: [string, string, string];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Unsur Intrinsik Naskah Drama
  {
    id: 'l1_q1',
    level: 1,
    category: 'intrinsik',
    categoryLabel: 'Unsur Intrinsik Drama',
    question: 'Pesan moral atau pelajaran hidup yang ingin disampaikan pengarang melalui pementasan drama disebut...',
    options: ['Amanat', 'Latar', 'Alur'],
    correctIndex: 0,
    explanation: 'Amanat adalah pesan moral atau nilai keteladanan yang disampaikan pengarang kepada pembaca atau penonton.',
  },
  {
    id: 'l1_q2',
    level: 1,
    category: 'intrinsik',
    categoryLabel: 'Unsur Intrinsik Drama',
    question: 'Karakter atau tokoh dalam naskah drama yang bertindak menentang tokoh utama (protagonis) dinamakan...',
    options: ['Tritagonis', 'Antagonis', 'Figuran'],
    correctIndex: 1,
    explanation: 'Tokoh antagonis adalah karakter yang memicu konflik dan menentang cita-cita/keinginan tokoh utama (protagonis).',
  },
  {
    id: 'l1_q3',
    level: 1,
    category: 'intrinsik',
    categoryLabel: 'Unsur Intrinsik Drama',
    question: 'Rangkaian peristiwa berurutan yang saling berhubungan sebab-akibat membentuk jalannya cerita drama disebut...',
    options: ['Tema', 'Latar', 'Alur / Plot'],
    correctIndex: 2,
    explanation: 'Alur (plot) adalah jalinan peristiwa dari pengenalan, pertikaian, klimaks, hingga penyelesaian naskah drama.',
  },

  // LEVEL 2: Unsur Ekstrinsik Naskah Drama
  {
    id: 'l2_q1',
    level: 2,
    category: 'ekstrinsik',
    categoryLabel: 'Unsur Ekstrinsik Drama',
    question: 'Kondisi sosial, psikologis, dan pengalaman hidup penulis yang memengaruhi isi naskah drama tergolong dalam...',
    options: ['Latar Belakang Pengarang', 'Tata Panggung', 'Dialog Tokoh'],
    correctIndex: 0,
    explanation: 'Latar belakang pengarang mencakup riwayat hidup, status sosial, dan pandangan hidup penulis naskah.',
  },
  {
    id: 'l2_q2',
    level: 2,
    category: 'ekstrinsik',
    categoryLabel: 'Unsur Ekstrinsik Drama',
    question: 'Ajaran tentang baik dan buruknya tingkah laku budi pekerti yang terkandung dalam drama disebut nilai...',
    options: ['Nilai Budaya', 'Nilai Moral', 'Nilai Estetika'],
    correctIndex: 1,
    explanation: 'Nilai moral berkaitan dengan akhlak, etika, dan budi pekerti yang menjadi pedoman perilaku manusia.',
  },
  {
    id: 'l2_q3',
    level: 2,
    category: 'ekstrinsik',
    categoryLabel: 'Unsur Ekstrinsik Drama',
    question: 'Kebiasaan, tradisi, dan adat istiadat masyarakat yang tercermin dalam peristiwa drama merupakan perwujudan nilai...',
    options: ['Nilai Agama', 'Nilai Politik', 'Nilai Budaya'],
    correctIndex: 2,
    explanation: 'Nilai budaya memuat norma, adat, kebiasaan hidup, dan warisan tradisi suatu masyarakat dalam naskah.',
  },

  // LEVEL 3: Unsur Pembangun Pementasan Teater
  {
    id: 'l3_q1',
    level: 3,
    category: 'pementasan',
    categoryLabel: 'Unsur Pementasan Teater',
    question: 'Siapakah yang bertanggung jawab memimpin jalannya latihan dan merancang konsep pementasan drama?',
    options: ['Penonton', 'Sutradara', 'Tata Rias'],
    correctIndex: 1,
    explanation: 'Sutradara adalah pemimpin utama pementasan yang menafsirkan naskah, melatih aktor, dan menyatukan semua unsur artistik.',
  },
  {
    id: 'l3_q2',
    level: 3,
    category: 'pementasan',
    categoryLabel: 'Unsur Pementasan Teater',
    question: 'Elemen pementasan yang mengatur pencahayaan di atas panggung untuk menciptakan suasana adalah...',
    options: ['Tata Busana', 'Tata Lampu / Lighting', 'Tata Suara'],
    correctIndex: 1,
    explanation: 'Tata lampu (lighting) bertugas menerangi panggung dan menciptakan efek atmosfer emosional/dramatis pada adegan.',
  },
  {
    id: 'l3_q3',
    level: 3,
    category: 'pementasan',
    categoryLabel: 'Unsur Pementasan Teater',
    question: 'Penataan dekorasi pentas yang menggambarkan latar tempat, waktu, dan suasana pementasan drama dinamakan...',
    options: ['Tata Panggung / Scenery', 'Tata Rias / Makeup', 'Katalog Teater'],
    correctIndex: 0,
    explanation: 'Tata panggung (scenery) meliputi backdrop, properti, dan dekorasi yang memvisualisasikan latar cerita.',
  },
];

export interface GameState {
  level: number;
  lives: number;
  score: number;
  coins: number;
  answeredQuestions: string[];
  correctAnswersCount: number;
  isGameOver: boolean;
  isVictory: boolean;
  powerUpMaskActive: boolean;
  powerUpTimer: number;
}

export const INITIAL_LIVES = 3;
export const MAX_LEVEL = 3;
export const SCORE_CORRECT_QUIZ = 100;
export const SCORE_COIN = 10;
export const SCORE_ENEMY = 50;

export function createInitialState(startingLevel = 1): GameState {
  return {
    level: startingLevel,
    lives: INITIAL_LIVES,
    score: 0,
    coins: 0,
    answeredQuestions: [],
    correctAnswersCount: 0,
    isGameOver: false,
    isVictory: false,
    powerUpMaskActive: false,
    powerUpTimer: 0,
  };
}

export function handleQuizAnswer(
  state: GameState,
  question: QuizQuestion,
  chosenIndex: number
): {
  nextState: GameState;
  isCorrect: boolean;
  feedback: string;
} {
  const isCorrect = chosenIndex === question.correctIndex;
  const nextAnswered = state.answeredQuestions.includes(question.id)
    ? state.answeredQuestions
    : [...state.answeredQuestions, question.id];

  if (isCorrect) {
    const nextState: GameState = {
      ...state,
      score: state.score + SCORE_CORRECT_QUIZ,
      correctAnswersCount: state.correctAnswersCount + 1,
      answeredQuestions: nextAnswered,
      powerUpMaskActive: true,
      powerUpTimer: 5, // 5 seconds of glowing invulnerability
    };
    return {
      nextState,
      isCorrect: true,
      feedback: 'Hebat! Jawabanmu benar! Kamu memperoleh +100 Skor & Topeng Teater Pelindung.',
    };
  } else {
    const nextLives = Math.max(0, state.lives - 1);
    const isGameOver = nextLives <= 0;
    const nextState: GameState = {
      ...state,
      lives: nextLives,
      answeredQuestions: nextAnswered,
      isGameOver,
    };
    return {
      nextState,
      isCorrect: false,
      feedback: `Kurang tepat. Jawaban benar: "${question.options[question.correctIndex]}". ${question.explanation}`,
    };
  }
}

export function handleCollectCoin(state: GameState): GameState {
  return {
    ...state,
    score: state.score + SCORE_COIN,
    coins: state.coins + 1,
  };
}

export function handleDefeatEnemy(state: GameState): GameState {
  return {
    ...state,
    score: state.score + SCORE_ENEMY,
  };
}

export function handleTakePlayerDamage(state: GameState): GameState {
  if (state.powerUpMaskActive) {
    // Shield protects player
    return state;
  }
  const nextLives = Math.max(0, state.lives - 1);
  return {
    ...state,
    lives: nextLives,
    isGameOver: nextLives <= 0,
  };
}

export function handleAdvanceLevel(state: GameState): GameState {
  if (state.level >= MAX_LEVEL) {
    return {
      ...state,
      isVictory: true,
    };
  }
  return {
    ...state,
    level: state.level + 1,
  };
}

export function calculateStarRating(correctCount: number, totalQuestions = 9): number {
  if (correctCount >= 8) return 3;
  if (correctCount >= 5) return 2;
  return 1;
}

export const KELAS_OPTIONS = ['12 M1', '12 M2', '12 M3', '12 M4', '12 M5'] as const;
export type KelasType = typeof KELAS_OPTIONS[number];

export interface LeaderboardEntry {
  id: string;
  name: string;
  kelas: KelasType;
  score: number;
  timeSeconds: number;
  formattedTime: string;
  correctAnswersCount: number;
  stars: number;
  date: string;
}

export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    // 1. Highest score first
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 2. Fastest time first (lower seconds is better)
    return a.timeSeconds - b.timeSeconds;
  });
}

export function filterLeaderboardByClass(entries: LeaderboardEntry[], kelas?: string): LeaderboardEntry[] {
  if (!kelas || kelas === 'Semua') {
    return sortLeaderboard(entries);
  }
  return sortLeaderboard(entries.filter(e => e.kelas === kelas));
}

export function generateSpreadsheetCSV(entries: LeaderboardEntry[]): string {
  const sorted = sortLeaderboard(entries);
  const headers = ['Peringkat', 'Nama Siswa', 'Kelas', 'Skor Akhir', 'Waktu (MM:SS)', 'Total Detik', 'Kuis Benar', 'Bintang', 'Waktu Pengiriman'];
  const rows = sorted.map((entry, idx) => [
    idx + 1,
    `"${entry.name.replace(/"/g, '""')}"`,
    `"${entry.kelas}"`,
    entry.score,
    `"${entry.formattedTime}"`,
    entry.timeSeconds,
    entry.correctAnswersCount,
    entry.stars,
    `"${entry.date}"`
  ].join(','));
  return [headers.join(','), ...rows].join('\n');
}
