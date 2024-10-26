import React, {useEffect, useState} from 'react'
import { ExamsListData } from '@/utils/data';
import Link from 'next/link';

//1- we need types
//2- we need dummy data
//3- we need data

const ExamsList = () => {
    
    useEffect(() => {
        document.title = 'Exams List'
    }, []);
    
    return (
        <div className='w-full h-full'>
            <div className='flex justify-end items-end w-full'>
                <Link href='/exameditor' className='border-slate-300 border-2 border-solid p-2 rounded-md mt-4 mr-4 cursor-pointer text-sm'>Create New Exam</Link>
            </div>
            <div className='overflow-auto mx-auto p-7 border-2 border-solid border-slate-300 rounded-md h-[600px] w-2/4'>
                {ExamsListData.map((exam) => (
                    <Link
                        href={`exameditor/${exam.title}`}
                        key={exam.id}
                        className='p-5 hover:border rounded-sm duration-300 cursor-pointer border-b border-solid border-slate-300 w-full flex justify-center mb-5'
                    >
                        {exam.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ExamsList