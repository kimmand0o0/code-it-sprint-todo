'use client'

import Image from "next/image"
import { FC } from "react"

import CheckboxDefault from '@/app/assets/icons/checkbox-default.svg'
import CheckboxFrame from '@/app/assets/icons/checkbox-frame.svg'
import Link from "next/link"

interface CheckListProps {
  "id": number;
  "name": string;
  "isCompleted": boolean;
}

const CheckList : FC<CheckListProps> = ({id, name, isCompleted}) => {
    const handleUpdateComplete = async () => {
        //TODO : 로직 구현 필요
        console.log('complete')
    }

    return (
        <Link href={`/${id}`} className={`${isCompleted ? 'bg-violet-100 line-through' : 'bg-white'} h-[50px] p-2 mt-3 rounded-[27px] border-2 border-slate-900 flex justify-start items-center font-[16px] text-slate-800`}>
            <button 
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    
                    handleUpdateComplete()}
                } 
                className="mr-2"
            >
                <Image src={isCompleted ? CheckboxFrame : CheckboxDefault} alt="checkbox" />
            </button>
            <span>{name}</span>
        </Link>
    )
}

export default CheckList