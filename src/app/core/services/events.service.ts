import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class EventsService {

  private enviarMensajeSubject = new Subject<any>();
  enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

  enviarMensaje() {
    this.enviarMensajeSubject.next();
  }
}
