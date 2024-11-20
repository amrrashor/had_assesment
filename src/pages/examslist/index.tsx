import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Exam } from '../../types/types';
import { dummyExams } from '../../utils/data';
import { ScrollSpy } from '../../components/ScrollSpy';

const ExamsList = () => {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('exams')) {
      localStorage.setItem('exams', JSON.stringify(dummyExams));
    }
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    setExams(storedExams);
  }, []);

  const handleEditExam = (index: number) => {
    router.push(`/exameditor/${index}`);
  };

  const handleCreateExam = () => {
    router.push('/exameditor/new');
  };

  const handleDeleteExam = (index: number) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      const updatedExams = exams.filter((_, i) => i !== index);
      localStorage.setItem('exams', JSON.stringify(updatedExams));
      setExams(updatedExams);
    }
  };

  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'exams', label: 'All Exams' },
    // Add more sections as needed
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <ScrollSpy sections={sections} />
      
      {/* Hero Section */}
      <div id="hero" className="text-center py-20 bg-white border-b border-[var(--border-light)]">
        <h1 className="text-5xl font-medium text-[#0D0C22] mb-6">
          Discover Your Exams
        </h1>
        <p className="text-[#6E6D7A] text-lg mb-8">
          Create, manage, and organize your exams in one place
        </p>
        <button
          onClick={handleCreateExam}
          className="bg-[#EA4C89] text-white px-6 py-3 rounded-full hover:bg-[#F082AC] transition-colors"
        >
          Create New Exam
        </button>
      </div>

      {/* Exams Section */}
      <div id="exams" className="max-w-6xl mx-auto px-6 py-12">
        {exams.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6E6D7A] text-xl mb-6">
              No exams available. Create your first exam!
            </p>
            <button
              onClick={handleCreateExam}
              className="bg-[#EA4C89] text-white px-6 py-3 rounded-full hover:bg-[#F082AC] transition-colors"
            >
              Create New Exam
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border border-[#E7E7E9]"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#0D0C22] mb-3">
                      {exam.title}
                    </h2>
                    <p className="text-[#6E6D7A] mb-4 line-clamp-2">
                      {exam.description}
                    </p>
                    <div className="flex gap-4 text-sm text-[#6E6D7A]">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        {exam.questions.length} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        {exam.questions.reduce((total, q) => total + q.answers.length, 0)} Answers
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6 pt-6 border-t border-[#E7E7E9]">
                    <button
                      onClick={() => handleEditExam(index)}
                      className="flex-1 px-4 py-2 text-[#0D0C22] bg-[#F3F3F4] rounded-lg hover:bg-[#E7E7E9] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExam(index)}
                      className="flex-1 px-4 py-2 text-white bg-[#EA4C89] rounded-lg hover:bg-[#F082AC] transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsList;