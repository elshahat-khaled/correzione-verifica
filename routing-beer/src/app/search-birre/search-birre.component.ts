import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BirreService } from '../birre.service';

@Component({
  selector: 'app-search-birre',
  templateUrl: './search-birre.component.html',
  styleUrls: ['./search-birre.component.css']
})
export class SearchBirreComponent implements OnInit {
  query: string | undefined;
  obsProd: Observable<Object> | undefined;
  results: any;
  constructor(public birre: BirreService) {
  }
  ngOnInit(): void {
  }
  submit(query: HTMLInputElement): void {
    if (!query.value) {
      return;
    }
    this.query = query.value;
    this.obsProd = this.birre.searchProd(this.query);
    this.obsProd.subscribe((data: any) => {
      this.results = data;
      console.log(this.results);
      localStorage.setItem('dataSource', JSON.stringify(this.results));
    });
  }
}
