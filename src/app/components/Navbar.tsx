'use client';
import React, { ReactNode } from 'react'
import { Lusitana } from 'next/font/google';
import { AiOutlineGlobal } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";
import Link from 'next/link';
import { IoPower } from "react-icons/io5";
import { usePathname } from 'next/navigation';

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", '700'] });

const Navbar = () => {
    const pathName = usePathname();
    const navLinks: { id: number; icon: ReactNode; link: string; title: string }[] = [
        { id: 1, icon: <IoHomeOutline size={23} />, link: '/', title: 'Home' },
        { id: 2, icon: <LiaFileInvoiceSolid size={23} />, link: '/invoices', title: 'Invoices' },
        { id: 3, icon: <FaUsers size={23} />, link: '/customers', title: 'Customers' },

    ]
    return (<>
        <div className=" md:hidden    w-full p-3" >
            <div className={`bg-[#2F6FEB] w-full p-3 rounded-lg ${lusitana.className}`}>
                <div className="flex items-center gap-1 ">
                    <AiOutlineGlobal size={35} color='#fff' />
                    <h1 className="text-5xl text-white font-bold">Acme</h1>
                </div>
            </div>
            <div className="mt-2 w-full    grid grid-cols-4  gap-3">
                {navLinks.map((item) => {
                    return <div key={item.id} className={` mb-2 rounded-lg py-3 px-2 font-[500] w-full ${pathName === item.link ? 'text-blue-600 bg-sky-100' : 'bg-[#F9FAFB] hover:bg-sky-100 text-slate-900 hover:text-blue-600'} `}>
                        <Link href={item.link} className='flex items-center justify-center gap-2 '>
                            {item.icon}
                        </Link>
                    </div>
                })}
                <div className="cursor-pointer  bg-[#F9FAFB] flex items-center gap-2 hover:bg-sky-100 text-slate-900 hover:text-blue-600 mb-2 rounded-lg py-3 px-2 font-[500]">
                    <Link href={'/api/auth/signout'}> <IoPower className='mx-auto' size={24} /></Link>
                </div>
            </div>


        </div>
        <div className="hidden md:flex md:flex-col w-full p-3" >
            <div className={`bg-[#2F6FEB] p-3 rounded-lg ${lusitana.className}`}>
                <div className="flex items-center gap-1  mt-16">
                    <AiOutlineGlobal size={35} color='#fff' />
                    <h1 className="text-5xl text-white font-bold">Acme</h1>
                </div>
            </div>
            <div className="mt-8">
                {navLinks.map((item) => {
                    return <div key={item.id} className={` mb-2 rounded-lg py-3 px-2 font-[500] w-full ${pathName === item.link ? 'text-blue-600 bg-sky-100' : 'bg-[#F9FAFB] hover:bg-sky-100 text-slate-900 hover:text-blue-600'} `}>
                        <Link href={item.link} className='flex items-center gap-2 '>
                            {item.icon}
                            <p>{item.title}</p>
                        </Link>
                    </div>
                })}
            </div>
            <div className="cursor-pointer mb-8 w-full rounded-lg h-[230px] bg-[#F9FAFB] ">
            </div>
            <div className="cursor-pointer bg-[#F9FAFB]  hover:bg-sky-100 text-slate-900 hover:text-blue-600 mb-2 rounded-lg py-3 px-2 font-[500]">
                <Link href={'/api/auth/signout'} className='flex items-center gap-2'><IoPower /><p>Sign Out</p></Link>
            </div>
        </div>
    </>
    )
}

export default Navbar
