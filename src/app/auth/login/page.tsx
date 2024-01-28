'use server'
import { loginAction } from '@/action/loginAction'
import LoginForm from '@/components/Auth/LoginForm'
import React from 'react'

function page() {
  return (
    <main className='bg-2 min-h-screen flex justify-center items-center'>
        <section className='bg-white p-5 rounded-md shadow-md flex flex-col justify-around items-center min-w-80 w-2/5'>
            <h1 className='text-3xl font-semibold capitalize'>Hey there!</h1>
            <LoginForm action={loginAction} />
        </section>
    </main>
  )
}

export default page