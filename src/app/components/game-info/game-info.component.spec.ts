import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameInfoComponent } from './game-info.component';
import { GameService } from '../../services/game.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { GameDifficultyLevel } from '../../models/results';

describe('GameInfoComponent', () => {
  let component: GameInfoComponent;
  let fixture: ComponentFixture<GameInfoComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: GameService,
          useValue: {
            level: of('Easy'),
            toggleTimer: of(false),
            updateResult: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to subscribeToTimer', () => {
    spyOn<any>(component, 'subscribeToToggleTimer').and.callThrough();
    component['subscribeToToggleTimer']();
    expect(component['subscribeToToggleTimer']).toHaveBeenCalled();
    setTimeout(() => expect(component.seconds).toBeGreaterThan(0), 2000);
  });

  it('should stop time when toggleTimer emits true', () => {
    spyOn(component.gameService, 'updateResult').and.callThrough();
    spyOn(component, 'stopTime').and.callThrough();
    gameService.toggleTimer = new Subject<boolean>();
    component['subscribeToToggleTimer']();
    gameService.toggleTimer.next(true);
    expect(gameService.updateResult).toHaveBeenCalledWith({
      minutesTaken: component.minutes,
      secondsTaken: component.seconds,
    });
    expect(component.stopTime).toHaveBeenCalled();
  });

  it('should update level', () => {
    component['subscribeToLevel']();
    gameService.level = new BehaviorSubject<GameDifficultyLevel>('Easy');
    gameService.level.next('Easy');
    expect(component.level).toBe('Easy');
  });
});
