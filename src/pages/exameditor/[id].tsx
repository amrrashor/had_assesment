import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { ExamDetails, ExamsListData } from '@/utils/data';


const ExamEditor = () => {
    const router = useRouter();
    const id = router?.query?.id;
    const item  = ExamsListData?.find((item) => item.id == id)

    useEffect(() => {
        document.title = `Exam Editior ${item ? "- " + item?.title : ""}`
    }, []);
    
    return (
        <div>
            <h1>{ExamDetails.title}</h1>
            <p>{ExamDetails.description}</p>
            <>
                {ExamDetails?.questions?.map((item) => (
                    <div key={item?.title} className='bg-fuchsia-400 m-2'>
                        <h4>{item?.title}</h4>
                        <h5>{item?.description}</h5>

                        <div>
                            {item?.answers?.map((answer) => (
                                <div>{answer?.title}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </>
        </div>
    )
}

export default ExamEditor