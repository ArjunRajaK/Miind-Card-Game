import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GRID_DATA, CARD_BACK_SIDE_URL } from '../../constants/grid.data';
import { ICard } from '../../models/card';
import { CommonModule } from '@angular/common';
import { getNextLevel, shuffleCards } from '../../util/common';
import { CardModule } from 'primeng/card';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GameService } from '../../services/game.service';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  GameDifficultyLevel,
  IResult,
  WINNING_COUNT_MAPPER,
} from '../../models/results';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-grid',
  imports: [
    CommonModule,
    CardModule,
    GameInfoComponent,
    DialogModule,
    ButtonModule,
    FieldsetModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit, OnDestroy {
  gridData!: ICard[];
  cardBackSideUrl = CARD_BACK_SIDE_URL;
  previuosCard!: ICard | null;
  moves: number = 0;
  matchCount = 0;
  winningCount = 0;
  visible = false;
  result!: IResult;
  currentLevel!: GameDifficultyLevel;

  gameService = inject(GameService);

  onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.gridData = shuffleCards(GRID_DATA);
    this.subscribeToLevel();
    this.subscribeToResult();
  }

  private subscribeToResult(): void {
    this.gameService.result$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(filter((r) => !!r))
      .subscribe((result) => {
        this.result = result;
        this.visible = true;
        this.gridData = shuffleCards(GRID_DATA);
      });
  }

  private subscribeToLevel(): void {
    this.gameService.level$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(filter((r) => !!r))
      .subscribe((level) => {
        this.currentLevel = level;
        this.winningCount = WINNING_COUNT_MAPPER[level];
      });
  }

  handleCardClick(data: ICard): void {
    if (data.activeImgUrl !== this.cardBackSideUrl) return;
    data.activeImgUrl = data.imgUrl;
    this.moves++;
    if (!this.previuosCard) {
      this.previuosCard = data;
      return;
    }
    if (this.previuosCard.name === data.name) {
      this.matchCount++;
      this.previuosCard = null;
      if (this.matchCount === this.winningCount) {
        this.gameService.invokeToggleTimer(true);
      }
      return;
    }
    setTimeout(() => {
      if (this.previuosCard)
        this.previuosCard.activeImgUrl = this.cardBackSideUrl;
      data.activeImgUrl = this.cardBackSideUrl;
      this.previuosCard = null;
    }, 1000);
  }

  goToNextLevel(): void {
    this.previuosCard = null;
    this.moves = 0;
    this.matchCount = 0;
    this.visible = false;
    const nextLevel = getNextLevel(this.currentLevel);
    this.gameService.updateLevel(nextLevel);
    this.gameService.invokeToggleTimer(false);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
