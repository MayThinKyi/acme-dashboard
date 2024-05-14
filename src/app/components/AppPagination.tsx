'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
    currentPage: number;
    totalPage: number;
}
const AppPagination = ({ currentPage, totalPage }: Props) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const handlePaginate = (page: number) => {
        const query = new URLSearchParams();
        if (searchParams.get('search')) query.append('search', searchParams.get('search')!);
        query.append('page', page.toString());
        const queryStr = query.toString();
        router.push(`${pathName}?${queryStr}`);
    }
    if (totalPage < 1) return null;
    return (
        <div className='flex items-center gap-5'>
            <h1 className="text-slate-800 my-5"> Page {currentPage} of {totalPage}</h1>
            <button onClick={() => handlePaginate(1)} className='p-3  rounded-lg text-slate-800 bg-slate-100'>
                <FaAngleDoubleLeft />
            </button>
            <button onClick={() => {
                if (currentPage > 1) handlePaginate(currentPage - 1)
            }} className='p-3  rounded-lg text-slate-800 bg-slate-100'>
                <FaAngleLeft />
            </button>
            <button onClick={() => {
                if (currentPage < totalPage) handlePaginate(currentPage + 1)
            }} className='p-3  rounded-lg text-slate-800 bg-slate-100'>
                <FaAngleRight />
            </button>
            <button onClick={() => handlePaginate(totalPage)} className='p-3  rounded-lg text-slate-800 bg-slate-100'>
                <FaAngleDoubleRight />
            </button>
        </div>
    )
}

export default AppPagination
