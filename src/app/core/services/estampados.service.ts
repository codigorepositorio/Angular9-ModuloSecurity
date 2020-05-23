import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { Estampado } from "../../core/models/estampado.model";
import { environment } from "./../../../environments/environment";
import {
  Estampado,
  EstampadoEliminar,
  RolloModificar,
  EliminarListaRollo
} from "../models/estampado.model";

@Injectable({
  providedIn: "root"
})
export class EstampadosService {
  constructor(private http: HttpClient) {}

  getEstampados(cod_Ordtra: string, fechin: string, fechfin: string) {
    return this.http.get<Estampado[]>(
      `${environment.url_api}CabeceraRegistroProduccion/listar/${cod_Ordtra}/${fechin}/${fechfin}`
    );
  }

  registroEstampado(estampado: Estampado) {
    return this.http.post(
      `${environment.url_api}CabeceraRegistroProduccion/crear`,
      estampado
    );
  }
  buscarOrdtra(cod_Ordtra: string) {
    return this.http.get<Estampado[]>(
      `${environment.url_api}PartidasFullCobertura/listar/${cod_Ordtra}`
    );
  }

  muestraMaquina(idProceso:number) {
    return this.http.get<Estampado[]>(
      `${environment.url_api}MaquinaEstampado/ListarMaquinaPorProceso/${idProceso}`
    );
  }
  muestraProceso() {
    return this.http.get<Estampado[]>(
      
      `${environment.url_api}MaquinaEstampado/Listar`
    );
  }
  

  borrarEstampado(estampadoEliminar: EstampadoEliminar) {
    return this.http.post<EstampadoEliminar[]>(
      `${environment.url_api}CabeceraRegistroProduccion/actualizar`,
      estampadoEliminar
    );
  }
  verDetalleRollo(id: number) {
    return this.http.get<Estampado[]>(
      `${environment.url_api}DetalleRegistroProduccion/ListarDetalleRegistro/${id}`
    );
  }
  verRollos(cod_Ordtra: string, num_secuencia: number) {
    return this.http.get<Estampado[]>(
      `${environment.url_api}DetalleRegistroProduccion/ListarOrdenTrabajo/${cod_Ordtra}/${num_secuencia}`
    );
  }

  eliminarListaRollo(rolloEliminarLista: EliminarListaRollo) {
    return this.http.post<EliminarListaRollo[]>(
      `${environment.url_api}DetalleRegistroProduccion/actualizar`,
      rolloEliminarLista
    );
  }

  modificarRollo(rolloModificar: RolloModificar) {
    return this.http.post<RolloModificar[]>(
      `${environment.url_api}DetalleRegistroProduccion/crear`,
      rolloModificar
    );
  }
  ultimoRollo(ultimoRollo: RolloModificar) {
    return this.http.post<RolloModificar[]>(
      `${environment.url_api}DetalleRegistroProduccion/crearUltimoRollo`,
      ultimoRollo
    );
  }
}
