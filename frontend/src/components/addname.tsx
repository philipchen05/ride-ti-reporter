// Component for writing to database when an owner/requestor is missing
"use client"

import { useState } from 'react'

interface Props {
    type: string;
    missingKey: string;
    download: (report: string) => Promise<void>;
    report: string;
}

export default function AddName(props: Props) {
    const [menu, setMenu] = useState(false)
    const [selection, setSelection] = useState('Select')

    function toggleMenu() {
        setMenu(!menu)
    }

    async function handleSubmit() {
        const missingkey = props.missingKey
        const value = selection
        var endpoint = 'http://127.0.0.1:5000/add'
        if(props.type == 'Owner') {
            endpoint += 'owner'
        } else {
            endpoint += 'requestor'
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ missingkey, value }),
        })

        if (response.ok) {
            props.download(props.report)
        } else {
            console.log("Error")
        }
    }

    function handleSelection(s: string) {
        setSelection(s)
        toggleMenu()
    }

    return (
        <div className="absolute -mt-8 flex flex-col bg-red-100 p-4 rounded-lg h-24 w-56 justify-center">
            <h1 className="text-center text-sm text-red-600 mt-2 mb-0.5">Error: Missing {props.type}</h1>
            <h1 className="text-center text-xs text-red-600 mb-2">{props.missingKey}</h1>
            
            <div className="flex flex-row justify-evenly mb-2">
                <div className="relative inline-block text-left">
                    <div>
                        <button type="button" className="pl-3 pr-2 py-1 w-18 inline-flex justify-center gap-x-1.5 rounded-md bg-white text-sm text-gray-900 hover:bg-gray-50" id="menu-button" aria-expanded={menu} aria-haspopup="true" onClick={toggleMenu}>
                        {selection}
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    {menu && (<div className="absolute right-0 z-10 mt-2 w-18 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            <button onClick={() => {handleSelection('MOF')}} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">MOF</button>
                            <button onClick={() => {handleSelection('CAC')}} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1">CAC</button>
                            <button onClick={() => {handleSelection('FFX')}} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-2">FFX</button>
                        </div>
                    </div>)}
                </div>
                <button onClick={() => { if(selection != 'Select') handleSubmit() }} className="hover:bg-red-400 pl-3 text-white bg-red-300 text-center pr-3 rounded-md text-sm">Submit</button>
            </div>
        </div>
    )
}
