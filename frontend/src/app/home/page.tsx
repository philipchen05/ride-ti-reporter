'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '../../components/store';

export default function Home() {
    const { isAuthenticated, user, pswrd } = useAppSelector(state => state.auth);
    const router = useRouter();
    const date = new Date()
    
    async function handleProd(event: React.MouseEvent<HTMLButtonElement>) {
        const response = await fetch('http://127.0.0.1:5000/prod', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": user, "password": pswrd }),
        })

        if (response.ok) {
            alert("ok")
        } else {
            alert("not ok")
        }
    }

    if(true) {
        return (
            <main className="bg-white flex min-h-screen flex-col items-center justify-center p-24">
                <div className="flex flex-col bg-green-100 p-4 rounded-lg h-42 w-56 justify-center">
                    <h1 className="text-black text-center font-bold text-xl">Reports</h1>
                    <h1 className="text-black text-center mb-3 text-sm">{date.toDateString()}</h1>
                    <div className="flex flex-row justify-evenly">
                        <button onClick={handleProd} type="submit" className="hover:bg-green-400 text-white bg-green-300 w-2/6 rounded-md">PROD</button>
                        <button onClick={() => alert("UAT")} type="submit" className="hover:bg-green-400 text-white bg-green-300 w-2/6 rounded-md">UAT</button>
                    </div>
                </div>
            </main>
        )
    } else {
        router.push('/')
    }
}
