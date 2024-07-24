'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '../../components/store';
import Reports from '../../components/reports'

export default function Home() {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const router = useRouter();
    
    if(isAuthenticated) {
        return (
            <main className="bg-white flex min-h-screen flex-col items-center justify-center p-24">
                <Reports/>
            </main>
        )
    } else {
        router.push('/')
    }
}
