import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  constructor(private http: HttpClient) {}

  createCourse(data: any) {
    return this.http.post('http://localhost:3000/course', data);
  }
}
