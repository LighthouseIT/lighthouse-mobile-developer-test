import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormTaskPage } from '../form-task/form-task';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private tasks: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public af: AngularFire) {
  	this.tasks = af.database.list('tasks');
  }

  goFormTask(task) {
  	this.navCtrl.push(FormTaskPage, task);
  }

  changeCompleted(task) {
  	task.completed = !task.completed;
  	this.tasks.update(task.$key, task)
  	.then(_ => {
  		console.log("editado");
  	})
  	
  }

}
