import {Component, OnInit} from '@angular/core';
import {IndicationsService} from '../../../services/indications.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css']
})
export class HeaderContentComponent implements OnInit {

  isFetching: boolean;

  constructor(public indicationsService: IndicationsService, private router: Router) { }

  ngOnInit(): void {
    this.indicationsService.isFetchingBehaviorSubject.subscribe(isFetching => {
      if (isFetching != null){
        this.isFetching = isFetching;
      }
    });
  }

  onHomeClick() {
    this.router.navigate(['/']);
  }
}
