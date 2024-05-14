import { Status } from '@prisma/client'
import React from 'react'
import { BsClock } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'

interface Props {
    status: Status;
}
const AppStatus = ({ status }: Props) => {
    return (
        <div className='w-max mx-auto'>
            {status === 'PENDING' && <div className="cursor-pointer ">
                <div className="py-1 px-4 rounded-xl flex items-center gap-2 bg-[#F3F4F6]">
                    <p className='text-[12px] font-bold text-zinc-600'>Pending</p>
                    <BsClock />
                </div>
            </div>
            }
            {status === 'PAID' && <div className="cursor-pointer ">
                <div className="py-1 px-4 rounded-xl text-white flex items-center gap-2 bg-green-600">
                    <p className='text-[12px] font-bold  '>Paid</p>
                    <FaCheck />
                </div>
            </div>}
        </div>
    )
}

export default AppStatus
