import React from 'react'
import Image from 'next/image'
import logo from '../pages/assets/Paganello_Logo_White.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='title'>
                <div className='link-to-main'>
                    <a href="https://www.paganello.com/">
                        <Image
                            src={logo}
                            alt="Paganello Logo"
                            width="100%"
                            height="100%"
                        />
                    </a>
                </div>
                <h1 className='header'>Schedule Paganello 2025</h1>
            </div>
            <div className='pools-button-container'>
                <button className='pool-button' onClick={()=>window.open('https://docs.google.com/spreadsheets/d/e/2PACX-1vRCZOg_D2OD5cwGJ8or9BIPxseAy-1yycpcKu1rRb6YBLQbC65Jz6iK29_y_kz6rLNfLl7I282F4hv6/pubhtml', '_blank')}>Standings and Pools</button>
            </div>
        </div>
    )
}

export default Navbar