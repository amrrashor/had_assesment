import React, {useEffect} from 'react'

//1- we need types
//2- we need dummy data
//3- we need data

const ExamsList = () => {
    useEffect(() => {
        document.title = 'Exams List'
    }, []);
    
    return (
        <div>
            Exams List
        </div>
    )
}

export default ExamsList