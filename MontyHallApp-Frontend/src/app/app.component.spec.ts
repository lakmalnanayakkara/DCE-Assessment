import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { AppService } from './services/app.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appServiceSpy: jasmine.SpyObj<AppService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AppService', ['simulateGames']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AppService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appServiceSpy = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a title "MontyHallApp-Frontend"', () => {
    expect(component.title).toEqual('MontyHallApp-Frontend');
  });

  it('should initialize the form with default values', () => {
    const simulationForm = component.simulationForm;
    const numSimulationsControl = simulationForm.get('numSimulations');
    const switchChoiceControl = simulationForm.get('switchChoice');

    expect(numSimulationsControl?.value).toBe(1000);
    expect(switchChoiceControl?.value).toBe(true);
  });

  it('should call appService.simulateGames when the form is valid and simulate is called', () => {
    const simulationResponse = { success: true };
    appServiceSpy.simulateGames.and.returnValue(of(simulationResponse));

    component.simulationForm.setValue({
      numSimulations: 1000,
      switchChoice: true,
    });
    component.simulate();

    expect(appServiceSpy.simulateGames).toHaveBeenCalledWith(1000, true);
    expect(component.result).toBe(simulationResponse);
  });

  it('should handle errors from appService.simulateGames', () => {
    const errorResponse = new Error('Simulation error');
    appServiceSpy.simulateGames.and.returnValue(throwError(errorResponse));

    component.simulationForm.setValue({
      numSimulations: 1000,
      switchChoice: true,
    });
    component.simulate();

    expect(appServiceSpy.simulateGames).toHaveBeenCalledWith(1000, true);
    expect(component.result).toBeNull();
  });

  it('should not call appService.simulateGames when the form is invalid', () => {
    component.simulationForm.setValue({
      numSimulations: 0,
      switchChoice: true,
    });
    component.simulate();

    expect(appServiceSpy.simulateGames).not.toHaveBeenCalled();
  });
});
