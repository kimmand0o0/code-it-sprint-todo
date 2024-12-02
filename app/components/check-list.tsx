'use client'

import Image from "next/image"
import { FC, useState } from "react"

import CheckboxDefault from '@/app/assets/icons/checkbox-default.svg'
import CheckboxFrame from '@/app/assets/icons/checkbox-frame.svg'

const CheckList : FC = () => {
    const [ isCompleted, setIsCompleted] = useState<Boolean>(false)
    
    return (
        <div className={`${isCompleted ? 'bg-violet-100 line-through' : 'bg-white'} h-[50px] p-2 mt-3 rounded-[27px] border-2 border-slate-900 flex justify-start items-center font-[16px] text-slate-800`}>
            <button onClick={() => setIsCompleted(!isCompleted)} className="mr-2">
                <Image src={isCompleted ? CheckboxFrame : CheckboxDefault} alt="checkbox" />
            </button>
            <span>ddddd</span>
        </div>
    )
}

export default CheckList