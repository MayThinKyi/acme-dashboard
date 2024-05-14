import React, { ReactNode } from 'react'

interface Props {
    icon: ReactNode;
    title: string;
    value: number;
}
const ReportItem = ({ icon, title, value }: Props) => {
    return (
        <div className='bg-[#F9FAFB] cursor-pointer p-4 rounded-xl '>
            <div className="flex items-center gap-2 my-3">
                {icon}
                <p className='text-slate-600 font-bold'>{title}</p>
            </div>
            <div className="text-center bg-white rounded-xl px-2 py-5">
                <h1 className="text-2xl  text-slate-600  font-semibold">{value}</h1>
            </div>
        </div>
    )
}

export default ReportItem
