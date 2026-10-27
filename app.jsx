const { useState, useEffect, useMemo, useCallback, useRef } = React;
const FULL_250_QUESTIONS = window.FULL_250_QUESTIONS;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    function CompanyLogo({ className = "h-8" }) {
      const [imgError, setImgError] = useState(false);
      if (!imgError) {
        return <img src="https://opentec.com.br/wp-content/uploads/2022/05/logo_tranparente.png" alt="Logo da Empresa" className={`${className} object-contain`} onError={() => setImgError(true)} />;
      }
      return (
        <div className="flex items-center gap-2.5 select-none">
          <svg className="w-8 h-8" viewBox="0 0 100 60" fill="none">
            <path d="M10 15 C 30 15, 45 48, 52 52 C 58 40, 75 10, 90 5 C 75 20, 58 48, 52 48 C 45 42, 30 20, 10 15 Z" fill="#E8605D" />
          </svg>
          <span className="font-extrabold text-white text-lg tracking-wider uppercase">Opentec Simulator</span>
        </div>
      );
    }

    const Icons = {
      Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.247 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      Award: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      Cards: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      Upload: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
      Flag: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6v3a1 1 0 11-2 0V6z" clipRule="evenodd" /></svg>,
      Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
      X: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
      Bulb: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      Refresh: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      Filter: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
      Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
    };

    function Modal({ isOpen, title, children, onClose, onConfirm, confirmText = "Confirmar", cancelText = "Cancelar", confirmBg = "bg-snGreen text-slate-950" }) {
      if (!isOpen) return null;
      return (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-lg text-white">{title}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition"><Icons.X /></button>
            </div>
            <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
            <div className="flex items-center justify-end gap-3 pt-2">
              {cancelText && (
                <button onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-bold transition">
                  {cancelText}
                </button>
              )}
              {onConfirm && (
                <button onClick={onConfirm} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${confirmBg}`}>
                  {confirmText}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    function isAnswerCorrect(userAns, targetAns) {
      if (userAns === undefined || userAns === null) return false;
      if (Array.isArray(targetAns)) {
        if (!Array.isArray(userAns)) return false;
        if (userAns.length !== targetAns.length) return false;
        const sortedUser = [...userAns].sort();
        const sortedTarget = [...targetAns].sort();
        return sortedUser.every((val, idx) => val === sortedTarget[idx]);
      }
      return userAns === targetAns;
    }

    function App() {
      const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem('sn_csa_questions_v250');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length >= FULL_250_QUESTIONS.length) {
              return parsed;
            }
          } catch(e) {}
        }
        return FULL_250_QUESTIONS;
      });

      const [activeTab, setActiveTab] = useState('dashboard');
      const [examState, setExamState] = useState(null);
      const [selectedHistoryExam, setSelectedHistoryExam] = useState(null);
      const [theme, setTheme] = useState(() => localStorage.getItem('sn_csa_theme') || 'green');
      const [highContrast, setHighContrast] = useState(() => localStorage.getItem('sn_csa_high_contrast') === 'true');
      
      const [practiceIndex, setPracticeIndex] = useState(0);
      const [practiceAnswers, setPracticeAnswers] = useState({});
      const [practiceVerified, setPracticeVerified] = useState({});
      const [showPracticeHint, setShowPracticeHint] = useState(false);
      const [selectedDomainFilter, setSelectedDomainFilter] = useState('ALL');
      
      const [modalConfig, setModalConfig] = useState(null);
      const [reviewFilter, setReviewFilter] = useState('all');

      const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('sn_csa_history');
        return saved ? JSON.parse(saved) : [];
      });

      useEffect(() => {
        localStorage.setItem('sn_csa_questions_v250', JSON.stringify(questions));
      }, [questions]);

      useEffect(() => {
        localStorage.setItem('sn_csa_history', JSON.stringify(history));
      }, [history]);

      useEffect(() => {
        document.body.dataset.theme = theme;
        document.body.dataset.contrast = highContrast ? 'high' : 'normal';
        localStorage.setItem('sn_csa_theme', theme);
        localStorage.setItem('sn_csa_high_contrast', String(highContrast));
      }, [theme, highContrast]);

      const finishExam = useCallback((currentExam) => {
        if (!currentExam || currentExam.isFinished) return currentExam;
        setReviewFilter('all');

        let correctCount = 0;
        const total = currentExam.questions.length;
        const domainResults = {};

        currentExam.questions.forEach(q => {
          const domain = q.domain || "Geral";
          if (!domainResults[domain]) domainResults[domain] = { correct: 0, total: 0 };
          domainResults[domain].total++;

          if (isAnswerCorrect(currentExam.userAnswers[q.id], q.answer)) {
            correctCount++;
            domainResults[domain].correct++;
          }
        });

        const scorePercent = Math.round((correctCount / (total || 1)) * 100);
        const passed = scorePercent >= 70;

        const result = {
          scorePercent,
          correctCount,
          total,
          passed,
          domainResults,
          questionReview: currentExam.questions.map((q, index) => ({
            number: index + 1,
            id: q.id,
            domain: q.domain || 'Geral',
            question: q.question,
            options: q.options,
            correctAnswer: q.answer,
            userAnswer: currentExam.userAnswers[q.id] ?? null,
            isCorrect: isAnswerCorrect(currentExam.userAnswers[q.id], q.answer),
            flaggedForReview: Boolean(currentExam.flags[q.id]),
            explanation: q.explanation || ''
          })),
          timeSpentSec: (90 * 60) - currentExam.timeLeft,
          date: new Date().toLocaleDateString('pt-BR')
        };

        setHistory(prev => [result, ...prev]);

        return {
          ...currentExam,
          isFinished: true,
          result
        };
      }, []);

      const getExamReport = () => ({
        application: 'Opentec Simulator - ServiceNow CSA',
        generatedAt: new Date().toISOString(),
        result: {
          date: examState.result.date,
          scorePercent: examState.result.scorePercent,
          correctCount: examState.result.correctCount,
          incorrectCount: examState.result.total - examState.result.correctCount,
          total: examState.result.total,
          passed: examState.result.passed,
          timeSpentSec: examState.result.timeSpentSec,
          domainResults: examState.result.domainResults || {}
        },
        questions: examState.questions.map((question, index) => {
          const selected = examState.userAnswers[question.id];
          const selectedIndexes = selected === undefined ? [] : Array.isArray(selected) ? selected : [selected];
          const correctIndexes = Array.isArray(question.answer) ? question.answer : [question.answer];
          return {
            number: index + 1,
            id: question.id,
            domain: question.domain || 'Geral',
            question: question.question,
            options: question.options,
            selectedAnswers: selectedIndexes.map(optionIndex => ({ letter: String.fromCharCode(65 + optionIndex), text: question.options[optionIndex] })),
            correctAnswers: correctIndexes.map(optionIndex => ({ letter: String.fromCharCode(65 + optionIndex), text: question.options[optionIndex] })),
            isCorrect: isAnswerCorrect(selected, question.answer),
            flaggedForReview: Boolean(examState.flags[question.id]),
            explanation: question.explanation || ''
          };
        })
      });

      const downloadExamReportJson = () => {
        const report = getExamReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-simulado-csa-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };

      const printExamReport = () => {
        const reportWindow = window.open('', '_blank');
        if (!reportWindow) {
          setModalConfig({
            isOpen: true,
            title: 'Não foi possível abrir o relatório',
            children: 'O navegador bloqueou a nova janela. Permita pop-ups para este site e tente exportar o PDF novamente.',
            cancelText: 'Fechar'
          });
          return;
        }

        const report = getExamReport();
        const result = report.result;
        const questionCards = report.questions.map(item => {
          const selectedText = item.selectedAnswers.length
            ? item.selectedAnswers.map(answer => `${answer.letter}) ${escapeHtml(answer.text)}`).join(', ')
            : 'Não respondida';
          const correctText = item.correctAnswers.map(answer => `${answer.letter}) ${escapeHtml(answer.text)}`).join(', ');
          return `<article class="question ${item.isCorrect ? 'correct' : 'incorrect'}">
            <div class="meta">Questão ${item.number} · ${escapeHtml(item.domain)} · ${item.isCorrect ? 'Acertou' : 'Errou'}${item.flaggedForReview ? ' · Marcada para revisão' : ''}</div>
            <h2>${escapeHtml(item.question)}</h2>
            <p><strong>Sua resposta:</strong> ${selectedText}</p>
            <p><strong>Resposta correta:</strong> ${correctText}</p>
            ${item.explanation ? `<p class="explanation"><strong>Explicação:</strong> ${escapeHtml(item.explanation)}</p>` : ''}
          </article>`;
        }).join('');
        const domainRows = Object.entries(result.domainResults).map(([domain, stat]) =>
          `<tr><td>${escapeHtml(domain)}</td><td>${stat.correct} / ${stat.total}</td><td>${stat.total ? Math.round(stat.correct / stat.total * 100) : 0}%</td></tr>`
        ).join('');
        const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Relatório do Simulado CSA</title>
          <style>
            body{font:14px Arial,sans-serif;color:#17202a;margin:32px;line-height:1.45}h1{margin:0 0 8px;color:#123b31}h2{font-size:16px;margin:8px 0}p{margin:5px 0}.summary{padding:16px;background:#f1f5f4;border-radius:8px;margin:18px 0}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.question{padding:14px;margin:12px 0;border:1px solid #cbd5e1;border-left:5px solid #dc2626;border-radius:6px;break-inside:avoid}.question.correct{border-left-color:#16825d}.meta{font-size:12px;color:#475569;font-weight:bold}.explanation{margin-top:8px;padding:8px;background:#f8fafc}table{border-collapse:collapse;width:100%;margin:10px 0 20px}th,td{text-align:left;padding:7px;border-bottom:1px solid #cbd5e1}@media print{body{margin:16mm}.question{break-inside:avoid}button{display:none}}
          </style></head><body>
          <h1>Relatório do Simulado ServiceNow CSA</h1><p>Concluído em ${escapeHtml(result.date)} · Gerado em ${escapeHtml(new Date(report.generatedAt).toLocaleString('pt-BR'))}</p>
          <section class="summary"><div class="summary-grid"><div><strong>Resultado</strong><br>${result.passed ? 'Aprovado' : 'Reprovado'}</div><div><strong>Pontuação</strong><br>${result.scorePercent}% (${result.correctCount}/${result.total})</div><div><strong>Tempo</strong><br>${Math.floor(result.timeSpentSec / 60)} min ${result.timeSpentSec % 60} s</div></div></section>
          <h2>Desempenho por domínio</h2><table><thead><tr><th>Domínio</th><th>Acertos</th><th>Percentual</th></tr></thead><tbody>${domainRows}</tbody></table>
          <h2>Revisão detalhada</h2>${questionCards}
          <script>window.onload=function(){window.focus();window.print();};<\/script></body></html>`;
        reportWindow.document.open();
        reportWindow.document.write(html);
        reportWindow.document.close();
      };

      // Cronômetro
      useEffect(() => {
        let timer;
        if (examState && examState.isFinished === false && examState.timeLeft > 0) {
          timer = setInterval(() => {
            setExamState(prev => {
              if (!prev || prev.isFinished) return prev;
              if (prev.timeLeft <= 1) {
                clearInterval(timer);
                return finishExam(prev);
              }
              return { ...prev, timeLeft: prev.timeLeft - 1 };
            });
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [examState?.isFinished, examState?.timeLeft, finishExam]);

      // INICIAR SIMULADO COM ALGORITMO FISHER-YATES
      const startExam = (qCount = 60) => {
        const shuffled = shuffleArray(questions);
        const selected = shuffled.slice(0, Math.min(qCount, questions.length));

        setExamState({
          questions: selected,
          currentIndex: 0,
          userAnswers: {},
          flags: {},
          timeLeft: 90 * 60,
          startTime: new Date().toISOString(),
          isFinished: false,
          result: null
        });
        setReviewFilter('all');
        setActiveTab('exam');
      };

      const clearHistory = () => {
        setModalConfig({
          isOpen: true,
          title: "Limpar Histórico",
          children: "Tem certeza que deseja apagar todo o seu histórico de simulados? Esta ação não pode ser desfeita.",
          confirmText: "Sim, apagar",
          confirmBg: "bg-companyRed hover:bg-companyRedHover text-white",
          onConfirm: () => {
            setHistory([]);
            setModalConfig(null);
          }
        });
      };

      const domains = useMemo(() => {
        const set = new Set(questions.map(q => q.domain || "Geral"));
        return Array.from(set);
      }, [questions]);

      const domainStats = useMemo(() => {
        const stats = {};
        history.forEach(exam => {
          Object.entries(exam.domainResults || {}).forEach(([domain, result]) => {
            if (!stats[domain]) stats[domain] = { correct: 0, total: 0 };
            stats[domain].correct += Number(result.correct) || 0;
            stats[domain].total += Number(result.total) || 0;
          });
        });
        return stats;
      }, [history]);

      const filteredPracticeQuestions = useMemo(() => {
        if (selectedDomainFilter === 'ALL') return questions;
        return questions.filter(q => (q.domain || 'Geral') === selectedDomainFilter);
      }, [questions, selectedDomainFilter]);

      const handleOptionSelect = (q, oIdx, isExam = false) => {
        const isMulti = Array.isArray(q.answer);

        if (isExam) {
          setExamState(prev => {
            const currentAns = prev.userAnswers[q.id];
            let newAns;
            if (isMulti) {
              const arr = Array.isArray(currentAns) ? [...currentAns] : [];
              if (arr.includes(oIdx)) newAns = arr.filter(i => i !== oIdx);
              else newAns = [...arr, oIdx];
            } else {
              newAns = oIdx;
            }
            return {
              ...prev,
              userAnswers: { ...prev.userAnswers, [q.id]: newAns }
            };
          });
        } else {
          if (practiceVerified[q.id]) return;

          setPracticeAnswers(prev => {
            const currentAns = prev[q.id];
            if (isMulti) {
              const arr = Array.isArray(currentAns) ? [...currentAns] : [];
              if (arr.includes(oIdx)) return { ...prev, [q.id]: arr.filter(i => i !== oIdx) };
              return { ...prev, [q.id]: [...arr, oIdx] };
            }
            return { ...prev, [q.id]: oIdx };
          });
        }
      };

      // Função para rolar para o topo suavemente ao trocar de questão no treino
      const scrollToTop = () => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      return (
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-slate-950 border-b border-slate-800 px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 shadow-xl">
            <div className="flex items-center gap-4">
              <CompanyLogo className="h-9" />
              <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
              <div>
                <h1 className="text-base font-bold text-white tracking-wide">ServiceNow CSA Exam</h1>
                <p className="text-xs text-slate-400">Banco de estudos com {questions.length} questões</p>
              </div>
            </div>

            <nav className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold overflow-x-auto max-w-full">
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-snGreen text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'}`}>
                <Icons.Award /> Visão Geral
              </button>
              <button onClick={() => setActiveTab('exam')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${activeTab === 'exam' ? 'bg-snGreen text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'}`}>
                <Icons.Clock /> Simulado {examState && !examState.isFinished && <span className="w-2 h-2 rounded-full bg-companyRed animate-ping"></span>}
              </button>
              <button onClick={() => setActiveTab('practice')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${activeTab === 'practice' ? 'bg-snGreen text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'}`}>
                <Icons.Book /> Treino
              </button>
              <button onClick={() => setActiveTab('flashcards')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${activeTab === 'flashcards' ? 'bg-snGreen text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'}`}>
                <Icons.Cards /> Flashcards
              </button>
              <button onClick={() => setActiveTab('manager')} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${activeTab === 'manager' ? 'bg-snGreen text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'}`}>
                <Icons.Upload /> Banco
              </button>
            </nav>
            <div className="flex items-center gap-2 shrink-0">
              <label className="sr-only" htmlFor="theme-select">Tema de cores</label>
              <select
                id="theme-select"
                value={theme}
                onChange={e => setTheme(e.target.value)}
                aria-label="Tema de cores"
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-snGreen"
              >
                <option value="green">Verde</option>
                <option value="ocean">Oceano</option>
                <option value="violet">Violeta</option>
                <option value="amber">Âmbar</option>
              </select>
              <button
                type="button"
                aria-pressed={highContrast}
                onClick={() => setHighContrast(value => !value)}
                className={`px-2.5 py-2 text-xs font-bold rounded-lg border transition ${highContrast ? 'bg-snGreen/20 border-snGreen text-snGreen' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'}`}
              >
                {highContrast ? 'Alto contraste: ligado' : 'Alto contraste'}
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 rounded-2xl border border-slate-700/80 relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 max-w-3xl space-y-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo className="h-7" />
                      <span className="px-3 py-0.5 bg-companyRed/20 text-companyRed text-xs font-extrabold rounded-full border border-companyRed/30 uppercase tracking-wider">
                        Certificação ServiceNow CSA
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">Preparatório Oficial de Estudos</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Plataforma pronta com todas as <strong className="text-snGreen">{questions.length} questões</strong> do banco de dados oficial. Simule exames de 60 questões em 90 minutos ou pratique individualmente por domínios da prova.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => setActiveTab('exam')} className="px-5 py-3 bg-snGreen hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg flex items-center gap-2 text-sm">
                        <Icons.Clock /> {examState && !examState.isFinished ? 'Continuar Simulado' : 'Ir para Simulado'}
                      </button>
                      <button onClick={() => setActiveTab('practice')} className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition flex items-center gap-2 border border-slate-700 text-sm">
                        <Icons.Book /> Praticar no Modo Treino
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
                    <div className="text-slate-400 text-xs uppercase font-bold mb-1">Total de Questões</div>
                    <div className="text-3xl font-extrabold text-white">{questions.length}</div>
                    <div className="text-xs text-slate-400 mt-2">No banco de dados local</div>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
                    <div className="text-slate-400 text-xs uppercase font-bold mb-1">Simulados Feitos</div>
                    <div className="text-3xl font-extrabold text-white">{history.length}</div>
                    <div className="text-xs text-slate-400 mt-2">{history.length > 0 ? `Última nota: ${history[0].scorePercent}%` : 'Nenhum simulado feito'}</div>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
                    <div className="text-slate-400 text-xs uppercase font-bold mb-1">Taxa de Aprovação</div>
                    <div className="text-3xl font-extrabold text-snGreen">
                      {history.length > 0 ? `${Math.round((history.filter(h => h.passed).length / history.length) * 100)}%` : '0%'}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">Nota de corte: ≥ 70%</div>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-white mb-4">Desempenho por Domínio do Exame</h3>
                  {Object.keys(domainStats).length === 0 ? (
                    <p className="text-slate-400 text-sm">{history.length > 0 ? 'Os simulados do histórico foram feitos antes da coleta de dados por domínio. Conclua um novo simulado para começar a ver seu desempenho.' : 'Conclua um simulado para ver seu desempenho em cada domínio.'}</p>
                  ) : (
                    <div className="space-y-4">
                      {domains.map(domain => {
                        const stat = domainStats[domain];
                        const percentage = stat?.total ? Math.round((stat.correct / stat.total) * 100) : null;
                        return (
                          <div key={domain} className="space-y-1">
                            <div className="flex justify-between gap-4 text-xs font-semibold text-slate-300">
                              <span>{domain}</span>
                              <span>{percentage === null ? 'Sem dados' : `${percentage}% (${stat.correct}/${stat.total})`}</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden" aria-label={percentage === null ? `${domain}: sem dados` : `${domain}: ${percentage}% de acertos`}>
                              <div className={`h-2 rounded-full transition-all ${percentage === null ? 'bg-slate-700' : percentage < 70 ? 'bg-companyRed' : 'bg-snGreen'}`} style={{ width: `${percentage ?? 0}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <p className="text-slate-500 text-xs mt-4">Média acumulada dos simulados concluídos. O histórico anterior à atualização não contém respostas por domínio.</p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Icons.Award /> Histórico de Simulados</h3>
                    {history.length > 0 && (
                      <button onClick={clearHistory} className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition">
                        <Icons.Trash /> Limpar Histórico
                      </button>
                    )}
                  </div>
                  {history.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">Nenhum simulado concluído ainda.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                          <tr>
                            <th className="p-3 rounded-tl-lg">Data</th>
                            <th className="p-3">Tempo</th>
                            <th className="p-3">Acertos</th>
                            <th className="p-3">Pontuação</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 rounded-tr-lg">Respostas</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {history.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-750 transition">
                              <td className="p-3">{item.date}</td>
                              <td className="p-3">{Math.floor(item.timeSpentSec / 60)}m {item.timeSpentSec % 60}s</td>
                              <td className="p-3">{item.correctCount} / {item.total}</td>
                              <td className="p-3 font-semibold text-white">{item.scorePercent}%</td>
                              <td className="p-3">
                                {item.passed ? (
                                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">APROVADO</span>
                                ) : (
                                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-bold">REPROVADO</span>
                                )}
                              </td>
                              <td className="p-3">
                                {item.questionReview?.length ? (
                                  <button onClick={() => setSelectedHistoryExam(item)} className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition">
                                    Visualizar
                                  </button>
                                ) : (
                                  <span className="text-xs text-slate-500" title="As respostas não foram salvas para este simulado antigo">Indisponível</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODO SIMULADO */}
            {activeTab === 'exam' && (
              <div className="space-y-6">
                {!examState ? (
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center space-y-6 shadow-xl max-w-2xl mx-auto mt-10">
                    <div className="inline-flex p-4 rounded-full border-2 bg-slate-900 border-snGreen text-snGreen">
                      <Icons.Clock />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Simulado ServiceNow CSA</h2>
                      <p className="text-slate-400 text-sm">
                        O simulado é composto por <strong className="text-white">60 questões</strong> escolhidas aleatoriamente do banco de dados. 
                        Você terá <strong className="text-white">90 minutos</strong> para concluir.
                      </p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl text-left text-sm text-slate-300 space-y-2 border border-slate-700/80">
                      <p><strong className="text-white">Instruções:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>O tempo começará a contar assim que você clicar em "Iniciar Simulado".</li>
                        <li>Você pode marcar questões para revisar depois usando a opção "Marcar p/ Revisão".</li>
                        <li>A nota para aprovação é de 70%.</li>
                        <li>Não feche ou atualize a página, caso contrário o seu progresso será perdido.</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => startExam(60)} 
                      className="px-6 py-3 bg-snGreen hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 w-full sm:w-auto mx-auto shadow-lg"
                    >
                      <Icons.Clock /> Iniciar Simulado Agora
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cabeçalho do Simulado (Cronômetro / Barra Progresso) */}
                    <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                            <Icons.Clock />
                            <span className={`text-lg font-bold font-mono tracking-wider ${
                              examState.timeLeft < 300 && !examState.isFinished ? 'text-companyRed animate-pulse' : 'text-white'
                            }`}>
                              {Math.floor(examState.timeLeft / 60).toString().padStart(2, '0')}:
                              {(examState.timeLeft % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                          {!examState.isFinished && (
                            <span className="text-xs font-bold text-slate-400">
                              Questão {examState.currentIndex + 1} de {examState.questions.length}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {!examState.isFinished ? (
                            <button 
                              onClick={() => {
                                setModalConfig({
                                  isOpen: true,
                                  title: "Finalizar simulado",
                                  children: "Deseja realmente entregar a prova agora e ver sua pontuação final?",
                                  confirmText: "Sim, entregar prova",
                                  confirmBg: "bg-companyRed hover:bg-companyRedHover text-white",
                                  onConfirm: () => {
                                    setExamState(prev => finishExam(prev));
                                    setModalConfig(null);
                                  }
                                });
                              }}
                              className="px-4 py-2 bg-companyRed hover:bg-companyRedHover text-white font-bold text-xs rounded-lg transition shadow"
                            >
                              Entregar simulado
                            </button>
                          ) : (
                            <button onClick={() => setExamState(null)} className="px-4 py-2 bg-snGreen hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1 shadow">
                              <Icons.Refresh /> Novo simulado
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Barra de Progresso Simulado */}
                      {!examState.isFinished && (
                        <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
                          <div 
                            className="bg-snGreen h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${(Object.keys(examState.userAnswers).length / examState.questions.length) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>

                    {/* Revisão / Tela de Resultados */}
                    {examState.isFinished ? (
                      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center space-y-6 shadow-xl relative">
                        <div className={`inline-flex p-4 rounded-full border-2 ${examState.result.passed ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-rose-500/10 border-rose-500 text-rose-400'}`}>
                          <Icons.Award />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-1">
                            {examState.result.passed ? 'Parabéns! Você foi Aprovado!' : 'Nota insuficiente para aprovação.'}
                          </h2>
                          <p className="text-slate-400 text-sm">Sua pontuação foi de <strong className="text-white font-bold">{examState.result.scorePercent}%</strong> (Corte: 70%).</p>
                        </div>

                        <div className="flex justify-center gap-8 py-4 border-y border-slate-700">
                          <div>
                            <div className="text-slate-400 text-xs uppercase font-bold">Acertos</div>
                            <div className="text-2xl font-extrabold text-emerald-400">{examState.result.correctCount} / {examState.result.total}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 text-xs uppercase font-bold">Erros</div>
                            <div className="text-2xl font-extrabold text-rose-400">{examState.result.total - examState.result.correctCount}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                          <button onClick={downloadExamReportJson} className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-xs font-bold rounded-lg transition">
                            Baixar relatório JSON
                          </button>
                          <button onClick={printExamReport} className="px-4 py-2.5 bg-snGreen hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition">
                            Imprimir / Salvar como PDF
                          </button>
                        </div>

                        <div className="text-left space-y-4 pt-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-lg">Revisão Detalhada:</h3>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { id: 'all', label: 'Todas', count: examState.questions.length },
                                { id: 'errors', label: 'Apenas Erros', count: examState.questions.filter(q => !isAnswerCorrect(examState.userAnswers[q.id], q.answer)).length },
                                { id: 'flagged', label: 'Marcadas', count: examState.questions.filter(q => examState.flags[q.id]).length, icon: true }
                              ].map(filter => (
                                <button
                                  key={filter.id}
                                  onClick={() => setReviewFilter(filter.id)}
                                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${reviewFilter === filter.id ? 'bg-snGreen/20 border-snGreen/50 text-snGreen' : 'bg-slate-700 border-slate-600 text-slate-300 hover:text-white'}`}
                                >
                                  {filter.icon && <Icons.Flag />} {filter.label} ({filter.count})
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                            {reviewFilter === 'flagged' && !examState.questions.some(q => examState.flags[q.id]) ? (
                              <p className="text-slate-400 text-sm italic py-4">Nenhuma questão foi marcada para revisão durante este simulado.</p>
                            ) : reviewFilter === 'errors' && examState.questions.every(q => isAnswerCorrect(examState.userAnswers[q.id], q.answer)) ? (
                              <p className="text-slate-400 text-sm italic py-4">Nenhuma questão incorreta neste simulado.</p>
                            ) : examState.questions.map((q, idx) => {
                              const userAns = examState.userAnswers[q.id];
                              const isCorrect = isAnswerCorrect(userAns, q.answer);
                              const isMulti = Array.isArray(q.answer);
                              const isFlagged = examState.flags[q.id];
                              
                              if (reviewFilter === 'errors' && isCorrect) return null;
                              if (reviewFilter === 'flagged' && !isFlagged) return null;

                              return (
                                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-rose-950/20 border-rose-800/40'}`}>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                                        Q{idx + 1} • {q.domain || 'Geral'} {isMulti && '(Múltipla Escolha)'}
                                      </span>
                                      {isFlagged && (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                                          <Icons.Flag /> Marcada p/ Revisão
                                        </span>
                                      )}
                                    </div>
                                    <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                      {isCorrect ? 'Acertou' : 'Errou'}
                                    </span>
                                  </div>
                                  <p className="font-medium text-white text-sm mb-3">{q.question}</p>
                                  
                                  <div className="space-y-1.5 text-xs">
                                    {q.options.map((opt, oIdx) => {
                                      const isSelected = isMulti ? (Array.isArray(userAns) && userAns.includes(oIdx)) : userAns === oIdx;
                                      const isTarget = isMulti ? q.answer.includes(oIdx) : q.answer === oIdx;

                                      let bgClass = "bg-slate-900/40 text-slate-400 border border-transparent";
                                      if (isTarget) bgClass = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold";
                                      else if (isSelected && !isTarget) bgClass = "bg-rose-500/20 text-rose-300 border border-rose-500/40";

                                      return (
                                        <div key={oIdx} className={`p-2.5 rounded-lg flex items-center justify-between ${bgClass}`}>
                                          <span>{String.fromCharCode(65 + oIdx)}) {opt}</span>
                                          {isTarget && <Icons.Check />}
                                          {isSelected && !isTarget && <Icons.X />}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {q.explanation && (
                                    <div className="mt-3 text-xs bg-slate-900 p-3 rounded-lg text-slate-300 border border-slate-700/80">
                                      <strong className="text-snGreen">Explicação:</strong> {q.explanation}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Questão Atual no Simulado
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-lg">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-snGreen uppercase tracking-wider">
                                {examState.questions[examState.currentIndex].domain || 'Geral'}
                              </span>
                              {Array.isArray(examState.questions[examState.currentIndex].answer) && (
                                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded font-bold">
                                  Selecione {examState.questions[examState.currentIndex].answer.length} opções
                                </span>
                              )}
                            </div>

                            <h2 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
                              {examState.questions[examState.currentIndex].question}
                            </h2>

                            <div className="space-y-3">
                              {examState.questions[examState.currentIndex].options.map((opt, oIdx) => {
                                const q = examState.questions[examState.currentIndex];
                                const isMulti = Array.isArray(q.answer);
                                const userAns = examState.userAnswers[q.id];
                                const isSelected = isMulti ? (Array.isArray(userAns) && userAns.includes(oIdx)) : userAns === oIdx;

                                return (
                                  <button 
                                    key={oIdx}
                                    onClick={() => handleOptionSelect(q, oIdx, true)}
                                    className={`w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between ${
                                      isSelected 
                                        ? 'bg-snGreen/10 border-snGreen text-white font-medium shadow-md' 
                                        : 'bg-slate-900/50 border-slate-700/80 text-slate-300 hover:bg-slate-700/50'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-snGreen text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                                        {String.fromCharCode(65 + oIdx)}
                                      </span>
                                      <span>{opt}</span>
                                    </div>
                                    {isSelected && <Icons.Check />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                            <button 
                              disabled={examState.currentIndex === 0}
                              onClick={() => setExamState(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }))}
                              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition"
                            >
                              Anterior
                            </button>
                            
                            <button
                              onClick={() => {
                                const currentQId = examState.questions[examState.currentIndex].id;
                                setExamState(prev => ({
                                  ...prev,
                                  flags: {
                                    ...prev.flags,
                                    [currentQId]: !prev.flags[currentQId]
                                  }
                                }));
                              }}
                              className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1 border ${
                                examState.flags[examState.questions[examState.currentIndex].id] 
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                              }`}
                            >
                              <Icons.Flag /> 
                              {examState.flags[examState.questions[examState.currentIndex].id] ? 'Marcada para Revisão' : 'Marcar p/ Revisão'}
                            </button>

                            <button 
                              disabled={examState.currentIndex === examState.questions.length - 1}
                              onClick={() => setExamState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }))}
                              className="px-5 py-2 bg-snGreen hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition shadow"
                            >
                              Próxima
                            </button>
                          </div>
                        </div>

                        {/* Mapa de Questões Lateral */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 h-fit space-y-4 shadow-lg">
                          <h3 className="font-bold text-white text-sm">Mapa das Questões</h3>
                          <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                            {examState.questions.map((q, idx) => {
                              const userAns = examState.userAnswers[q.id];
                              const isAnswered = Array.isArray(userAns) ? userAns.length > 0 : userAns !== undefined;
                              const isFlagged = examState.flags[q.id];
                              const isCurrent = examState.currentIndex === idx;

                              let bg = "bg-slate-900 text-slate-400 border-slate-700";
                              if (isCurrent) bg = "ring-2 ring-snGreen bg-slate-700 text-white";
                              else if (isAnswered) bg = "bg-snGreen/20 border-snGreen/40 text-snGreen font-bold";

                              return (
                                <button
                                  key={idx}
                                  onClick={() => setExamState(prev => ({ ...prev, currentIndex: idx }))}
                                  className={`relative h-9 rounded-lg text-xs font-bold border flex items-center justify-center transition ${bg}`}
                                >
                                  {idx + 1}
                                  {isFlagged && <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-400"></span>}
                                </button>
                              );
                            })}
                          </div>

                          <div className="text-xs space-y-2 pt-2 border-t border-slate-700 text-slate-400">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-snGreen/20 border border-snGreen/40"></span> Respondida</div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-slate-900 border border-slate-700"></span> Pendente</div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Sinalizada</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* MODO TREINO */}
            {activeTab === 'practice' && questions.length > 0 && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                  <span className="text-xs font-bold text-slate-300 uppercase">Filtrar por Domínio ServiceNow:</span>
                  <select 
                    value={selectedDomainFilter}
                    onChange={(e) => {
                      setSelectedDomainFilter(e.target.value);
                      setPracticeIndex(0);
                    }}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-snGreen w-full sm:w-auto custom-scrollbar"
                  >
                    <option value="ALL">Todos os Domínios ({questions.length})</option>
                    {domains.map((dom, dIdx) => (
                      <option key={dIdx} value={dom}>{dom}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6 shadow-xl">
                  <div className="pb-4 border-b border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-snGreen uppercase tracking-wider">
                        {filteredPracticeQuestions[practiceIndex]?.domain || 'Geral'}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        Questão {practiceIndex + 1} de {filteredPracticeQuestions.length}
                      </span>
                    </div>
                    {/* Barra de Progresso Treino */}
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-snGreen h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${((practiceIndex + 1) / filteredPracticeQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-white leading-relaxed">
                    {filteredPracticeQuestions[practiceIndex]?.question}
                  </h2>

                  <div className="space-y-3">
                    {filteredPracticeQuestions[practiceIndex]?.options.map((opt, oIdx) => {
                      const currentQ = filteredPracticeQuestions[practiceIndex];
                      const isMulti = Array.isArray(currentQ?.answer);
                      const userChoice = practiceAnswers[currentQ?.id];
                      const isTarget = isMulti ? currentQ?.answer.includes(oIdx) : currentQ?.answer === oIdx;
                      const isSelected = isMulti ? (Array.isArray(userChoice) && userChoice.includes(oIdx)) : userChoice === oIdx;
                      const isVerified = practiceVerified[currentQ?.id];

                      let style = "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-700/50";
                      
                      if (isVerified) {
                        if (isTarget) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                        else if (isSelected) style = "bg-rose-500/20 border-rose-500 text-rose-300 font-semibold";
                        else style = "bg-slate-900/20 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed";
                      } else if (isSelected) {
                        style = "bg-snGreen/10 border-snGreen text-white font-medium shadow-md";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isVerified}
                          onClick={() => handleOptionSelect(currentQ, oIdx, false)}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isVerified && isTarget ? 'bg-emerald-500 text-slate-950' : (isSelected ? 'bg-snGreen text-slate-950' : 'bg-slate-700 text-slate-300')}`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isVerified && isTarget && <Icons.Check />}
                          {isVerified && isSelected && !isTarget && <Icons.X />}
                          {!isVerified && isSelected && <Icons.Check />}
                        </button>
                      );
                    })}
                  </div>

                  {(() => {
                    const currentQ = filteredPracticeQuestions[practiceIndex];
                    const userChoice = practiceAnswers[currentQ?.id];
                    const hasSelection = Array.isArray(currentQ?.answer) 
                      ? (Array.isArray(userChoice) && userChoice.length > 0) 
                      : userChoice !== undefined;
                    const isVerified = practiceVerified[currentQ?.id];

                    return !isVerified ? (
                      <div className="flex justify-end pt-2">
                        <button
                          disabled={!hasSelection}
                          onClick={() => setPracticeVerified(prev => ({ ...prev, [currentQ.id]: true }))}
                          className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition shadow-md"
                        >
                          Verificar Resposta
                        </button>
                      </div>
                    ) : null;
                  })()}

                  {filteredPracticeQuestions[practiceIndex]?.hint && (
                    <div>
                      <button onClick={() => setShowPracticeHint(!showPracticeHint)} className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                        <Icons.Bulb /> {showPracticeHint ? 'Ocultar Dica' : 'Ver Dica'}
                      </button>
                      {showPracticeHint && (
                        <div className="mt-2 text-xs bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-amber-200">
                          {filteredPracticeQuestions[practiceIndex].hint}
                        </div>
                      )}
                    </div>
                  )}

                  {practiceVerified[filteredPracticeQuestions[practiceIndex]?.id] && (
                    <div className="bg-slate-900 border border-snGreen/40 p-4 rounded-xl text-xs space-y-1.5 shadow-inner">
                      <strong className="text-snGreen block text-sm">Explicação Oficial:</strong>
                      <p className="text-slate-200 leading-relaxed">
                        {filteredPracticeQuestions[practiceIndex]?.explanation || 'Sem explicação cadastrada para esta questão.'}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <button
                      disabled={practiceIndex === 0}
                      onClick={() => { setShowPracticeHint(false); setPracticeIndex(prev => prev - 1); scrollToTop(); }}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition"
                    >
                      Anterior
                    </button>

                    <button
                      disabled={practiceIndex === filteredPracticeQuestions.length - 1}
                      onClick={() => { setShowPracticeHint(false); setPracticeIndex(prev => prev + 1); scrollToTop(); }}
                      className="px-5 py-2 bg-snGreen hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition shadow"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FLASHCARDS */}
            {activeTab === 'flashcards' && (
              <div className="max-w-xl mx-auto space-y-6">
                <FlashcardViewer questions={questions} />
              </div>
            )}

            {/* GERENCIADOR / BANCO */}
            {activeTab === 'manager' && (
              <div className="space-y-6">
                <QuestionImporter 
                  questions={questions} 
                  setQuestions={setQuestions} 
                  setModalConfig={setModalConfig} 
                />
              </div>
            )}
          </main>

          <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 text-center py-5 text-xs mt-auto space-y-1">
            <p className="font-semibold text-slate-400">© 2026 Opentec Simulator. Todos os direitos reservados.</p>
            <p>Este simulador é uma ferramenta de estudo e não é afiliado à ServiceNow.</p>
            <p>Desenvolvido por <strong className="text-slate-400">João Pedro S. Vasconcelos</strong> e <strong className="text-slate-400">José Guilherme</strong></p>
          </footer>

          <Modal {...modalConfig} isOpen={!!modalConfig?.isOpen} onClose={() => setModalConfig(null)} />
          {selectedHistoryExam && <ExamHistoryModal exam={selectedHistoryExam} onClose={() => setSelectedHistoryExam(null)} />}
        </div>
      );
    }

    function ExamHistoryModal({ exam, onClose }) {
      return (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="history-exam-title">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between gap-4 p-5 border-b border-slate-700">
              <div>
                <h2 id="history-exam-title" className="text-lg font-bold text-white">Revisão do simulado de {exam.date}</h2>
                <p className="text-xs text-slate-400 mt-1">Nota: {exam.scorePercent}% · {exam.correctCount}/{exam.total} acertos · {exam.passed ? 'Aprovado' : 'Reprovado'}</p>
              </div>
              <button onClick={onClose} aria-label="Fechar revisão" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition"><Icons.X /></button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-4">
              {exam.questionReview.map(item => {
                const userAnswers = item.userAnswer === null ? [] : Array.isArray(item.userAnswer) ? item.userAnswer : [item.userAnswer];
                const correctAnswers = Array.isArray(item.correctAnswer) ? item.correctAnswer : [item.correctAnswer];
                return (
                  <article key={`${item.number}-${item.id}`} className={`p-4 rounded-xl border ${item.isCorrect ? 'bg-emerald-950/20 border-emerald-800/50' : 'bg-rose-950/20 border-rose-800/50'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-slate-300">Questão {item.number} · {item.domain}</span>
                      <div className="flex items-center gap-2">
                        {item.flaggedForReview && <span className="text-xs font-bold text-amber-400 flex items-center gap-1"><Icons.Flag /> Marcada</span>}
                        <span className={`text-xs font-bold ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>{item.isCorrect ? 'Acertou' : 'Errou'}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-3">{item.question}</h3>
                    <div className="space-y-2">
                      {item.options.map((option, optionIndex) => {
                        const isSelected = userAnswers.includes(optionIndex);
                        const isCorrectOption = correctAnswers.includes(optionIndex);
                        const optionStyle = isCorrectOption
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                          : isSelected
                            ? 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                            : 'bg-slate-900/50 border-slate-700 text-slate-300';
                        return (
                          <div key={optionIndex} className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs ${optionStyle}`}>
                            <span className="font-bold shrink-0">{String.fromCharCode(65 + optionIndex)}.</span>
                            <span>{option}</span>
                            {isSelected && <span className="ml-auto shrink-0 font-bold">Sua resposta</span>}
                          </div>
                        );
                      })}
                    </div>
                    {item.userAnswer === null && <p className="text-xs text-rose-300 mt-2">Questão não respondida.</p>}
                    {item.explanation && <p className="text-xs text-slate-300 bg-slate-900/70 border border-slate-700 rounded-lg p-3 mt-3"><strong className="text-snGreen">Explicação:</strong> {item.explanation}</p>}
                  </article>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-700 flex justify-end">
              <button onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition">Fechar revisão</button>
            </div>
          </div>
        </div>
      );
    }

    function FlashcardViewer({ questions }) {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [flipped, setFlipped] = useState(false);

      if (!questions || questions.length === 0) return null;
      const q = questions[currentIndex];
      const isMulti = Array.isArray(q.answer);

      return (
        <div className="space-y-4 perspective-1000">
          <div className="text-center text-xs text-slate-400 font-semibold">
            Flashcard {currentIndex + 1} de {questions.length} • Clique no cartão para virar
          </div>

          <div 
            onClick={() => setFlipped(!flipped)}
            className="relative w-full h-80 cursor-pointer transform-style-3d transition-transform duration-500 shadow-2xl"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* FRONT OF CARD */}
            <div className="absolute inset-0 bg-slate-800 border-2 border-slate-700 hover:border-snGreen rounded-2xl p-6 flex flex-col justify-between items-center text-center backface-hidden">
              <span className="text-xs font-bold text-snGreen uppercase">{q.domain || 'ServiceNow CSA'}</span>
              <div className="my-auto">
                <div className="text-xs text-slate-400 uppercase font-bold mb-2">PERGUNTA</div>
                <h3 className="text-lg font-bold text-white">{q.question}</h3>
              </div>
              <div className="text-xs text-slate-500 font-medium">Clique para revelar a resposta</div>
            </div>

            {/* BACK OF CARD */}
            <div className="absolute inset-0 bg-slate-800 border-2 border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180">
              <span className="text-xs font-bold text-emerald-400 uppercase">Resposta</span>
              <div className="my-auto space-y-3 w-full">
                <p className="text-base font-bold text-emerald-300">
                  {isMulti ? q.answer.map(idx => q.options[idx]).join(' + ') : q.options[q.answer]}
                </p>
                {q.explanation && (
                  <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-700/80 max-h-32 overflow-y-auto custom-scrollbar">
                    {q.explanation}
                  </p>
                )}
              </div>
              <div className="text-xs text-slate-500 font-medium">Clique para voltar à pergunta</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button 
              disabled={currentIndex === 0}
              onClick={() => { setFlipped(false); setTimeout(() => setCurrentIndex(prev => prev - 1), 150); }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition"
            >
              Anterior
            </button>
            <button 
              disabled={currentIndex === questions.length - 1}
              onClick={() => { setFlipped(false); setTimeout(() => setCurrentIndex(prev => prev + 1), 150); }}
              className="px-4 py-2 bg-snGreen hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition shadow"
            >
              Próximo
            </button>
          </div>
        </div>
      );
    }

    function QuestionImporter({ questions, setQuestions, setModalConfig }) {
      const [jsonInput, setJsonInput] = useState('');
      const [message, setMessage] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const [editingId, setEditingId] = useState(null);
      const [editDraft, setEditDraft] = useState(null);

      const filteredQuestions = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return questions;
        return questions.filter(q =>
          String(q.question || '').toLowerCase().includes(term) ||
          String(q.domain || '').toLowerCase().includes(term)
        );
      }, [questions, searchTerm]);

      const startEditing = (question) => {
        setEditingId(question.id);
        setEditDraft({
          question: question.question || '',
          domain: question.domain || '',
          options: (question.options || []).join('\n'),
          answer: (Array.isArray(question.answer) ? question.answer : [question.answer])
            .map(index => String.fromCharCode(65 + index)).join(', '),
          explanation: question.explanation || '',
          hint: question.hint || ''
        });
        setMessage(null);
      };

      const saveQuestion = (questionId) => {
        const options = editDraft.options.split('\n').map(option => option.trim()).filter(Boolean);
        const answerLetters = editDraft.answer.toUpperCase().match(/[A-Z]/g) || [];
        const answerIndexes = [...new Set(answerLetters.map(letter => letter.charCodeAt(0) - 65))];
        if (!editDraft.question.trim() || options.length < 2 || !answerIndexes.length || answerIndexes.some(index => index >= options.length)) {
          setMessage({ type: 'error', text: 'Informe o enunciado, pelo menos duas opções e respostas válidas (por exemplo: A ou A, C).' });
          return;
        }

        const originalQuestion = questions.find(question => question.id === questionId);
        const answer = answerIndexes.length > 1 || Array.isArray(originalQuestion?.answer) ? answerIndexes : answerIndexes[0];
        setQuestions(prev => prev.map(question => question.id === questionId ? {
          ...question,
          question: editDraft.question.trim(),
          domain: editDraft.domain.trim() || 'Geral',
          options,
          answer,
          explanation: editDraft.explanation.trim(),
          hint: editDraft.hint.trim()
        } : question));
        setEditingId(null);
        setEditDraft(null);
        setMessage({ type: 'success', text: 'Questão atualizada com sucesso.' });
      };

      const removeQuestion = (question) => {
        setModalConfig({
          isOpen: true,
          title: 'Remover questão',
          children: `Tem certeza que deseja remover a questão “${question.question}”? Esta ação não pode ser desfeita.`,
          confirmText: 'Remover questão',
          confirmBg: 'bg-companyRed hover:bg-companyRedHover text-white',
          onConfirm: () => {
            setQuestions(prev => prev.filter(item => item.id !== question.id));
            if (editingId === question.id) {
              setEditingId(null);
              setEditDraft(null);
            }
            setModalConfig(null);
            setMessage({ type: 'success', text: 'Questão removida do banco.' });
          }
        });
      };

      const forceReload = () => {
        setQuestions(FULL_250_QUESTIONS);
        localStorage.setItem('sn_csa_questions_v250', JSON.stringify(FULL_250_QUESTIONS));
        setMessage({ type: 'success', text: `Banco redefinido e atualizado com sucesso para as ${FULL_250_QUESTIONS.length} questões originais!` });
      };

      const exportQuestions = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `ServiceNow_CSA_Questions_${questions.length}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      };

      const handleImport = () => {
        try {
          const parsed = JSON.parse(jsonInput);
          if (Array.isArray(parsed)) {
            setQuestions(parsed);
            setMessage({ type: 'success', text: `Sucesso! ${parsed.length} questões foram importadas para o sistema.` });
            setJsonInput('');
          } else {
            setMessage({ type: 'error', text: 'O formato do JSON precisa ser um Array de questões.' });
          }
        } catch (e) {
          setMessage({ type: 'error', text: 'Erro ao ler o JSON. Verifique a formatação do texto inserido.' });
        }
      };

      return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Gerenciador de Questões</h2>
              <p className="text-slate-400 text-xs">Existem {questions.length} questões ativas no banco de dados local.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={forceReload} className="px-4 py-2 bg-snGreen text-slate-950 font-bold text-xs rounded-lg shadow hover:bg-emerald-400 transition">
                Carregar Banco Completo
              </button>
              <button onClick={exportQuestions} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-lg border border-slate-600 transition">
                Exportar JSON
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">
              Caso queira importar novas questões personalizadas via JSON:
            </label>
            <textarea
              rows={6}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Cole o JSON de questões aqui..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-snGreen custom-scrollbar"
            />

            {message && (
              <div className={`p-3 rounded-lg text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                {message.text}
              </div>
            )}

            <div className="flex justify-between items-center">
              <button 
                onClick={forceReload}
                className="text-xs text-companyRed hover:underline font-semibold"
              >
                Restaurar Banco Completo
              </button>

              <button onClick={handleImport} disabled={!jsonInput.trim()} className="px-6 py-2.5 bg-snGreen hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition shadow">
                Importar Questões
              </button>
            </div>
          </div>

          <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Consultar e Gerir Questões</h3>
                <p className="text-slate-400 text-xs mt-1">{filteredQuestions.length} de {questions.length} questões</p>
              </div>
              <input
                type="search"
                placeholder="Pesquisar por palavra-chave ou domínio..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-snGreen w-full sm:w-80"
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 custom-scrollbar pr-2">
              {filteredQuestions.length === 0 ? (
                <p className="text-slate-400 text-sm py-6 text-center">Nenhuma questão encontrada.</p>
              ) : filteredQuestions.slice(0, 50).map(q => (
                <div key={q.id} className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1 min-w-0">
                      <span className="text-snGreen font-bold">{q.domain || 'Geral'} · #{q.id}</span>
                      <p className="text-slate-200 font-medium line-clamp-1">{q.question}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button onClick={() => startEditing(q)} className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold transition">Editar</button>
                      <button onClick={() => removeQuestion(q)} className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold transition">Remover</button>
                    </div>
                  </div>

                  {editingId === q.id && editDraft && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-700">
                      <label className="text-xs text-slate-300 space-y-1 md:col-span-2">
                        Enunciado
                        <textarea rows={3} value={editDraft.question} onChange={e => setEditDraft(prev => ({ ...prev, question: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-snGreen" />
                      </label>
                      <label className="text-xs text-slate-300 space-y-1">
                        Domínio
                        <input value={editDraft.domain} onChange={e => setEditDraft(prev => ({ ...prev, domain: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-snGreen" />
                      </label>
                      <label className="text-xs text-slate-300 space-y-1">
                        Respostas corretas (letras)
                        <input value={editDraft.answer} onChange={e => setEditDraft(prev => ({ ...prev, answer: e.target.value }))} placeholder="A ou A, C" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-snGreen" />
                      </label>
                      <label className="text-xs text-slate-300 space-y-1 md:col-span-2">
                        Opções (uma por linha; a primeira é A)
                        <textarea rows={4} value={editDraft.options} onChange={e => setEditDraft(prev => ({ ...prev, options: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-snGreen" />
                      </label>
                      <label className="text-xs text-slate-300 space-y-1">
                        Explicação
                        <textarea rows={2} value={editDraft.explanation} onChange={e => setEditDraft(prev => ({ ...prev, explanation: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-snGreen" />
                      </label>
                      <label className="text-xs text-slate-300 space-y-1">
                        Dica
                        <textarea rows={2} value={editDraft.hint} onChange={e => setEditDraft(prev => ({ ...prev, hint: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-snGreen" />
                      </label>
                      <div className="md:col-span-2 flex justify-end gap-2">
                        <button onClick={() => { setEditingId(null); setEditDraft(null); }} className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold">Cancelar</button>
                        <button onClick={() => saveQuestion(q.id)} className="px-3 py-2 rounded-lg bg-snGreen hover:bg-emerald-400 text-slate-950 text-xs font-bold">Salvar alterações</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filteredQuestions.length > 50 && <p className="text-center text-xs text-slate-500 py-2">Mostrando as primeiras 50 questões. Refine a pesquisa para encontrar outras.</p>}
            </div>
          </section>
        </div>
      );
    }


ReactDOM.render(<App />, document.getElementById('root'));
