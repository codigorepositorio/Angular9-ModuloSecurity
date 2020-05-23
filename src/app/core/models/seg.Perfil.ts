export class segPerfil {
    constructor(
        public idPerfil: number = 0,
        public nomPerfil: string = null,
        public isPerfilActivo: boolean = false,
        public regCreate   :Date=new Date,
        public regUpdate:Date=new Date,
        public regCreateIdUsuario:number=1,
        public regUpdateIdUsuario:number=2       
    ) { }
}