import { atom } from "recoil";


export const TextState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  }); 



  export const  Num = atom({
    key : "id",
    default :1
  })