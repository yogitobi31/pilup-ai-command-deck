import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  Command,
  Crown,
  Filter,
  Flame,
  GraduationCap,
  LineChart,
  MailCheck,
  MessageSquareText,
  Moon,
  Plus,
  Search,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wand2,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const initialStudents = [
  {
    name: "김나영",
    school: "곡정고",
    grade: "고2",
    tag: "상담 우선",
    score: 92,
    mood: "자신감 상승",
    risk: "낮음",
    note: "최근 서술형 정확도 상승. 다음 시험 전까지 문장 전환 훈련 추천.",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "홍지유",
    school: "곡선중",
    grade: "중3",
    tag: "신규 관심",
    score: 76,
    mood: "집중력 좋음",
    risk: "중간",
    note: "어휘는 빠르게 흡수하지만 문장 구조 분석에서 속도 편차가 있음.",
    color: "from-sky-400 to-indigo-500",
  },
  {
    name: "장희선",
    school: "곡정고",
    grade: "고1",
    tag: "성장세",
    score: 84,
    mood: "꾸준함",
    risk: "낮음",
    note: "필기와 복습 루틴이 안정적. 고난도 빈칸 추론을 조금 더 밀어도 됨.",
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    name: "박찬영",
    school: "유신고",
    grade: "고1",
    tag: "루틴 필요",
    score: 68,
    mood: "느긋함",
    risk: "높음",
    note: "실력보다 제출 루틴이 문제. 주간 미션을 작게 쪼개면 회복 가능.",
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "고경민",
    school: "곡정고",
    grade: "고2",
    tag: "상위권",
    score: 89,
    mood: "표현력 좋음",
    risk: "낮음",
    note: "글의 흐름을 잡는 능력이 좋음. 연결어 고급화 훈련 추천.",
    color: "from-emerald-400 to-teal-500",
  },
];

const schedule = [
  { time: "15:30", title: "중3 내신 문법 클리닉", room: "A룸", state: "준비 완료" },
  { time: "17:00", title: "고1 서술형 8문장 훈련", room: "B룸", state: "자료 필요" },
  { time: "19:00", title: "고2 모의고사 지문 분석", room: "A룸", state: "핵심 수업" },
  { time: "21:00", title: "상담 / 보강 체크", room: "온라인", state: "확인 필요" },
];

const revenueData = [
  { month: "11월", value: 560 },
  { month: "12월", value: 610 },
  { month: "1월", value: 680 },
  { month: "2월", value: 720 },
  { month: "3월", value: 790 },
  { month: "4월", value: 840 },
];

const notices = {
  warm: {
    label: "따뜻한 안내",
    intro: "안녕하세요, 필업영어교습소입니다.",
    close: "늘 믿고 맡겨주셔서 감사합니다. 아이가 수업 안에서 더 안정적으로 성장할 수 있도록 세심하게 살피겠습니다.",
  },
  firm: {
    label: "격식 있는 공지",
    intro: "안녕하세요. 필업영어교습소입니다.",
    close: "수업 운영의 안정성과 학습 효과를 위해 학부모님의 협조를 부탁드립니다. 감사합니다.",
  },
  bright: {
    label: "밝고 친근한 톤",
    intro: "안녕하세요, 필업입니다 :)",
    close: "아이들이 부담은 줄이고 실력은 더 단단히 쌓을 수 있도록 즐겁게 이끌어가겠습니다!",
  },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div className={cn("absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl", accent)} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{sub}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3 text-white ring-1 ring-white/10">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}

function StudentCard({ student, selected, onClick }) {
  const riskStyle = {
    낮음: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/20",
    중간: "bg-amber-400/15 text-amber-200 ring-amber-300/20",
    높음: "bg-rose-400/15 text-rose-200 ring-rose-300/20",
  };

  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={cn(
        "group w-full rounded-3xl border p-4 text-left transition",
        selected
          ? "border-white/35 bg-white/[0.14] shadow-xl shadow-indigo-950/30"
          : "border-white/10 bg-white/[0.06] hover:border-white/25 hover:bg-white/[0.1]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-lg font-black text-white shadow-lg", student.color)}>
          {student.name.slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-bold text-white">{student.name}</p>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] ring-1", riskStyle[student.risk])}>{student.risk}</span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            {student.school} · {student.grade} · {student.tag}
          </p>
        </div>
        <ChevronRight className="text-slate-500 transition group-hover:text-white" size={18} />
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${student.score}%` }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300"
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>학습 안정도</span>
        <span>{student.score}%</span>
      </div>
    </motion.button>
  );
}

function NoticeComposer() {
  const [tone, setTone] = useState("warm");
  const [target, setTarget] = useState("중3 학부모님");
  const [topic, setTopic] = useState("다음 주부터 서술형 대비 집중 훈련을 시작합니다");
  const [copied, setCopied] = useState(false);

  const body = useMemo(() => {
    const t = notices[tone];
    return `${t.intro}\n\n${target}께 안내드립니다. ${topic}. 이번 훈련에서는 단순 암기가 아니라, 문장의 구조를 이해하고 직접 써 보는 과정을 중심으로 진행할 예정입니다.\n\n수업 후에는 학생별로 자주 틀리는 유형을 정리해 짧은 피드백을 제공하고, 필요한 경우 개별 보강 포인트도 함께 안내드리겠습니다.\n\n${t.close}`;
  }, [tone, target, topic]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-cyan-100">
            <Wand2 size={17} /> AI 공지문 생성기
          </p>
          <p className="mt-1 text-xs text-slate-400">학부모 공지를 10초 안에 그럴듯하게 정리하는 미니 도구</p>
        </div>
        <button onClick={copyText} className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-bold text-white ring-1 ring-white/10 transition hover:bg-white/20">
          {copied ? "복사됨" : "복사"}
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <label className="space-y-1 text-xs text-slate-400">
          톤
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none">
            {Object.entries(notices).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-xs text-slate-400">
          대상
          <input value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none" />
        </label>
        <label className="space-y-1 text-xs text-slate-400">
          주제
          <input value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none" />
        </label>
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/55 p-4 text-sm leading-7 text-slate-100 shadow-inner">
        {body.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ActionBoard() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem("pilup-command-tasks");
      return stored ? JSON.parse(stored) : [
        { id: 1, text: "고1 서술형 8문장 샘플 3개 만들기", done: false },
        { id: 2, text: "중3 학부모 안내문 발송", done: true },
        { id: 3, text: "위험도 높은 학생 1명 상담 메모 남기기", done: false },
      ];
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = useState("");

  useEffect(() => {
    localStorage.setItem("pilup-command-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const clean = draft.trim();
    if (!clean) return;
    setTasks((prev) => [{ id: Date.now(), text: clean, done: false }, ...prev]);
    setDraft("");
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-fuchsia-100">
            <Target size={17} /> 오늘의 액션 보드
          </p>
          <p className="mt-1 text-xs text-slate-400">완료 상태는 브라우저에 자동 저장됩니다.</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
          {tasks.filter((t) => t.done).length}/{tasks.length}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="할 일을 입력하세요"
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
        />
        <button onClick={addTask} className="rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-100">
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3"
            >
              <button
                onClick={() => setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                className={cn(
                  "h-5 w-5 rounded-full ring-1 transition",
                  task.done ? "bg-cyan-300 ring-cyan-200" : "bg-white/5 ring-white/20"
                )}
              />
              <p className={cn("min-w-0 flex-1 text-sm", task.done ? "text-slate-500 line-through" : "text-slate-100")}>{task.text}</p>
              <button onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))} className="text-slate-500 hover:text-white">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(true);
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("전체");
  const [selected, setSelected] = useState(initialStudents[0]);
  const [newStudents, setNewStudents] = useState(6);
  const [tuition, setTuition] = useState(24);

  const filtered = useMemo(() => {
    return initialStudents.filter((s) => {
      const matchesQuery = `${s.name} ${s.school} ${s.grade} ${s.tag}`.toLowerCase().includes(query.toLowerCase());
      const matchesGrade = grade === "전체" || s.grade === grade;
      return matchesQuery && matchesGrade;
    });
  }, [query, grade]);

  const forecast = newStudents * tuition;
  const selectedInsight = useMemo(() => {
    if (!selected) return "학생을 선택하면 맞춤 액션이 나타납니다.";
    if (selected.risk === "높음") return `${selected.name}은 실력보다 루틴 관리가 핵심입니다. 오늘은 숙제를 크게 늘리기보다, 15분짜리 미션 2개로 쪼개서 성공 경험을 만드는 쪽이 좋습니다.`;
    if (selected.risk === "중간") return `${selected.name}은 지금 속도 편차를 줄이는 단계입니다. 문제 수를 늘리기보다, 같은 유형을 3회 반복해 안정도를 올리는 전략이 좋습니다.`;
    return `${selected.name}은 현재 흐름이 좋습니다. 쉬운 문제 반복보다 한 단계 높은 변형 문제를 섞어 성취감을 유지시키는 쪽이 좋습니다.`;
  }, [selected]);

  return (
    <div className={cn(
      "min-h-screen overflow-hidden transition-colors",
      dark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"
    )}>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_100%,44px_44px,44px_44px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-cyan-500/20"
            >
              <Command size={24} />
            </motion.div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200/80">Pilup AI Command Deck</p>
              <h1 className="text-xl font-black tracking-tight text-white md:text-2xl">필업 운영실 · 오늘의 모든 판단을 한 화면에</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200">
              <Sparkles className="mr-2 inline" size={16} /> AI 추천 실행
            </button>
            <button onClick={() => setDark((v) => !v)} className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-white/20">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        <section className="mt-5 grid gap-4 md:grid-cols-4">
          <StatCard icon={Users} label="오늘 관리 학생" value="27명" sub="위험도 높은 학생 3명" accent="bg-cyan-400/25" />
          <StatCard icon={MailCheck} label="공지 대기" value="4건" sub="학부모 안내 2건 포함" accent="bg-fuchsia-400/25" />
          <StatCard icon={TrendingUp} label="이번 달 예상" value="840만" sub="전월 대비 +6.3%" accent="bg-emerald-400/25" />
          <StatCard icon={Flame} label="오늘 핵심 액션" value="8개" sub="완료율 62%" accent="bg-amber-400/25" />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_1.4fr_0.95fr]">
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-cyan-100">
                    <GraduationCap size={17} /> 학생 레이더
                  </p>
                  <p className="mt-1 text-xs text-slate-400">검색, 학년 필터, 위험도 확인</p>
                </div>
                <Filter size={18} className="text-slate-400" />
              </div>

              <div className="mt-4 flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="학생 검색"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/65 py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
                <select value={grade} onChange={(e) => setGrade(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/65 px-3 py-2 text-sm text-white outline-none">
                  {['전체', '중3', '고1', '고2'].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>

              <div className="mt-4 space-y-3">
                {filtered.map((student) => (
                  <StudentCard key={student.name} student={student} selected={selected?.name === student.name} onClick={() => setSelected(student)} />
                ))}
              </div>
            </div>

            <ActionBoard />
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.08] shadow-2xl shadow-black/25 backdrop-blur-xl">
              <div className="relative p-6">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan-100 ring-1 ring-white/10">
                      <Crown size={14} /> AI 판단 브리핑
                    </div>
                    <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                      오늘 주원쌤이 먼저 챙겨야 할 학생은<br className="hidden md:block" />
                      <span className="bg-gradient-to-r from-cyan-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">“위험도 높은데 회복 가능한 학생”</span>입니다.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                      이 화면은 단순 대시보드가 아니라, 학생 상태 · 수업 일정 · 학부모 공지 · 매출 시뮬레이션을 한 번에 묶어 “오늘 뭐부터 해야 하는지”를 보여주는 작은 운영실입니다.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-right">
                    <p className="text-xs text-slate-400">AI 추천 우선순위</p>
                    <p className="mt-1 text-2xl font-black text-white">찬영 → 지유 → 공지</p>
                    <p className="mt-1 text-xs text-slate-500">루틴 관리 / 속도 안정 / 안내문 발송</p>
                  </div>
                </div>
              </div>

              <div className="grid border-t border-white/10 md:grid-cols-[1fr_0.9fr]">
                <div className="p-5">
                  <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-5">
                    <div className="flex items-center gap-3">
                      <div className={cn("grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-xl font-black text-white", selected.color)}>
                        {selected.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-lg font-black text-white">{selected.name}</p>
                        <p className="text-xs text-slate-400">{selected.school} · {selected.grade} · {selected.mood}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{selected.note}</p>
                    <div className="mt-4 rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                      <p className="flex items-center gap-2 text-xs font-bold text-cyan-100">
                        <Sparkles size={15} /> 아인이 추천 액션
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-200">{selectedInsight}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 p-5 md:border-l md:border-t-0">
                  <p className="flex items-center gap-2 text-sm font-bold text-indigo-100">
                    <CalendarDays size={17} /> 오늘 수업 타임라인
                  </p>
                  <div className="mt-4 space-y-3">
                    {schedule.map((item, idx) => (
                      <motion.div
                        key={item.time}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.07 }}
                        className="rounded-3xl border border-white/10 bg-white/[0.06] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-black text-white">{item.time}</p>
                          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-white/10">{item.state}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-200">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.room}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <NoticeComposer />
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-emerald-100">
                    <LineChart size={17} /> 성장 시뮬레이터
                  </p>
                  <p className="mt-1 text-xs text-slate-400">신규 등록에 따른 월 매출 변화</p>
                </div>
                <Star size={18} className="text-amber-200" />
              </div>

              <div className="mt-5 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ left: -25, right: 8, top: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.55}/>
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "rgba(15, 23, 42, .9)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 18, color: "white" }} />
                    <Area type="monotone" dataKey="value" stroke="#67e8f9" strokeWidth={3} fill="url(#revenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-4 rounded-3xl bg-slate-950/45 p-4 ring-1 ring-white/10">
                <label className="block text-xs text-slate-400">
                  신규 학생 수: <b className="text-white">{newStudents}명</b>
                  <input type="range" min="0" max="20" value={newStudents} onChange={(e) => setNewStudents(Number(e.target.value))} className="mt-2 w-full" />
                </label>
                <label className="block text-xs text-slate-400">
                  평균 수강료: <b className="text-white">{tuition}만원</b>
                  <input type="range" min="18" max="32" value={tuition} onChange={(e) => setTuition(Number(e.target.value))} className="mt-2 w-full" />
                </label>
                <div className="rounded-2xl bg-white/[0.07] p-4">
                  <p className="text-xs text-slate-400">예상 추가 월매출</p>
                  <p className="mt-1 text-3xl font-black text-white">+{forecast}만원</p>
                  <p className="mt-1 text-xs text-slate-500">실제 앱에서는 고정비·퇴원율·형제 할인까지 연결 가능</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-indigo-500/10 to-fuchsia-500/15 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <MessageSquareText size={17} /> 다음 확장 아이디어
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">사진/PDF 업로드 → 시험지 자동 분석</div>
                <div className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">학생별 오답 유형 누적 → 상담 리포트 생성</div>
                <div className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">학부모 공지 → 카톡/문자용으로 자동 변환</div>
                <div className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">Firebase 연결 → 실제 다중 사용자 운영</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
