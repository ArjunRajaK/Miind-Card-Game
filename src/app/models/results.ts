export interface IResult {
  minutesTaken: number;
  secondsTaken: number;
}

export type GameDifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export const WINNING_COUNT_MAPPER: Record<GameDifficultyLevel, number> = {
  Easy: 4,
  Medium: 6,
  Hard: 8,
};
