import {Page} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  static get parameters(){
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
    this.values = {
      'True North': 'img/values_truenorth.svg',
      'PMA': 'img/values_pma.svg',
      'Ownership': 'img/values_ownership.svg',
      'Intensity': 'img/values_intensity.svg',
      'Humility': 'img/values_humility.svg'
    }
    this.moments = [];
  }

  loadImages() {
    this.http.get('https://api.mlab.com/api/1/databases/valuepics/collections/images?s={"createdAt": -1}&apiKey=YOUR_MLAB_API_KEY').subscribe(res => {
      this.moments = res.json();
    });
  }

  valueMoment(moment) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    moment.values++;
    this.http.put(
      'https://api.mlab.com/api/1/databases/valuepics/collections/images/'+moment._id.$oid+'?apiKey=YOUR_MLAB_API_KEY',
      JSON.stringify( { "$set" : { "values" : moment.values + 1 } } ),
      { headers: headers}
    ).subscribe(res => {
        console.log(res.json());
    });
  }

  doInfinite(infiniteScroll) {
    infiniteScroll.complete();
    // console.log('Begin async operation');
    //
    // setTimeout(() => {
    //   for (var i = 0; i < 30; i++) {
    //     this.items.push( this.items.length );
    //   }
    //
    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }

  onPageWillEnter() { // THERE IT IS!!!
    this.loadImages()
  }
}
