import Link from 'next/link';
import ExamsList from './examslist';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="bg-white border-b border-[var(--border-light)]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-semibold text-[var(--text-primary)] mb-6">
            Exam Management System
          </h1>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
            Create, manage, and organize your exams in one place. Get started by creating your first exam.
          </p>
          <Link 
            href="/exameditor/new" 
            className="btn-primary inline-flex items-center gap-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Exam
          </Link>
        </div>
      </div>
      <ExamsList />
    </div>
  );
}
