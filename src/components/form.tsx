import { useState, useEffect } from 'react';
import { Exam, Question, Answer } from '../types/types';

interface ExamFormProps {
  initialExam?: Exam;
  onSubmit: (exam: Exam) => void;
  formId?: string;
}

// Add validation types
interface ValidationErrors {
  exam: string[];
  questions: { [key: number]: string[] };
}

export const ExamForm = ({ initialExam, onSubmit, formId = 'exam-form' }: ExamFormProps) => {
  const [exam, setExam] = useState<Exam>(initialExam || {
    title: '',
    description: '',
    questions: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({ exam: [], questions: {} });
  const [isValid, setIsValid] = useState(false);

  // Validation function
  const validateExam = () => {
    const newErrors: ValidationErrors = { exam: [], questions: {} };
    let isValid = true;

    // Validate exam level
    if (!exam.title.trim()) {
      newErrors.exam.push('Exam title is required');
      isValid = false;
    }

    // Validate questions
    if (exam.questions.length === 0) {
      newErrors.exam.push('At least one question is required');
      isValid = false;
    }

    exam.questions.forEach((question, index) => {
      newErrors.questions[index] = [];

      if (!question.title.trim()) {
        newErrors.questions[index].push('Question title is required');
        isValid = false;
      }

      if (question.answers.length < 2) {
        newErrors.questions[index].push('At least two answers are required');
        isValid = false;
      }

      const hasCorrectAnswer = question.answers.some(answer => answer.isCorrect);
      if (!hasCorrectAnswer) {
        newErrors.questions[index].push('One answer must be marked as correct');
        isValid = false;
      }

      const hasEmptyAnswers = question.answers.some(answer => !answer.title.trim());
      if (hasEmptyAnswers) {
        newErrors.questions[index].push('All answers must have a title');
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(isValid);
    return isValid;
  };

  // Run validation whenever exam changes
  useEffect(() => {
    validateExam();
  }, [exam]);

  // Modified submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateExam()) {
      // Get existing exams from localStorage
      const existingExams = JSON.parse(localStorage.getItem('exams') || '[]');
      
      if (initialExam) {
        // Update existing exam
        const examIndex = existingExams.findIndex((e: Exam) => e.title === initialExam.title);
        if (examIndex !== -1) {
          existingExams[examIndex] = exam;
        }
      } else {
        // Add new exam
        existingExams.push(exam);
      }

      // Save to localStorage
      localStorage.setItem('exams', JSON.stringify(existingExams));
      onSubmit(exam);
    }
  };

  // Exam level handlers
  const updateExam = (field: keyof Exam, value: string) => {
    setExam({ ...exam, [field]: value });
  };

  // Question handlers
  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [
        ...exam.questions,
        { title: '', description: '', answers: [] },
      ],
    });
  };

  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setExam({ ...exam, questions: updatedQuestions });
  };

  const removeQuestion = (index: number) => {
    setExam({
      ...exam,
      questions: exam.questions.filter((_, i) => i !== index),
    });
  };

  // Answer handlers
  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[questionIndex].answers.push({
      title: '',
      isCorrect: false,
      description: '',
    });
    setExam({ ...exam, questions: updatedQuestions });
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    field: keyof Answer,
    value: string | boolean
  ) => {
    const updatedQuestions = [...exam.questions];
    const answers = [...updatedQuestions[questionIndex].answers];
    answers[answerIndex] = { ...answers[answerIndex], [field]: value };
    updatedQuestions[questionIndex].answers = answers;
    setExam({ ...exam, questions: updatedQuestions });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[questionIndex].answers = updatedQuestions[
      questionIndex
    ].answers.filter((_, i) => i !== answerIndex);
    setExam({ ...exam, questions: updatedQuestions });
  };

  const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[questionIndex].answers = updatedQuestions[
      questionIndex
    ].answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }));
    setExam({ ...exam, questions: updatedQuestions });
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-8">
      {/* Exam Details */}
      <div className="space-y-6">
        <div>
          <label className="block text-[var(--text-primary)] font-medium mb-2">
            Exam Title
          </label>
          <input
            type="text"
            value={exam.title}
            onChange={(e) => updateExam('title', e.target.value)}
            placeholder="Enter exam title"
            className={`input ${
              errors.exam.includes('Exam title is required') 
                ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20' 
                : ''
            }`}
          />
          {errors.exam.map((error, index) => (
            <p key={index} className="mt-2 text-sm text-[var(--error)]">
              {error}
            </p>
          ))}
        </div>
        <div>
          <label className="block text-[var(--text-primary)] font-medium mb-2">
            Exam Description
          </label>
          <textarea
            value={exam.description}
            onChange={(e) => updateExam('description', e.target.value)}
            placeholder="Enter exam description"
            rows={4}
            className="input resize-none"
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Questions
          </h3>
          <button
            type="button"
            onClick={addQuestion}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Question
          </button>
        </div>

        {exam.questions.map((question, qIndex) => (
          <div key={qIndex} className="card space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-[var(--text-primary)] font-medium mb-2">
                    Question {qIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => updateQuestion(qIndex, 'title', e.target.value)}
                    placeholder="Enter question"
                    className={`input ${
                      errors.questions[qIndex]?.includes('Question title is required')
                        ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20'
                        : ''
                    }`}
                  />
                </div>
                <textarea
                  value={question.description}
                  onChange={(e) => updateQuestion(qIndex, 'description', e.target.value)}
                  placeholder="Enter question description (optional)"
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="ml-4 p-2 text-[var(--text-tertiary)] hover:text-[var(--error)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Answers */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[var(--text-primary)] font-medium">
                  Answers
                </label>
                <button
                  type="button"
                  onClick={() => addAnswer(qIndex)}
                  className="btn-secondary text-sm"
                >
                  Add Answer
                </button>
              </div>

              <div className="space-y-3">
                {question.answers.map((answer, aIndex) => (
                  <div key={aIndex} className="flex items-start gap-4 p-4 bg-[var(--surface-light)] rounded-lg">
                    <div className="pt-2">
                      <input
                        type="radio"
                        checked={answer.isCorrect}
                        onChange={() => setCorrectAnswer(qIndex, aIndex)}
                        className="w-4 h-4 text-[var(--brand-primary)] focus:ring-[var(--brand-light)]"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={answer.title}
                        onChange={(e) => updateAnswer(qIndex, aIndex, 'title', e.target.value)}
                        placeholder="Enter answer"
                        className="input"
                      />
                      <input
                        type="text"
                        value={answer.description || ''}
                        onChange={(e) => updateAnswer(qIndex, aIndex, 'description', e.target.value)}
                        placeholder="Enter explanation (optional)"
                        className="input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAnswer(qIndex, aIndex)}
                      className="p-2 text-[var(--text-tertiary)] hover:text-[var(--error)] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              {errors.questions[qIndex]?.map((error, index) => (
                <p key={index} className="text-sm text-[var(--error)]">
                  {error}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button Section */}
      <div className="sticky bottom-6 flex justify-end pt-6">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-[var(--border-light)] shadow-lg">
          <button
            type="submit"
            disabled={!isValid}
            className={`btn-primary flex items-center gap-2 ${
              !isValid 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[var(--brand-secondary)]'
            }`}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7"
              />
            </svg>
            {initialExam ? 'Save Changes' : 'Create Exam'}
          </button>
          {!isValid && (
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Please fix all errors before submitting
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
