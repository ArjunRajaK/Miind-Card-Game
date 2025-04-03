import { ICard } from '../models/card';
import { GameDifficultyLevel } from '../models/results';

export function shuffleCards(cards: ICard[]): ICard[] {
  const shuffled = structuredClone(cards);
  for (let i = 0; i < shuffled.length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

export function getNextLevel(
  currentLevel: GameDifficultyLevel
): GameDifficultyLevel {
  if (currentLevel === 'Easy') return 'Medium';
  if (currentLevel === 'Medium') return 'Hard';
  return 'Easy';
}
