import { ICard } from '../models/card';

export function shuffleCards(cards: ICard[]): ICard[] {
  const shuffled = [...cards];
  for (let i = 0; i < shuffled.length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}
