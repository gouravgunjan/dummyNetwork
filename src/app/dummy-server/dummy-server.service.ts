import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { IResponse } from './response';

export interface IResult {
  result: string[] | undefined;
  searchText: string;
  newSearchId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DummyServerService {
  private serverCalled = new Subject<IResponse>();
  serverCalled$ = this.serverCalled.asObservable();
  private searchCompleted = new Subject<number>();
  searchCompleted$ = this.searchCompleted.asObservable();
  searchIds: number[] = [];

  private searchMap: Map<string, string[]> = new Map<string, string[]>();

  constructor() { 
    this.searchMap.set('h', [
      'h',
      'hi',
      'hello',
      'how'
    ]);
    this.searchMap.set('he', [
      'he',
      'hercules',
      'hehe',
      'heat'
    ]);
    this.searchMap.set('hel', [
      'hello',
      'hell',
      'hep',
      'helicoptor'
    ]);
    this.searchMap.set('hell', [
      'hell fire',
      'he\'ll',
      'hellstrom'
    ]);
    this.searchMap.set('hello', [
      'hello, world'
    ]);
  }

  getSearchContent(searchText: string): Observable<IResult> {
    const newSearchId = Math.random();
    const randomMill = Math.floor(Math.random() * 500 * 2) + 500;
    this.serverCalled.next({
      timeTaken: randomMill, 
      searchId: newSearchId,
      searchText
    })
    return of<IResult>({
      result: this.searchMap.get(searchText),
      searchText,
      newSearchId
    }).pipe(
      delay(randomMill)
    );
  }

  addCompletedSearch(newSearchId: number) {
    this.searchCompleted.next(newSearchId);
  }
}
