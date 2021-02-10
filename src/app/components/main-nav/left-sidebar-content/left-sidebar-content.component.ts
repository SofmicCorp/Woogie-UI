import { Component, OnInit } from '@angular/core';
import {WoogieFrontRoutes} from '../../../constants/woogie-front-routes';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './left-sidebar-content.component.html',
  styleUrls: ['./left-sidebar-content.component.css']
})
export class LeftSidebarContentComponent implements OnInit {

  woogieFrontRoutes = WoogieFrontRoutes;

  constructor() { }

  ngOnInit(): void {
  }

}
