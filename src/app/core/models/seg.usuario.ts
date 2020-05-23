
export class segUsuario {

    constructor(
                  public idUsuario: number = 0, public login: string = null
                , public password: string = null, public nombres: string = null
                , public apellidoPaterno: string = null, public apellidoMaterno: string = null
                , public correoElectronico: string = null 
                ,public isUsuarioActivo: boolean=false, public isCambioPassword:boolean= false
    ) { }
}
