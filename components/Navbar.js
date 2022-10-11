import React from 'react'
import Image from 'next/image'
import logo from '../pages/assets/Paganello_Logo_White.svg'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='title'>
                <div className='link-to-main'>
                    <Link href="https://www.paganello.com/">
                        <Image
                            src={logo}
                            alt="Paganello Logo"
                            width="100%"
                            height="100%"
                        />
                    </Link>
                </div>
                <h1 className='header'>Schedule Paganello 2022</h1>
            </div>
        </div>
    )
}

export default Navbar