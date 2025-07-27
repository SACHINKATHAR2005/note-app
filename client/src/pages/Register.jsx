import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/context'
import React, { useContext, useState } from 'react'

function RegisterPage() {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { registerUser, loading } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await registerUser(register) // ✅ wait for backend response
      console.log("Register success:", res)

      // Only reset if registration was successful
      if (res?.success) {
        setRegister({
          name: '',
          email: '',
          password: ''
        })
      }
    } catch (err) {
      console.error("Register failed:", err?.response?.data || err.message)
      // Optional: show toast or error message to user
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-700 text-center mb-2'>Register</h2>
        <p className='text-gray-600 text-sm text-center mb-6'>
          Create your account to keep your notes in a safe place ✨
        </p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            placeholder='Enter your name'
            className='border border-gray-300 rounded-md px-4 py-2 w-full'
            value={register.name}
            onChange={(e) =>
              setRegister({ ...register, name: e.target.value })
            }
            required
          />
          <input
            type='email'
            placeholder='you@gmail.com'
            className='border border-gray-300 rounded-md px-4 py-2 w-full'
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
            required
          />
          <input
            type='password'
            placeholder='Enter your password'
            className='border border-gray-300 rounded-md px-4 py-2 w-full'
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
            required
          />
          <Button
            className='bg-blue-500 text-white px-4 py-2 rounded-md w-full'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
