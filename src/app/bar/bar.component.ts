import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DummyServerService } from '../dummy-server/dummy-server.service';
import { IResponse } from '../dummy-server/response';

interface ITimeBar {
  color: string;
  startPx: number;
  length: number;
  timeTaken: number;
  grayTxt: string;
  timeStamp: Date;
  searchId: number;
}

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  timeBars: ITimeBar[] = []; 
  private totalWidth = 600;

  constructor(private server: DummyServerService) { }

  ngOnInit(): void {
    setInterval(() => {
      const container = document.getElementById('network-container');
      this.totalWidth = container ? container?.clientWidth : 600;
    }, 1000);
    this.server.serverCalled$.subscribe(data => {
      this.calculateBar(data);
    });
    this.server.searchCompleted$.subscribe(searchId => {
      this.timeBars.find(item => item.searchId === searchId)!.color = 'green';
    });
  }

  private calculateBar(newResponse: IResponse) {
    let totalTime = 0;
    this.timeBars.forEach(bar => totalTime += bar.timeTaken);
    totalTime += newResponse.timeTaken;
    let start = 0;
    this.timeBars.forEach(bar => {
      const length = ( bar.timeTaken / totalTime ) * this.totalWidth;
      bar.startPx = start;
      bar.length = length;
      start += length;
    });
    const newBar: ITimeBar = {
      color: 'red',
      length: ( newResponse.timeTaken / totalTime ) * this.totalWidth,
      startPx: start,
      grayTxt: `'${newResponse.searchText}' ${this.timeBars[0] ? new Date().getTime() - this.timeBars[0].timeStamp.getTime() : 0}`,
      timeTaken: newResponse.timeTaken,
      timeStamp: new Date(),
      searchId: newResponse.searchId
    };
    this.timeBars.push(newBar);
  }

}
