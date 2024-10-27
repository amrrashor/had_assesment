import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ExamDetails, ExamsListData } from '@/utils/data';
import NewQuestionForm from '@/components/form';


const ExamEditor = () => {
    const [showQuestionForm, setShowquestionForm] = useState(false);
    const [question, setQuestion] = useState({
        title: '',
        description: '',
        answers: [{
            title: '',
            isCorrect: false,
            description: '',
        }],
    });
    const [examDetails, setExamDetails] = useState(ExamDetails);


    const router = useRouter();
    const id = router?.query?.id;
    const item  = ExamsListData?.find((item) => item.id == id)

    useEffect(() => {
        document.title = `Exam Editior ${item ? "- " + item?.title : ""}`
    }, []);
    
    const handleQuestionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setQuestion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAnswerChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const updatedAnswers = [...question.answers] as any;
        updatedAnswers[index][name] = name == 'isCorrect' ? e.target.checked : value;

        setQuestion((prev) => ({
            ...prev,
            answers: updatedAnswers
        }));
    };

    const handleAddNewAnswer = () => {
        setQuestion((prev) => ({
            ...prev,
            answers: [
                ...prev.answers,
                {
                    title:'',
                    description:'',
                    isCorrect:false,
                }
            ]
        }))
    };

    const handleSubmitNewQuestion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setExamDetails((prev) => ({
            ...prev,
            questions:[
                ...(prev.questions || []), question
            ]
        }));

        setQuestion({
            title:'',
            description:'',
            answers: [{title:'', description:'', isCorrect:false}]
        });

        setShowquestionForm(false);
    };

    return (
        <div className='m-4'>
            {!showQuestionForm && (
                <div className='w-full flex justify-end items-end'>
                    <button 
                        onClick={() => setShowquestionForm(true)}
                        className='p-3 border-solid m-3 border border-slate-300 rounded-md'
                    >
                        Add New Question
                    </button>
                </div>
            )}

            {showQuestionForm && (
                <NewQuestionForm
                    question={question}
                    handleAddNewAnswer={handleAddNewAnswer}
                    handleQuestionChange={handleQuestionChange}
                    handleAnswerChange={handleAnswerChange}
                    handleSubmitNewQuestion={handleSubmitNewQuestion}
                />
            )}

            <div className='h-1 bg-white w-full my-7' />

            <h1 className='text-2xl'>{ExamDetails.title}</h1>
            <p className='text-xl mb-5'>{ExamDetails.description}</p>
            <div>
                {examDetails?.questions?.map((item) => (
                    <div key={item?.title} className='my-4 border border-solid border-slate-300 rounded-md p-4'>
                        <h4 className='text-lg font-bold'>{item?.title}</h4>
                        <h5 className='text-base'>{item?.description}</h5>

                        <div className='flex justify-evenly items-center flex-wrap mt-5'>
                            {item?.answers?.map((answer) => (
                                <div 
                                    className={`${answer?.isCorrect ? 'bg-green-600' : ''} p-4 border border-solid border-slate-300 rounded-md min-w-28 flex justify-center items-center cursor-pointer`}
                                >
                                    {answer?.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExamEditor