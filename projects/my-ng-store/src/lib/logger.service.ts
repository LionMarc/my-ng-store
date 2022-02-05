import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public information(message: string, ...params: any[]): void {
    if (params.length > 0) {
      console.log(message, params);
    } else {
      console.log(message)
    }
  }

  public debug(message: string, ...params: any[]): void {
    if (params.length > 0) {
      console.debug(message, params);
    } else {
      console.debug(message)
    }
  }
}
