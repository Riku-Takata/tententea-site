"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { LogoView } from '@/app/LogoView';

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const menuFunction = () => {
        setOpenMenu(!openMenu);
    };

    const handleScrollToConcept = () => {
        setOpenMenu(!openMenu);
        const section = document.getElementById('concept');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScrollToMenu = () => {
        setOpenMenu(!openMenu);
        const section = document.getElementById('menu');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScrollToOperation = () => {
        setOpenMenu(!openMenu);
        const section = document.getElementById('operation');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const ScrollToConcept = () => {
        const section = document.getElementById('concept');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const ScrollToMenu = () => {
        const section = document.getElementById('menu');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const ScrollToOperation = () => {
        const section = document.getElementById('operation');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
            <div>
                <Link href="/">
                    <LogoView />
                </Link>
            </div>
            {openMenu ? (
                <div className='flex flex-row absolute z-10 top-0 right-0  min-h-fit min-w-full'>
                    <div className='basis-5/6'></div>
                    <div className='basis-1/2 bg-[#908464]'>
                        <ul className='text-center border-l border-gray-300'>
                            <li className='p-2 border-b-2 border-gray-300 font-bold'>
                                <button onClick={menuFunction} className='hover:underline underline-offset-4'>
                                close
                                </button>
                            </li>
                            <li onClick={handleScrollToConcept} className='p-4 font-medium hover:underline underline-offset-4 border-b border-gray-300'>
                                Concept
                            </li>
                            <li onClick={handleScrollToMenu} className='p-4 font-medium hover:underline underline-offset-4 border-b border-gray-300'>
                                Menu
                            </li>
                            <li onClick={handleScrollToOperation} className='p-4 font-medium hover:underline underline-offset-4 border-b border-gray-300'>
                                Operation
                            </li>
                            <li onClick={menuFunction} className='p-4 font-medium hover:underline underline-offset-4 border-b border-gray-300'>
                                <Link href='/components/Contact'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : undefined}
            <div className='font-bold flex-grow'>
                <ul className='md:flex justify-end hidden flex-1 text-left text-lg'>
                    <li onClick={ScrollToConcept} className='p-2 font-medium hover:underline underline-offset-4'>
                        Concept
                    </li>
                    <li onClick={ScrollToMenu} className='p-2 font-medium hover:underline underline-offset-4'>
                        Menu
                    </li>
                    <li onClick={ScrollToOperation} className='p-2 font-medium hover:underline underline-offset-4'>
                        Operation
                    </li>
                    <li className='p-2 font-medium hover:underline underline-offset-4'>
                        <Link href='/components/Contact'>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='md:hidden flex items-center space-x-2' onClick={menuFunction}>
                <div className='space-y-2'>
                    <span className='block h-0.5 w-8 bg-current'></span>
                    <span className='block h-0.5 w-8 bg-current'></span>
                    <span className='block h-0.5 w-8 bg-current'></span>
                </div>
            </div>
        </nav>
    );
}