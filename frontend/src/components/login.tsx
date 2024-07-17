"use client"

import { useState } from 'react'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from './store'
import { setAuthenticated } from './store'

export default function LoginPage() {
    const [state, setState] = useState(2)
    const dispatch = useAppDispatch()
    const router = useRouter()
 
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        setState(1)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
        dispatch(setAuthenticated(true))
        router.push('/home')
    } else {
        setState(0)
    }
  }

  function renderBox(state: number) {
    switch(state) {
        case 0:
            return (<p className="text-red-600 text-center mt-2 p-1.5 bg-red-100 text-sm rounded-lg h-8 w-56">Invalid login</p>)
        case 1:
            return (<p className="text-blue-600 text-center mt-2 p-1.5 bg-blue-100 text-sm rounded-lg h-8 w-56">Please wait...</p>)
        default:
            return (<p className="mt-2 rounded-lg h-8 w-56"/>)
    }
  }
 
  return (
    <div>
        <form onSubmit={handleSubmit} style={{ color: 'black' }} className="flex flex-col bg-green-100 p-4 rounded-lg h-42 w-56 justify-center">
            <h1 className="text-center font-bold mb-2 text-xl">RIDE-TI</h1>
            <input type="username" name="username" placeholder="Username" required className="mb-4 rounded-md px-1"/>
            <input type="password" name="password" placeholder="Password" required className="mb-4 rounded-md px-1"/>
            <div className="flex justify-center">
                <button type="submit" className="hover:bg-green-400 text-white bg-green-300 w-3/6 rounded-md">Login</button>
            </div>
        </form>
        {renderBox(state)}
    </div>
  )
}
