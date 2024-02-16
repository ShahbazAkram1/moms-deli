import { Component } from '@angular/core';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent {
  trackingId="";
  showDetail : boolean = false;
  public searchTrackingID(){
    if(this.trackingId == "123"){
      this.showDetail = true;
    }else{
      this.showDetail=false;
    }
  }
}
