import { atom } from "recoil";


export const TextState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  }); 



  export const  Num = atom({
    key : "id",
    default :1
  })


 
  export const GloablFile=atom({
    key : "F",
    default:''
  })
    
  

  export const BaseURLState = atom({
    key: 'baseURLState',
    default: 'https://ae1e-2405-201-2008-7273-b38f-1847-3e42-ed7c.ngrok-free.app',
  });