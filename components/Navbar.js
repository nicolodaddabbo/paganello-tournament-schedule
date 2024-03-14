import React from 'react'
import Image from 'next/image'
import logo from '../pages/assets/Paganello_Logo_White.svg'
import Link from 'next/link'

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
                <h1 className='header'>Schedule Paganello 2024</h1>
            </div>
            <div className='pools-button-container'>
                <button className='pool-button' onClick={()=>window.open('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9DDndss0yEehkCrZeecEnU4EPbfSsRl-qCgWYEYxDTKx5wCCuyF94YxTcwy8hlA14wMrDNha33ryV/pubhtml?gid=85686787', '_blank')}>Standings and Pools</button>
            </div>
        </div>
    )
}

export default Navbar