'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../../components/store'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    alert(isAuthenticated)
    if(isAuthenticated) {
        return (
            <main className="bg-white flex min-h-screen flex-col items-center justify-center p-24">
                hi
            </main>
        )
    } else {
        router.push('/')
    }
}
