import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ExamDetails, ExamsListData } from '@/utils/data';
import NewQuestionForm from '@/components/form';
import { EditProps } from '@/types/types';


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
    const [isEditMode, setIsEditMode] = useState<EditProps>({ questionIndex: null, answerIndex: null });

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
        setExamDetails((prev) => {
            const updatedQuestions = isEditMode.questionIndex !== null ? prev.questions.map((q, i) => (i === isEditMode.questionIndex ? question : q)) : [...(prev.questions || []), question];
            return { ...prev, questions: updatedQuestions };
        });

        setQuestion({
            title:'',
            description:'',
            answers: [{title:'', description:'', isCorrect:false}]
        });
        setIsEditMode({
            questionIndex: null,
            answerIndex: null,
        });
        setShowquestionForm(false);
    };

    //EDIT QUESTION
    const handleEditQuestion = (index: number) => {
        setQuestion(examDetails.questions[index] as any);
        setIsEditMode({ questionIndex: index, answerIndex: null });
        setShowquestionForm(true);
    };

    //EDIT ANSWER
    const handleEditAnswer = (questionIndex: number, answerIndex: number) => {
        const answerToEdit = examDetails.questions[questionIndex].answers[answerIndex] as any;
        setQuestion((prev) => ({
            ...prev,
            answers: prev.answers.map((a, i) => (i === answerIndex ? answerToEdit : a)),
        }));
        setIsEditMode({ questionIndex, answerIndex });
        setShowquestionForm(true);
    };

    //REMOVE QUESTION
    const handleRemoveQuestion = (index:number) => {
        setExamDetails((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }))
    };

    //REMOVE ANSWER
    const handleRemoveAnswer = (questionIndex:number ,answerIndex: number) => {
        console.log('deleted answer', examDetails.questions[questionIndex].answers[answerIndex]);
        setExamDetails((prev) => {
            const updatedQuestions = [...prev.questions];
            updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.filter(
                (_, i) => i !== answerIndex
            );
            console.log('new array', examDetails.questions[answerIndex].answers[answerIndex]);
            return {
                ...prev,
                questions: updatedQuestions,
            };
            
        });
    };  

    console.log('new array', examDetails.questions)
    const handleMakeAnswerCorrect = (index: number) => {
        setQuestion((prev) => ({
            ...prev,
            answers: prev.answers.map((answer, i) => ({
                ...answer,
                isCorrect: i === index,
            })),
        }));
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
                    // handleRemoveAnswer={handleRemoveAnswer}
                />
            )}

            <div className='h-1 bg-white w-full my-7' />

            <h1 className='text-2xl'>{ExamDetails.title}</h1>
            <p className='text-xl mb-5'>{ExamDetails.description}</p>
            <div>
                {examDetails?.questions?.map((item, questionIndex) => (
                    <div key={item?.title} className='my-4 border border-solid border-slate-300 rounded-md p-4'>
                        <div className='flex justify-between flex-col'>
                            <h4 className='text-lg font-bold'>{item?.title}</h4>
                            <div>
                                <button className='mr-2' onClick={() => handleEditQuestion(questionIndex)}>Edit</button>
                                <button onClick={() => handleRemoveQuestion(questionIndex)}>Delete</button>
                            </div>
                        </div>
                        <h5 className='text-base'>{item?.description}</h5>

                        <div className='flex justify-evenly items-center flex-wrap mt-5'>
                            {item?.answers?.map((answer, answerIndex) => (
                                <div className='flex flex-col' key={`${questionIndex} - ${answerIndex}`}>
                                    <div onClick={() => handleMakeAnswerCorrect(answerIndex)} className={`${answer?.isCorrect ? 'bg-green-600' : ''} p-4 border border-solid border-slate-300 rounded-md min-w-28 flex justify-center items-center cursor-pointer`}>
                                        {answer?.title}
                                    </div>
                                    <div>
                                        <button className='mr-3' onClick={(e) => { handleEditAnswer(questionIndex, answerIndex)}}>Edit</button>
                                        <button onClick={(e) => {e.stopPropagation(); handleRemoveAnswer(questionIndex, answerIndex)}}>Delete</button>
                                    </div>
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