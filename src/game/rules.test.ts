import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialState,
  handleQuizAnswer,
  handleCollectCoin,
  handleDefeatEnemy,
  handleTakePlayerDamage,
  handleAdvanceLevel,
  calculateStarRating,
  formatTime,
  sortLeaderboard,
  filterLeaderboardByClass,
  generateSpreadsheetCSV,
  QUIZ_QUESTIONS,
  SCORE_CORRECT_QUIZ,
  SCORE_COIN,
  SCORE_ENEMY,
} from './rules.ts';

test('createInitialState initializes lives, score, and default values', () => {
  const state = createInitialState(1);
  assert.equal(state.level, 1);
  assert.equal(state.lives, 3);
  assert.equal(state.score, 0);
  assert.equal(state.coins, 0);
  assert.equal(state.isGameOver, false);
  assert.equal(state.isVictory, false);
});

test('handleQuizAnswer rewards score and power-up for correct answer', () => {
  const state = createInitialState();
  const q1 = QUIZ_QUESTIONS[0]; // correctIndex is 0
  const result = handleQuizAnswer(state, q1, 0);

  assert.equal(result.isCorrect, true);
  assert.equal(result.nextState.score, SCORE_CORRECT_QUIZ);
  assert.equal(result.nextState.correctAnswersCount, 1);
  assert.equal(result.nextState.powerUpMaskActive, true);
  assert.equal(result.nextState.lives, 3);
});

test('handleQuizAnswer decrements life and provides educational explanation for wrong answer', () => {
  const state = createInitialState();
  const q1 = QUIZ_QUESTIONS[0]; // correctIndex is 0
  const result = handleQuizAnswer(state, q1, 1); // wrong answer: 1

  assert.equal(result.isCorrect, false);
  assert.equal(result.nextState.score, 0);
  assert.equal(result.nextState.lives, 2);
  assert.match(result.feedback, /Amanat/);
});

test('handleQuizAnswer triggers game over when lives reach 0', () => {
  let state = createInitialState();
  state.lives = 1;
  const q1 = QUIZ_QUESTIONS[0];
  const result = handleQuizAnswer(state, q1, 2); // wrong answer

  assert.equal(result.nextState.lives, 0);
  assert.equal(result.nextState.isGameOver, true);
});

test('handleCollectCoin increments coin and score', () => {
  const state = createInitialState();
  const next = handleCollectCoin(state);
  assert.equal(next.coins, 1);
  assert.equal(next.score, SCORE_COIN);
});

test('handleDefeatEnemy adds score', () => {
  const state = createInitialState();
  const next = handleDefeatEnemy(state);
  assert.equal(next.score, SCORE_ENEMY);
});

test('handleTakePlayerDamage decreases life if unprotected, respects mask power-up', () => {
  const state = createInitialState();
  const hurtState = handleTakePlayerDamage(state);
  assert.equal(hurtState.lives, 2);

  // If power up is active, damage is prevented
  const shieldedState = { ...state, powerUpMaskActive: true };
  const safeState = handleTakePlayerDamage(shieldedState);
  assert.equal(safeState.lives, 3);
});

test('handleAdvanceLevel advances from level 1 to 2, 2 to 3, and triggers victory after level 3', () => {
  let state = createInitialState(1);
  state = handleAdvanceLevel(state);
  assert.equal(state.level, 2);
  assert.equal(state.isVictory, false);

  state = handleAdvanceLevel(state);
  assert.equal(state.level, 3);
  assert.equal(state.isVictory, false);

  state = handleAdvanceLevel(state);
  assert.equal(state.isVictory, true);
});

test('calculateStarRating awards stars based on correct answer ratio', () => {
  assert.equal(calculateStarRating(9), 3);
  assert.equal(calculateStarRating(8), 3);
  assert.equal(calculateStarRating(5), 2);
  assert.equal(calculateStarRating(2), 1);
});

test('formatTime formats seconds into MM:SS correctly', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(125), '02:05');
});

test('sortLeaderboard prioritizes higher score, then faster time', () => {
  const sampleEntries: any[] = [
    { id: '1', name: 'Budi', kelas: '12 M1', score: 300, timeSeconds: 120 },
    { id: '2', name: 'Siti', kelas: '12 M2', score: 500, timeSeconds: 90 },
    { id: '3', name: 'Ahmad', kelas: '12 M1', score: 500, timeSeconds: 75 }, // Same score as Siti, but faster!
    { id: '4', name: 'Dewi', kelas: '12 M3', score: 200, timeSeconds: 60 },
  ];

  const sorted = sortLeaderboard(sampleEntries);
  assert.equal(sorted[0].name, 'Ahmad'); // 500 score, 75s (Fastest among highest score)
  assert.equal(sorted[1].name, 'Siti');  // 500 score, 90s
  assert.equal(sorted[2].name, 'Budi');  // 300 score
  assert.equal(sorted[3].name, 'Dewi');  // 200 score
});

test('filterLeaderboardByClass filters correctly by kelas', () => {
  const sampleEntries: any[] = [
    { id: '1', name: 'Budi', kelas: '12 M1', score: 300, timeSeconds: 120 },
    { id: '2', name: 'Siti', kelas: '12 M2', score: 500, timeSeconds: 90 },
    { id: '3', name: 'Ahmad', kelas: '12 M1', score: 400, timeSeconds: 75 },
  ];

  const filtered = filterLeaderboardByClass(sampleEntries, '12 M1');
  assert.equal(filtered.length, 2);
  assert.equal(filtered[0].name, 'Ahmad');
  assert.equal(filtered[1].name, 'Budi');
});

test('generateSpreadsheetCSV generates valid CSV text with headers', () => {
  const sampleEntries: any[] = [
    { id: '1', name: 'Budi', kelas: '12 M1', score: 300, timeSeconds: 120, formattedTime: '02:00', correctAnswersCount: 3, stars: 2, date: '2026-10-25' },
  ];
  const csv = generateSpreadsheetCSV(sampleEntries);
  assert.match(csv, /Peringkat,Nama Siswa,Kelas,Skor Akhir/);
  assert.match(csv, /"Budi","12 M1",300,"02:00",120,3,2,"2026-10-25"/);
});
