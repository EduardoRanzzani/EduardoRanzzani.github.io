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
    this.listarTodos();
  }

  submit() {
    console.log(this.form.value)
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
    console.log(todo.description + ' Excluído');
    this.service.deleteById(todo.id).subscribe({
      next: (response) => this.listarTodos()
    });
  }

  done(todo: Todo) {
    this.service.markAsDone(todo).subscribe({
      next: (todoAtualizado) => {
        todo.done = todoAtualizado.done;
        todo.doneDate = todoAtualizado.doneDate;

        console.log(todoAtualizado)
      }
    });
  }

  update(todo: Todo) {
    console.log(todo.description + ' Atualizado');
    this.service.update(todo).subscribe({
      next: (response) => this.listarTodos()
    });
  }

}
