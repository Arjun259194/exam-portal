import { registerAction } from '@/action/registerAction'
import RegisterForm from '@/components/Auth/RegisterForm'
import BlueGreenWavesComponent from '@/components/UI/BgWave'
import React from 'react'

function page() {
  return (
    <main className='bg-1 min-h-screen flex justify-center items-center'>
    <section className='bg-white flex flex-col min-w-80 w-2/5 p-5 rounded-lg shadow-md justify-around items-center'>
      <h1 className='text-3xl capitalize font-semibold'>Register Form</h1>
        <RegisterForm action={registerAction} />
    </section>
    </main>
  )
}

export default page