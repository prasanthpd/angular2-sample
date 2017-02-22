import { Component, OnInit } from '@angular/core';
//import { WsDataService } from '../shared/ws-data.service';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ws: $WebSocket;
  counter: string = 'not known';

  // connect

  // you can send immediately after connect, 
  // data will cached until connect open and immediately send or connect fail.

  // when connect fail, websocket will reconnect or not,
  // you can set {WebSocketConfig.reconnectIfNotNormalClose = true} to enable auto reconnect
  // all cached data will lost when connect close if not reconnect
  ngOnInit() {
    this.ws = new $WebSocket("ws://localhost:8088/counter");
    //}

    //subscribe($event) {

    //this.ws = new $WebSocket("ws://localhost:8088/counter");
    this.ws.send("Hello");
    this.ws.getDataStream().subscribe(
      res => {
        var count = JSON.parse(res.data).value;
        console.log('Got: ' + count);
        this.counter = count;
      },
      function (e) { console.log('Error: ' + e.message); },
      function () { console.log('Completed'); }
    );
  }

}
