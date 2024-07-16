"use client";

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
        alert("hi")
        router.push('/profile')
    } else {
      // Handle errors
    }
  }
 
  return (
    <form onSubmit={handleSubmit} style={{ color: 'black' }} className="flex flex-col bg-green-100 p-4 rounded-lg h-36 justify-center">
        <input type="email" name="email" placeholder="Email" required className="mb-4 rounded-md px-1"/>
        <input type="password" name="password" placeholder="Password" required className="mb-4 rounded-md px-1"/>
        <div className="flex justify-center">
            <button type="submit" className="bg-white w-3/6 rounded-md">Login</button>
        </div>
    </form>
  )
}
