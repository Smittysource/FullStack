import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthenticationService } from './authentication';
import { logging } from 'selenium-webdriver';

@Injectable()
export class TripDataService {
  
  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    //console.log(formData);
    const headers = this.getHeaders();
    if(headers == null) {
      return null;
    }
    return this.httpClient
      .post(this.tripUrl, formData, {'headers': headers}) // pass form data in request body
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService.getTrip(tripCode)');
    return this.httpClient
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response as Trip)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.httpClient
      .get(`${this.tripUrl}`)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    const headers = this.getHeaders();
    if(headers == null) {
      return null;
    }
    //console.log(formData);
    return this.httpClient
      .put(this.tripUrl + formData.code, formData, {'headers': headers})
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }
  
  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService.getTrip(tripCode');
    const headers = this.getHeaders();
    if(headers == null) {
      return null;
    }
    return this.httpClient
      .delete(this.tripUrl + tripCode, {'headers': headers})
      .toPromise()
      .then(response => {response as Trip[]})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.httpClient
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private isLoggedIn(): boolean {
    var expiration = parseInt(this.storage.getItem('expiration'));
    return expiration > (Date.now() /1000);
  }

  private getHeaders(): HttpHeaders {
    if(!this.isLoggedIn()) {
      return null;
    }
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.storage.getItem('travlr-token')}`);
    return headers;
  }
}