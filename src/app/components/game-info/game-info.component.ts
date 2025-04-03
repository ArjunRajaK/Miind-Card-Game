import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  interval,
  lastValueFrom,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { TimePipe } from '../../pipes/time.pipe';
import { GameService } from '../../services/game.service';
import { GameDifficultyLevel } from '../../models/results';

@Component({
  selector: 'app-game-info',
  imports: [TimePipe],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent implements OnInit, OnDestroy {
  level!: GameDifficultyLevel;
  seconds = 0;
  minutes = 0;
  timer$!: Subscription;
  onDestroy$ = new Subject<void>();

  gameService = inject(GameService);

  ngOnInit(): void {
    this.subscribeToTimer();
    this.subscribeToToggleTimer();
    this.subscribeToLevel();
  }

  private subscribeToTimer(): void {
    this.timer$ = interval(1000).subscribe(() => {
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        return;
      }
      this.seconds++;
    });
  }

  private subscribeToLevel(): void {
    this.gameService.level$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((level) => (this.level = level));
  }

  private subscribeToToggleTimer(): void {
    this.gameService.toggleTimer$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(
        tap((t) => {
          if (!t) return;
          this.gameService.updateResult({
            minutesTaken: this.minutes,
            secondsTaken: this.seconds,
          });
          this.stopTime();
        })
      )
      .pipe(filter((f) => !f))
      .subscribe(() => this.subscribeToTimer());
  }

  stopTime(): void {
    this.timer$.unsubscribe();
    this.seconds = 0;
    this.minutes = 0;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
