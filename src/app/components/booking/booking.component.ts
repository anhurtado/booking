import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingModel } from 'src/app/models/booking.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public email: string;
  public adminemail: string;
  public token: string;
  public bookingList: BookingModel[] = [];

  constructor(
    private appService: AppService,
    private router: Router) {}

  ngOnInit(): void {
    this.email = 'contacto@tuten.cl';
    this.adminemail = 'testapis@tuten.cl';
    this.token = localStorage.getItem('sessionTokenBck');
    this.fetchBooking();
  }

  public fetchBooking(): void {
    this.appService.getBooking(this.email, this.adminemail, this.token).subscribe((resp: any) => {
      this.bookingList = [];
      resp.map((e: any) => {
        this.bookingList.push({
          bookingId: e.bookingId,
          firstName: e.tutenUserClient.firstName,
          lastName: e.tutenUserClient.lastName,
          bookingTime: e.bookingTime,
          streetAddress: e.tutenUserProfessional.streetAddress,
          bookingPrice: e.bookingPrice
        });
      });
    }, (err) => console.log(err));
  }

  public logout(): void {
    localStorage.removeItem('sessionTokenBck');
    this.router.navigate(['/login']);
  }
}
