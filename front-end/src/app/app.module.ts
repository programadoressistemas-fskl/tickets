import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';

@NgModule({
	declarations: [

	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(AppRoutes),
		FormsModule,
		ReactiveFormsModule
	],
	exports: [RouterModule]
})
export class AppModule { }
