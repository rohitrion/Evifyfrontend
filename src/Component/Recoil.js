import { atom } from "recoil";


export const TextState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  }); 



  export const  Num = atom({
    key : "id",
    default :''
  })




  // export const  NewNum = atom({
  //   key : "id",
  //   default :0
  // })


 





 
  export const GloablFile=atom({
    key : "F",
    default:''
  })
    
  

  export const BaseURLState = atom({
    key: 'baseURLState',
    default: 'https://bdf8-2405-201-2008-7273-138f-16e0-91cd-319e.ngrok-free.app',
  });

 
  export const Response=atom({
    key:"file",
    default:""
  })






  // export const Response=atom({
  //   key:"file",
  //   default:""
  // })



  export const  Finalresponse=atom ({
    key:"final",
    default:""
  })