import { Component, OnInit } from '@angular/core';
import {WoogieFrontRoutes} from '../../../constants/woogie-front-routes';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {

  woogieFrontRoutes = WoogieFrontRoutes;

  constructor() { }

  ngOnInit(): void {
  }

}
