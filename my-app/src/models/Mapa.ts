import { IUser } from "./User";

  export enum Dificultad{//Enum
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
