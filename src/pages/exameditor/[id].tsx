import React, { useEffect } from 'react'

const ExamEditor = () => {
    useEffect(() => {
        document.title = 'Exam Editior'
    }, []);
    
    return (
        <div>ExamEditor</div>
    )
}

export default ExamEditor