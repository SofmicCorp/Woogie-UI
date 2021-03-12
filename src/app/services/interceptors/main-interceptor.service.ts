import { Injectable } from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError, timer} from 'rxjs';
import {concatMap, delay, retryWhen, tap} from 'rxjs/operators';
import {IndicationsService} from '../indications.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';

export const retryCount = 2;
export const retryWaitMilliSeconds = 5000;

@Injectable({
  providedIn: 'root'
})
export class MainInterceptorService implements HttpInterceptor{

  constructor(private indicationsService: IndicationsService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.woogieBackUrl)) { return this.woogieBackRequest(req, next); }
  }

  private woogieBackRequest(req: HttpRequest<any>, next: HttpHandler) {
    this.indicationsService.onFetching();
    const modifiedRequest = req.clone({setHeaders: {Authorization: `${this.authService.idToken}`}
    });
    return next.handle(modifiedRequest).pipe(
      tap(
        event => {
          if (event.type === HttpEventType.Response) {this.indicationsService.onStopFetching();}
        }),
      retryWhen(e =>
        e.pipe(
          concatMap((error, count) => {
            if (count <= retryCount && error.status === 0) {
              return timer(retryWaitMilliSeconds);
            }
            this.indicationsService.onStopFetching();
            return throwError(error);
          }),
          delay(retryWaitMilliSeconds)
        )
      )
    );
  }
}
