import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BirreService } from '../birre.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-item-birre',
  templateUrl: './item-birre.component.html',
  styleUrls: ['./item-birre.component.css']
})
export class ItemBirreComponent implements OnInit {

  routeObs: Observable<ParamMap> | undefined;
  foodServiceObs: Observable<Object> | undefined;
  items: any;
  birreServiceObs: Observable<Object> | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private service: BirreService,
    private location: Location,
  ) { }
  ngOnInit(): void {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }
  getRouterParam = (params: ParamMap) => {
    console.log(params);
    let itemId = params.get('id'); //Ottengo l'id dai parametri
    console.log(itemId); //Stampo su console
    this.birreServiceObs = this.service.searchDet(itemId);
    this.birreServiceObs.subscribe(
      (data) => ((this.items = data), console.log(data))
    );
  };
  back(): void {
    this.location.back();
  }
}

