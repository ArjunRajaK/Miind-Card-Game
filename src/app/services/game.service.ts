import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GameDifficultyLevel, IResult } from '../models/results';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  toggleTimer = new Subject<boolean>();
  result = new Subject<IResult>();
  level = new BehaviorSubject<GameDifficultyLevel>('Easy');
  constructor() {}

  invokeToggleTimer(value: boolean): void {
    this.toggleTimer.next(value);
  }

  updateResult(result: IResult): void {
    this.result.next(result);
  }

  updateLevel(level: GameDifficultyLevel): void {
    this.level.next(level);
  }
}
