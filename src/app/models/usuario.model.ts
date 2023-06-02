import { environment } from "src/environments/environment"

const base_url=environment.base_url;
export class Usuario {
    constructor(
        public nombre:string, 
        public email:string,
        public password?:string, 
        public role?:string,
        public img?:string,
        public google?:string, 
        public uid?:string, 
    ){}
    ///upload/usuarios/3898c605-545a-40af-b6be-37937289fd93.png

    get imagenUrl (){
        
        if(this.img?.includes('https')){
            return this.img
        }
        if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }else{
            return `${base_url}/upload/usuarios/noimagen`;
        }
        
        
    }
}