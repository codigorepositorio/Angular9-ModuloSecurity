export interface Estampado {
  Id: number; //
  Opcion: string; //
  Cod_Ordtra: string; //
  Num_Secuencia: number; //
  presentacion?: string;
  Cod_Maquina: number; //
  des_Maquina?: string;
  Cod_Proceso_Estampado: number; //
  des_Proceso_Estampado?: string;
  Fec_Inicio: string; //
  fec_Fin?: string;
  fec_Produccion?: string;
  Cod_Item: string; //
  des_Item?: string;
  Cod_Comb: string; //
  des_Comb?: string;
  kilos?: number;
  metros?: string;
  Cod_Usuario: string; //
  fec_Creacion?: string;

  Pc_Creacion: string; //
}
export interface EstampadoEliminar {
  Opcion: string;
  Id: number;
}

export interface RolloModificar {
  Id: number;
  Cod_Ordtra: string;
  Num_Secuencia: number;
  Num_Rollo: string;
  Kgs_Producidos: number;
  Mts_Producidos: number;
  Cod_Usuario: string;
  Pc_Creacion: string;
}

export interface EliminarListaRollo {
  Id: number;
  Cod_Ordtra: string;
  Num_Secuencia: number;
  Num_Rollo: string;
}

//   {
//         "Opcion": "I",
//         "Id": 0,
//         "Cod_Ordtra": "54905",
//         "Num_Secuencia": 1,
//         "Cod_Maquina": 1,
//         "Cod_Proceso_Estampado": 1,
//         "Fec_Inicio": "15/11/2019 16:16",
//         "Cod_Item": "ES001847",
//         "Cod_Comb": "001",
//         "Cod_Usuario": "SISTEMAS",
//         "Pc_Creacion": "CPU1450"
//   }

// export interface Moneda{
//     codigo: string;
//     nombre: string;
//     unidad_medida: string;
//     fecha: Date;
//     valor: number;
// }
