import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  constructor(
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if(!tripCode) {
      alert("Something went wrong, couldn't find where I stashed the tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('Entering delete trip');
    this.tripService.deleteTrip(tripCode)
      .then(data =>{
        this.router.navigate([''])
      })
  }
}
