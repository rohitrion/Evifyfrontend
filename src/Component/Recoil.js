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
  default: 'https://b32d-2405-201-2008-7273-6bfb-a14a-64fb-d6aa.ngrok-free.app',
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
    isAuthenticated: false,
    user: null,
  },
});









export const Search = atom({
  key: "ser",
  default: ''
})


