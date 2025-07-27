import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/context';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {

    const [login,setlogin] = useState({
        email:"",
        password:''
    })
    const { loginUser,loading,setLoading} = useContext(AuthContext)

    const handleSubmit = async(e)=>{
        setlogin(true)
        try {
            e.preventDefault();
            const res = await loginUser(login)
          
            if (res?.success) {
        setlogin({
          
          email: '',
          password: ''
        })
      }
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            
        }
    }

  return (
   <div className='min-h-screen flex items-center justify-center bg-gray-100'>
         <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
           <h2 className='text-2xl font-bold text-gray-700 text-center mb-2'>Sign in</h2>
           <p className='text-gray-600 text-sm text-center mb-6'>
             Sign In to get you notes 
           </p>
           <form onSubmit={handleSubmit} className='space-y-4'>
             
             <input
               type='email'
               placeholder='you@gmail.com'
               className='border border-gray-300 rounded-md px-4 py-2 w-full'
               value={login.email}
               onChange={(e) =>
                 setlogin({ ...login, email: e.target.value })
               }
               required
             />
             <input
               type='password'
               placeholder='Enter your password'
               className='border border-gray-300 rounded-md px-4 py-2 w-full'
               value={login.password}
               onChange={(e) =>
                 setlogin({ ...login, password: e.target.value })
               }
               required
             />
             <Button
               className='bg-blue-500 text-white px-4 py-2 rounded-md w-full'
               type='submit'
               disabled={loading}
             >
               {loading ? 'loading...' : 'Sign in'}
             </Button>
           </form>
           <Link to={'/register'}
           ><span>create now account </span></Link>
         </div>
       </div>
  )
}

export default LoginPage