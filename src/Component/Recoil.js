import { atom } from "recoil";



export const TextState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});



export const Num = atom({
  key: "id",
  default: ''
})

                                                                                                                                                                                                                               



export const GloablFile = atom({
  key: "F",
  default: ''
})   



export const BaseURLState = atom({
  key: 'baseURLState',
  default: 'http://54.237.210.197:8000',
  // default: 'https://23a5-2405-201-2008-7273-9d83-ebbe-6172-f841.ngrok-free.app'
 
});


export const Response = atom({
  key: "file",
  default: ""
})






export const Error = atom({
  key: "error",
  default: ""
})



export const Finalresponse = atom({
  key: "final",
  default: ""
})








export const Refresh = atom({
  key: "ref",
  default: 'false'
})









export const AuthState = atom({
  key: 'authState',
  default: {
    isAuthenticated: true,
    user: null,
  },
});









export const Search = atom({
  key: "ser",
  default: ''
})


