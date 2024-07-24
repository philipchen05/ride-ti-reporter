'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from './store';
import { useState } from 'react'
import AddName from './addname'

export default function Home() {
    const { user, pswrd } = useAppSelector(state => state.auth);
    const [state, setState] = useState(0)
    const date = new Date()
    const username = user
    const password = pswrd
    const [errorType, setErrorType] = useState('')
    const [errorKey, setErrorKey] = useState('')
    
    function getFormattedDate(): string {
        const date = new Date();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${month} ${day} ${year}`;
    }

    async function handleProd() {
        setState(1)
        const response = await fetch('http://127.0.0.1:5000/prod', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            try {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;

                const outputFile = getFormattedDate() + " - Defect RT Status Report.xlsx"

                link.setAttribute("download", outputFile);
    
                // Append temporary link to document body
                document.body.appendChild(link);
                link.click();
    
                // Cleanup: remove temporary link
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
                setState(2)
            } catch (error) {
                console.error("Download error:", error);
            }
        } else {
            const errorData = await response.json();
            setErrorType(errorData.error)
            setErrorKey(errorData.message)
            setState(3)
        }
    }
    
    function renderBox(state: number) {
        switch(state) {
            case 0:
                return (<p className="mt-2 p-1.5 rounded-lg h-8 w-56"/>)
            case 1:
                return (<p className="text-blue-600 text-center mt-2 p-1.5 bg-blue-100 text-sm rounded-lg h-8 w-56">Downloading...</p>)
            case 2:
                return (<button onClick={() => {setState(0)}} className="hover:bg-green-200 text-green-600 text-center mt-2 p-1.5 bg-green-100 text-sm rounded-lg h-8 w-56">Done</button>)
            case 3:
                return (<div>
                        <p className="mt-2 p-1.5 rounded-lg h-8 w-56"/>
                        <AddName type={errorType} missingKey={errorKey} download={handleProd}/>
                    </div>
                )
        }  
    }

    return (
        <div>
            <div className="flex relative flex-col bg-green-100 p-4 rounded-lg h-42 w-56 justify-center">
                <h1 className="text-black text-center font-bold text-xl">Reports</h1>
                <h1 className="text-black text-center mb-3 text-sm">{date.toDateString()}</h1>
                <div className="flex flex-row justify-evenly">
                    <button onClick={handleProd} type="submit" className="hover:bg-green-400 text-white bg-green-300 w-2/6 rounded-md">PROD</button>
                    <button onClick={() => alert("Coming Soon")} type="submit" className="hover:bg-green-400 text-white bg-green-300 w-2/6 rounded-md">UAT</button>
                </div>
            </div>
            {renderBox(state)}
        </div>
    )
}
