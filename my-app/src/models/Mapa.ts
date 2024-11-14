import { IUser } from "./User";

// export interface IMapa {
//     id: number;
//     name: string;
//     valores: string;
//     photo: string;
//     likes: number;
//     creator: IUser;
//     categoria: string;
//   }

  export enum Dificultad{
    noTesteado,
    facil,
    normal,
    dificil,
  }
  
  export interface IMapa {
    id: number;
    name: string;
    valores: string;
    photo: string;
    likes: number;
    creator: IUser;
    categoria: string;
    dificultad: Dificultad;
    intentos: number[];
  }