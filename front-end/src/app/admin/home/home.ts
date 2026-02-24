import { Component } from '@angular/core';
import { Navbar } from '../components/navbar/navbar';
import { Sidenav } from '../components/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidenav, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
