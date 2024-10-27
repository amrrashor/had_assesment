import { ChangeEvent, FormEvent } from "react";

export type ExamList = [{
    id:number | string;
    title: string;
}];

export type Exam = {
    title: string;
    description?: string;
    questions: Question[];
};

export type Question = {
    title: string;
    description?: string;
    answers: Answer[];
};

export type Answer = {
    title: string;
    isCorrect: boolean;
    description?: string;
};

export type formProps = {
    question: Question,
    handleSubmitNewQuestion: (e: FormEvent<HTMLFormElement>) => void;
    handleQuestionChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleAnswerChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
    handleAddNewAnswer: () => void;
};

export type EditProps = { 
    questionIndex: number | null, 
    answerIndex: number | null 
}