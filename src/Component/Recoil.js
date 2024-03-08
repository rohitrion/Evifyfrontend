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
    default: 'https://d52f-2405-201-2008-7273-ca31-1bf2-fa05-f712.ngrok-free.app',
  });

 
  export const Response=atom({
    key:"file",
    default:""
  })
