import { Component } from '@angular/core';
import { Navbar } from '../components/navbar/navbar';
import { Sidenav } from '../components/sidenav/sidenav';

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidenav],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
