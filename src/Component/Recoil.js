import { atom } from "recoil";



export const TextState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  }); 



  export const  Num = atom({
    key : "id",
    default :''
  })




  export const  NewNum = atom({
    key : "id",
    default :0
  })


 



 
  export const GloablFile=atom({
    key : "F",
    default:''
  })
    
  

  export const BaseURLState = atom({
    key: 'baseURLState',
    default: 'https://1b05-2405-201-2008-7273-99a4-205-be78-d049.ngrok-free.app',
  });

 
  export const Response=atom({
    key:"file",
    default:""
  })






  export const Error=atom({
    key:"error",
    default:""
  })



  export const  Finalresponse=atom ({
    key:"final",
    default:""
  })











  export const AuthState = atom({
    key: 'authState',
    default: {
      isAuthenticated: false,
      user: null,
    },
  });