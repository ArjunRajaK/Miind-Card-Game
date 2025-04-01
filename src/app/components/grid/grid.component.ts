import { Component, OnInit } from '@angular/core';
import { GRID_DATA, CARD_BACK_SIDE_URL } from '../../constants/grid.data';
import { ICard } from '../../models/card';
import { CommonModule } from '@angular/common';
import { shuffleCards } from '../../util/grid';
import { CardModule } from 'primeng/card';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-grid',
  imports: [CommonModule, CardModule, GameInfoComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
  gridData!: ICard[];
  cardBackSideUrl = CARD_BACK_SIDE_URL;

  ngOnInit(): void {
    this.gridData = shuffleCards(GRID_DATA);
  }

  handleCardClick(data: ICard): void {
    data.activeImgUrl = data.imgUrl;
  }
}
