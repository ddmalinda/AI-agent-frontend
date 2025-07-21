import React from 'react'
import NavBar from './navbar/NavBar'

type Props = {
    children: React.ReactNode
}

export default function CommoneWrapLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-bgcolor">
            <NavBar />
            <div className=' container bg-bgcolor  mx-auto'>
                {children}
            </div>
            
        </div>
    )
}