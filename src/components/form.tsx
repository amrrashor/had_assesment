import React from 'react'
import { formProps } from '@/types/types'


const NewQuestionForm = ({
    question, 
    handleSubmitNewQuestion,
    handleQuestionChange,
    handleAnswerChange,
    handleAddNewAnswer,
    
    }:formProps) => {
        
    return (
        <form onSubmit={handleSubmitNewQuestion} className='flex flex-col justify-center w-full my-5 '>
            <input
                className='bg-transparent border border-slate-300 border-solid rounded-md p-5 mb-3' 
                type="text" 
                placeholder='title' 
                value={question.title}
                name='title'
                onChange={handleQuestionChange}
            />
            <textarea 
                className='bg-transparent border border-slate-300 border-solid rounded-md p-5 mb-3' 
                placeholder='description'
                name='description' 
                value={question.description}
                onChange={handleQuestionChange}
            />
            
            <h3 className='text-lg font-semibold mt-4 mb-2'>Answers</h3>
            
            {question.answers.map((answer, index) => (
                <div>
                    <input 
                        type="text"
                        name='title'
                        value={answer.title}
                        placeholder='answer title'
                        className='bg-transparent border border-slate-300 border-solid rounded-md p-3 mb-1'
                        onChange={(e) => handleAnswerChange(index, e)}
                    />
                    <input 
                        type="text" 
                        name='description'
                        value={answer.description}
                        placeholder='description'
                        onChange={(e) => handleAnswerChange(index, e)}
                        className='bg-transparent border border-slate-300 border-solid rounded-md p-3 mb-1'
                    />
                    <label className='inline-flex items-center mt-2'>
                        <input 
                            type="checkbox" 
                            name="isCorrect" 
                            checked={answer.isCorrect}
                            onChange={(e) => handleAnswerChange(index,e)}
                            className='mr-2'
                        />
                        is Correct? 
                    </label>
                    <button
                        type='button'
                        // onClick={() => handleRemoveAnswer(index)}
                        className='text-red-600 underline ml-2'
                    >
                        Remove Answer
                    </button>

                </div>
            ))}
            <button type='button' onClick={handleAddNewAnswer} className='p-2 border border-slate-300 rounded-md mb-3'>
                Add New Answer
            </button>
            <button 
                type='submit' 
                className='bg-transparent border border-slate-300 border-solid rounded-md p-5 mb-3'
            >
                Add Question
            </button>
        </form>
    )
}

export default NewQuestionForm