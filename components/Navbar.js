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
                <h1 className='header'>Schedule Paganello 2023</h1>
            </div>
            <div className='pools-button-container'>
                <button className='pool-button' onClick={()=>window.open('https://docs.google.com/spreadsheets/d/e/2PACX-1vQEHy9Sk4pw3YvkpJmcCdi1eRPygRMvf1dJA0vb0ustVnQrN_ID2DhN0A0GjqQROek72sv7sWi62a6H/pubhtml#', '_blank')}>Pools and Brackets</button>
            </div>
        </div>
    )
}

export default Navbar