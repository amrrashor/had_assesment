import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExamForm } from '../../components/form';
import { dummyExams } from '../../utils/data';
import { Exam } from '../../types/types';

const ExamEditor = () => {
  const router = useRouter();
  const { id } = router.query;
  const [exam, setExam] = useState<Exam | undefined>();

  useEffect(() => {
    if (!localStorage.getItem('exams')) {
      localStorage.setItem('exams', JSON.stringify(dummyExams));
    }

    if (id && id !== 'new') {
      const exams = JSON.parse(localStorage.getItem('exams') || '[]');
      const examData = exams[Number(id)];
      setExam(examData);
    }
  }, [id]);

  const handleSubmit = (updatedExam: Exam) => {
    router.push('/'); // Redirect to exams list
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id === 'new' ? 'Create New Exam' : 'Edit Exam'}
      </h1>
      <ExamForm initialExam={exam} onSubmit={handleSubmit} />
    </div>
  );
};

export default ExamEditor;
