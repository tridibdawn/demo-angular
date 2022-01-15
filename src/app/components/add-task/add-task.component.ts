import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onTaskSubmit: EventEmitter<Task> = new EventEmitter();

  task: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.task) {
      alert('Please add a task');
      return;
    } else if (!this.day) {
      alert('Please add day & time');
      return;
    }

    const newTask = {
      text: this.task,
      day: this.day,
      reminder: this.reminder,
    };

    this.onTaskSubmit.emit(newTask);

    this.task = '';
    this.day = '';
    this.reminder = false;
  }
}
