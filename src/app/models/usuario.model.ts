export class Usuario {
    constructor(
        public nombre:string, 
        public email:string, 
        public role?:string,
        public img?:string,
        public google?:string, 
        public uid?:string, 
    ){}
}