// Clase (class):

// Crear objetos: Utiliza clases cuando necesites crear instancias de objetos que tengan tanto propiedades como métodos.

export interface IProduct {
    _id?: string;
    name: string;
    price: number;
    description: string;
}


// Interfaz (interface):

// Definir la estructura de datos: Utiliza interfaces cuando necesites definir la estructura de datos de un objeto, pero no necesitas proporcionar ninguna implementación.


// export class IProduct {
//     _id?: string;
//     name: string;
//     price: number;
//     description: string;

//     constructor() {
//         this.name = '';
//         this.price = 0.0;
//         this.description = '';
//     }
// }