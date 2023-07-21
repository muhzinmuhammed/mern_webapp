import { apiSlice } from "./apiSlice";
const USERS_URL='/api/users';


let token = localStorage.getItem('token') ?? ''; 

if(token){
  token = JSON.parse(token) 
}
console.log(token)
export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/auth`,
            method: 'POST',
            body: data
          }),
        }),
        
        register: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data
          }),
        }),

        logout:builder.mutation({
          query:()=>({
              url:`${USERS_URL}/logout`,
              method:'POST',
          })
      }),

      updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: 'post', // Change method to PATCH
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        
      }),
       
        

       
        


        
       
      
      }),
})



export const {
  useLoginMutation,

  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = usersApiSlice;