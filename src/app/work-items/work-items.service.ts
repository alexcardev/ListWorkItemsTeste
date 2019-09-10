import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkItems } from './work-items-lista/workitems';

@Injectable({
  providedIn: 'root'
})
export class WorkItemsService {
  private readonly API = 'http://localhost:3000/workitems';
  private readonly API2 = 'http://localhost:4092/api/workitems';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<WorkItems[]>(this.API2);
  }

  listaTipos() {
    return this.http.get<WorkItems[]>(this.API2);
  }
}
