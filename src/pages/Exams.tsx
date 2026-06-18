import { useState } from 'react';
import { Search, X, Calendar, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { exams } from '../data/exams';
import { ExamCard } from '../components/cards/ExamCard';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const Exams = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExam, setSelectedExam] = useState<typeof exams[0] | null>(null);

  const categories = ['all', 'Engineering', 'Medicine', 'Management', 'Law', 'Government Services'];

  const filteredExams = exams.filter((exam) => {
    const queryMatch =
      exam.name.toLowerCase().includes(query.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(query.toLowerCase());

    const catMatch = selectedCategory === 'all' || exam.category === selectedCategory;

    return queryMatch && catMatch;
  });

  return (
    <div className="relative pt-28 pb-20 min-h-screen">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Title */}
        <div className="text-left mb-8 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
            Entrance Exams Hub
          </h1>
          <p className="text-sm text-app-muted max-w-md">
            Stay updated with registration timelines, counting clocks, criteria details, and syllabuses for competitive tests.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 p-3 rounded-2xl glass border-app-border">
          <div className="flex items-center gap-2 flex-1 w-full pl-2">
            <Search className="w-5 h-5 text-app-muted" />
            <input
              type="text"
              placeholder="Search exam name (e.g. JEE, CAT...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-0 text-sm text-app-text placeholder-app-muted"
            />
          </div>

          {/* Categories select pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-secondary text-white shadow-md shadow-secondary/25'
                    : 'bg-white/5 border border-app-border text-app-muted hover:text-app-text'
                }`}
              >
                {cat === 'all' ? 'All categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        {filteredExams.length === 0 ? (
          <div className="py-20 text-center glass rounded-2xl border-app-border/40">
            <AlertTriangle className="w-10 h-10 text-app-muted/30 mx-auto mb-3" />
            <p className="text-app-muted text-sm font-semibold">No entrance exams match your active query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam) => (
              <ScrollReveal key={exam.id} delay={0} duration={0.4}>
                <ExamCard exam={exam} onOpenDetails={(ex) => setSelectedExam(ex)} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedExam(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xl rounded-2xl border border-app-border bg-app-bg p-6 md:p-8 overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start gap-4 mb-4 border-b border-app-border pb-4">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/15 border border-secondary/20 text-secondary font-bold uppercase tracking-wider">
                  {selectedExam.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-app-text mt-2 leading-tight">
                  {selectedExam.name}
                </h3>
                <p className="text-xs text-app-muted">{selectedExam.fullName}</p>
              </div>
              <button
                onClick={() => setSelectedExam(null)}
                className="p-1 rounded-lg text-app-muted hover:text-app-text hover:bg-white/5 border border-transparent hover:border-app-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-xs text-app-muted mt-5">
              <div>
                <h4 className="font-bold text-app-text uppercase text-secondary tracking-wider mb-1">About The Exam</h4>
                <p className="leading-relaxed text-app-muted">{selectedExam.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-app-border/40 py-4 my-2">
                <div>
                  <h4 className="font-bold text-app-text uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    Difficulty Level
                  </h4>
                  <span className="font-semibold text-danger">{selectedExam.difficulty}</span>
                </div>
                <div>
                  <h4 className="font-bold text-app-text uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    Exam Date
                  </h4>
                  <span className="text-app-text font-semibold">{new Date(selectedExam.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-app-text uppercase tracking-wider mb-1">Eligibility Criteria</h4>
                <p className="leading-normal">{selectedExam.eligibility}</p>
              </div>

              <div>
                <h4 className="font-bold text-app-text uppercase tracking-wider mb-1.5">Exam Pattern</h4>
                <p className="leading-relaxed">{selectedExam.pattern}</p>
              </div>

              <div className="border-t border-app-border/40 pt-4">
                <h4 className="font-bold text-app-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  Subject-wise Syllabus
                </h4>
                <ul className="flex flex-col gap-2 pl-4 list-disc text-app-muted leading-relaxed">
                  {selectedExam.syllabus.map((syll, i) => (
                    <li key={i}>{syll}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedExam(null)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-secondary rounded-xl hover:bg-secondary-hover transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Exams;
