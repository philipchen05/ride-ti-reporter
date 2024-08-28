// Component for alerting blank ticket severity
"use client"

interface Props {
    type: string;
    missingKey: string;
}

export default function Error(props: Props) {
    return (
        <div className="absolute -mt-8 flex flex-col bg-red-100 p-4 rounded-lg h-12 w-56 justify-center">
            <h1 className="text-center text-sm text-red-600 mt-2 mb-0.5">Error: {props.type}</h1>
            <h1 className="text-center text-xs text-red-600 mb-2">RT #{props.missingKey}</h1>
        </div>
    )
}
