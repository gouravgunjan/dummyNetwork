export interface IResponse {
    timeTaken: number;
    searchText: string
    searchId: number;
}

// pipe(
//     switchMap(value => this.http.getSearchContent(value))
//   ).subscribe(data => {
//       this.results = data.result;
//       this.resultFor = data.searchText;
//       this.updateRecievedResults(data);
//   });