import React from 'react'
import NavBar from './navbar/NavBar'
import { useSelector } from 'react-redux'
import { store } from '../app/store'

type Props = {
    children: React.ReactNode
}

export default function CommoneWrapLayout({ children }: Props) {
    const userName =store.getState().auth.firstName;
    return (
        <div className="min-h-screen bg-bgcolor">
            <NavBar displayName={userName|| undefined}/>
            <div className=' container bg-bgcolor mx-auto'>
                {children}
            </div>
            
        </div>
    )
}