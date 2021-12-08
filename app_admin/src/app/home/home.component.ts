import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    if(this.isLoggedIn()) {
      this.router.navigateByUrl('list-trips');
    }
  }

}
