1 Authentication Page:
Implement an authentication page where users can sign up, sign in, or reset their passwords with a refresh token (you can use any libraries or framework like Firebase, superbase, etc).

done   using firebase 
 added sign in , signout , reset password , singnup , added react tost notification  and conditional rendering 

2 
Create a home page that should only be accessible once the user is authenticated.
Ensure that unauthorised users are redirected to the authentication page.

done only the login user can see data if user is not login it will redirect to login page 


3  Utilize a given API to fetch a large dataset.
Implement lazy loading functionality to initially load and display a limited portion of the dataset.
Load additional data as the user scrolls or interacts with the page.
Use the below API for implementing lazy loading
 API for lazy loading: https://api.instantwebtools.net/v1/passenger?page=0&size=10

done  implemented infinite scroll code no library  , in start it will show only some data lazyload  using useeffcet 