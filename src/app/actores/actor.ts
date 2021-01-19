export interface actorEdicionDTO{
    id:number,
    nombre:string,
    fechaNacimiento:Date,
    foto:string,
    biografia :string,
}

export interface actorCreacionDTO{
    nombre:string,
    fechaNacimiento:Date,
    foto:File,
    biografia :string,
}

export interface ActorPeliculaDTO{
    id:number,
    nombre: string,
    foto:string,
    personaje:string,
}