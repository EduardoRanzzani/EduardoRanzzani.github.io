import { Injectable } from '@angular/core';
import { Todo } from './todo'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  save(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  buscarTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  markAsDone(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}/done`;
    return this.http.patch<Todo>(url, {});
  }

  update(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.patch<Todo>(url, todo);
  }

}
