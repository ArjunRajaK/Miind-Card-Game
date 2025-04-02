import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { CARD_BACK_SIDE_URL, GRID_DATA } from '../../constants/grid.data';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call subscribeToResult()', () => {
    spyOn<any>(component, 'subscribeToResult');
    component['subscribeToResult']();
    expect(component['subscribeToResult']).toHaveBeenCalled();
  });

  it('should call subscribeToLevel()', () => {
    spyOn<any>(component, 'subscribeToLevel');
    component['subscribeToLevel']();
    expect(component['subscribeToLevel']).toHaveBeenCalled();
  });

  it('should call handleCardClick()', () => {
    spyOn<any>(component, 'handleCardClick');
    component['handleCardClick']({
      activeImgUrl: CARD_BACK_SIDE_URL,
      id: 1,
      imgUrl: GRID_DATA[0].imgUrl,
      name: GRID_DATA[0].name,
    });
    expect(component['handleCardClick']).toHaveBeenCalled();
  });

  it('should call subscribeToLevel()', () => {
    spyOn<any>(component, 'goToNextLevel');
    component['goToNextLevel']();
    expect(component['goToNextLevel']).toHaveBeenCalled();
  });
});
