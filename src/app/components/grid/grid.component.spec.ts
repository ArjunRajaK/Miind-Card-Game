import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';
import { GameDifficultyLevel } from '../../models/results';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: GameService,
          useValue: {
            level: of('Easy'),
            result: of(null),
            updateLevel: () => {},
            invokeToggleTimer: () => {},
            toggleTimer: of(null),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle card click', () => {
    const card = {
      name: 'test',
      imgUrl: 'test.jpg',
      activeImgUrl: component.cardBackSideUrl,
      id: 1,
    };
    component.handleCardClick(card);
    expect(card.activeImgUrl).toBe('test.jpg');
  });

  it('should handle card click with winning count', () => {
    const card = {
      name: 'queen',
      imgUrl: 'queen.jpg',
      activeImgUrl: component.cardBackSideUrl,
      id: 1,
    };
    component.winningCount = 1;
    component.previuosCard = { ...card, id: 2 };
    component.handleCardClick(card);
    expect(component.matchCount).toBe(component.winningCount);
  });

  it('should handle card click without same image', () => {
    const card = {
      name: 'queen1',
      imgUrl: 'queen.jpg',
      activeImgUrl: component.cardBackSideUrl,
      id: 1,
    };
    component.previuosCard = { ...card, id: 2, name: 'queen2' };
    component.handleCardClick(card);
    expect(component.previuosCard.activeImgUrl).toBe(component.cardBackSideUrl);
  });

  it('should go to next level', () => {
    component.goToNextLevel();
    expect(component.previuosCard).toBeNull();
    expect(component.moves).toBe(0);
    expect(component.matchCount).toBe(0);
    expect(component.visible).toBeFalse();
  });
});
