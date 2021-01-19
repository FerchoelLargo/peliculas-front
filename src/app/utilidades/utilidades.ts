import { format } from "path";

export function toBase64(file:File){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}

export function parseErroresAPI(response:any):string[]{
    let resultado:string[] = []
    if(response.error){
        if(typeof(response.error) === 'string'){
            resultado.push(response.error)
        }else{
            if(response.error.errors){
                const entradas = Object.entries(response.error.errors)
                entradas.forEach( (item: any[]) => {
                    item[1].forEach((error:any) => {
                        resultado.push(`${item[0]}: ${error}`)
                    });
                });
            }else{
                resultado.push(`critical`)
            }
        }
    }
    return resultado
}

export const formatearFecha = (fecha : Date) => {
    fecha = new Date(fecha);
    const formato = new Intl.DateTimeFormat('en',{
        year:'numeric',
        month:'2-digit',
        day:'2-digit'
    })
    const [
        {value:month},,
        {value:day},,
        {value:year}
    ] = formato.formatToParts(fecha);
    return `${year}-${month}-${day}`
}