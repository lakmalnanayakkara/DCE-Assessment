import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:5230/api/MontyHallApp/simulate';

  constructor(private http: HttpClient) {}

  simulateGames(numberOfGames: number, switchDoor: boolean): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?numberOfGames=${numberOfGames}&switchDoor=${switchDoor}`
    );
  }
}
