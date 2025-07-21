import React from 'react'
import NavBar from './navbar/NavBar'
import UserFooter from './footer/UserFooter'

type Props = {
    children: React.ReactNode
}

export default function CommoneWrapLayout({ children }: Props) {
    return (
        <div>
            <NavBar />
            <div>
                {children}
            </div>
            <UserFooter />

        </div>
    )
}