import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { DummyServerService, IResult } from './dummy-server/dummy-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  results: string[] | undefined = [];
  resultFor = '';
  searchControl = new FormControl('');

  constructor(private http: DummyServerService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      switchMap(value => this.http.getSearchContent(value))
    ).subscribe(data => {
      this.results = data.result;
      this.resultFor = data.searchText;
      this.updateRecievedResults(data);
    });
  }

  private updateRecievedResults(data: IResult) {
    this.http.addCompletedSearch(data.newSearchId);
  }
}
