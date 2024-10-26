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