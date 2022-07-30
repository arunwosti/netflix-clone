import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, Login} = UserAuth()
    const [error, setError]=useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await Login(email, password)
            navigate('/')
            setError('')
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <>
    <div className='w-full h-screen'>
        <img 
        className='hidden sm:block absolute w-full h-full object-cover' 
        src='https://asaaseradio.com/wp-content/uploads/2022/04/netflix-library-photo-scaled-1.jpg' 
        alt='/'
        />
        <div className='w-full h-screen bg-black/60 fixed top-0 left-0'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold '>Sign In</h1>
                    {error ? <p className='bg-red-400 my-3 p-2'>{error}</p>:null}
                    <form onSubmit={handleSubmit} className='flex flex-col py-4 w-full'>
                        <input onChange={(e)=>setEmail(e.target.value)} className='py-3 my-2 bg-gray-700 rounded' type='email' placeholder='Email' autoComplete='email'></input>
                        <input onChange={(e)=>setPassword(e.target.value)} className='py-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password'/>
                        <button className='bg-red-600 py-3 my-6 font-bold'>Sign In</button>

                        <div className='flex justify-between items-center text-sm text-gray-600'>
                            <p><input type='checkbox' className='mr-2'></input>Remember me</p>
                            <p>Need Help ?</p>
                        </div>
                        <p className='py-8'>
                            <span className='text-gray-600'>New to Netflix ?</span>
                           <Link to='/signup'> Sign Up </Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login