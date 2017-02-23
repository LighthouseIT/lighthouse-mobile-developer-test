import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-form-task',
  templateUrl: 'form-task.html'
})
export class FormTaskPage {

	private task;
	private tasks: FirebaseListObservable<any[]>;
	public today = new Date(); // utilizado no HTML para anos min e max

  constructor(public navCtrl: NavController, public params: NavParams,
  	public af: AngularFire, public alertCtrl: AlertController) {

  	if(params.data && params.data.$key) {

  		let d = new Date(params.data.date);

  		this.task = {
  			_id: params.data.$key,
  			title: params.data.title,
  			description: params.data.description,
  			date: `${d.getFullYear()}-${this.addZero(d.getMonth() + 1)}-${this.addZero(d.getDate())}`,
  			time: `${this.addZero(d.getHours())}:${this.addZero(d.getMinutes())}`,
  			completed: params.data.completed
  		}
  	}else {
  		this.task = {};
  	}

  	this.tasks = af.database.list('tasks');
  }

  addZero(n) {
  	return n < 10? '0' + n: n;
  }

  // volta para lista de taferas
	goHome() {
  	this.navCtrl.pop();
  }

  removeTask() {

  	let confirm = this.alertCtrl.create({
  		title: 'Remover esta tarefa?',
  		message: 'Ao confirmar esta mensagem, você não poderá recuperar a tarefa.',
  		buttons: [{
  			text: 'Concelar'
  		}, {
  			text: 'Remover',
  			handler: () => {
  				this.tasks.remove(this.task._id)
			  	.then(_ => {
			  		this.goHome();
			  	})
  			}
  		}]
  	})

  	confirm.present();
  }

  saveOrUpdateTask() {

  	let task = {};

  	try {
  		let date = this.task.date.split('-');
  		let time = this.task.time.split(':');

	  	task = {
	  		title: this.task.title || '',
	  		description : this.task.description || '',
	  		date: new Date(date[0], date[1] - 1, date[2], time[0], time[1], 0).toISOString(),
	  		completed: this.task.completed || false,
	  		created_at: new Date().toISOString()
	  	}
	  }catch(e) {
	  	let alert = this.alertCtrl.create({
	  		title: 'Preêncha os campos',
	  		subTitle: 'Data e hora da tarefa são obrigatórios!',
	  		buttons: ['Certo']
	  	})
	  	return alert.present();
	  }

  	if(!this.task._id) {
  		// nova tarefa
	  	this.tasks.push(task)
	  	.then(_ => {
	  		this.goHome();
	  	})
	  }else {
	  	// edita tarefa
	  	this.tasks.update(this.task._id, task)
	  	.then(_ => {
	  		this.goHome();
	  	})
	  }
  	
  }
}
