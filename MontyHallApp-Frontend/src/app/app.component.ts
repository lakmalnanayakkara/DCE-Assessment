import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MontyHallApp-Frontend';
  result: any = null;
  simulationForm: FormGroup;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.simulationForm = this.fb.group({
      numSimulations: [1000, [Validators.required, Validators.min(1)]],
      switchChoice: [true, Validators.required],
    });
  }

  simulate(): void {
    if (this.simulationForm.valid) {
      const { numSimulations, switchChoice } = this.simulationForm.value;
      console.log(numSimulations, switchChoice);

      this.appService.simulateGames(numSimulations, switchChoice).subscribe(
        (data) => {
          this.result = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
