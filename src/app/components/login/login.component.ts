import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {iconSvg} from '../../constants/icons-svg';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
const GOOGLE_ICON = iconSvg.google;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('googleIcon', sanitizer.bypassSecurityTrustHtml(GOOGLE_ICON));
  }

  ngOnInit(): void {
  }

  onClick() {
    this.authService.signInWithGoogle();
  }
}
