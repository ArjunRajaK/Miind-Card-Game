import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameDifficultyLevel, IResult } from '../models/results';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly toggleTimer = new Subject<boolean>();
  private readonly result = new Subject<IResult>();
  private readonly level = new BehaviorSubject<GameDifficultyLevel>('Easy');
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

  get toggleTimer$(): Observable<boolean> {
    return this.toggleTimer.asObservable();
  }

  get result$(): Observable<IResult> {
    return this.result.asObservable();
  }

  get level$(): Observable<GameDifficultyLevel> {
    return this.level.asObservable();
  }
}
