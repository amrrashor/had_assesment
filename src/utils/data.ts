import { Exam } from '../types/types';

export const dummyExams: Exam[] = [
    {
        title: "Basic Mathematics Exam",
        description: "This exam tests fundamental concepts in arithmetic and geometry.",
        questions: [
            {
                title: "What is 2 + 2?",
                description: "Choose the correct answer for the sum of 2 and 2.",
                answers: [
                    { title: "3", isCorrect: false, description: "Incorrect answer" },
                    { title: "4", isCorrect: true, description: "Correct answer" },
                    { title: "5", isCorrect: false, description: "Incorrect answer" },
                ]
            },
            {
                title: "Which shape is a triangle?",
                description: "Identify the shape with three sides.",
                answers: [
                    { title: "Square", isCorrect: false, description: "Has four sides" },
                    { title: "Circle", isCorrect: false, description: "Has no sides" },
                    { title: "Triangle", isCorrect: true, description: "Has three sides" },
                    { title: "Rectangle", isCorrect: false, description: "Has four sides" },
                ]
            }
        ]
    },
    {
        title: "Basic Science Exam",
        description: "Test your knowledge of basic scientific concepts.",
        questions: [
            {
                title: "What is H2O?",
                description: "Select the common name for H2O.",
                answers: [
                    { title: "Salt", isCorrect: false, description: "This is NaCl" },
                    { title: "Water", isCorrect: true, description: "Correct! H2O is water" },
                    { title: "Gold", isCorrect: false, description: "This is Au" },
                ]
            }
        ]
    }
];
