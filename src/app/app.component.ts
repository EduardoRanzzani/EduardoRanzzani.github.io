import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Todo } from './todo';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = []
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private service: TodoService) {

  }
  ngOnInit(): void {
    console.log('Nothing to see here')
    this.listarTodos();
  }

  submit() {
    const todo: Todo = { ...this.form.value }
    this.service
      .save(todo)
      .subscribe(savedTodo => {
        this.todos.push(savedTodo)
        this.form.reset()
      })
  }

  listarTodos() {
    this.service.buscarTodos().subscribe(savedTodos => this.todos = savedTodos);
  }

  delete(todo: Todo) {
    this.service.deleteById(todo.id).subscribe({
      next: (response) => this.listarTodos()
    });
  }

  done(todo: Todo) {
    this.service.markAsDone(todo).subscribe({
      next: (todoAtualizado) => {
        todo.done = todoAtualizado.done;
        todo.doneDate = todoAtualizado.doneDate;
      }
    });
  }

  update(todo: Todo) {
    this.service.update(todo).subscribe({
      next: (response) => this.listarTodos()
    });
  }

}
