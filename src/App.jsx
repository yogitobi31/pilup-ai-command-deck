import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Command,
  Filter,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MailCheck,
  Moon,
  Plus,
  Search,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const students = [
  {
    name: "김나영",
    school: "곡정고",
    grade: "고2",
    tag: "상담 우선",
    score: 92,
    mood: "자신감 상승",
    risk: "낮음",
    note: "최근 서술형 정확도 상승. 다음 시험 전까지 문장 전환 훈련 추천.",
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

function Shell({ dark, children }) {
  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        dark ? "bg-[#0c111b] text-white" : "bg-[#f6f3ee] text-slate-900"
      )}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={cn("absolute inset-0", dark ? "bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.07),transparent_30%)]" : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_32%)]")} />
        <div className={cn("absolute inset-0 opacity-[0.04]", dark ? "bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]", "bg-[size:36px_36px]")} />
        <div className={cn("absolute left-[8%] top-[4%] h-72 w-72 rounded-full blur-3xl", dark ? "bg-[#c8d6ff]/10" : "bg-white/80")} />
        <div className={cn("absolute right-[8%] top-[10%] h-72 w-72 rounded-full blur-3xl", dark ? "bg-[#d5c3ff]/10" : "bg-[#efe6da]/70")} />
      </div>
      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

function Panel({ dark, className = "", children }) {
  return (
    <div
      className={cn(
        "rounded-4xl border backdrop-blur-xl shadow-panel",
        dark
          ? "border-white/8 bg-white/[0.04]"
          : "border-slate-900/8 bg-white/70",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, dark }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className={cn("flex items-center gap-2 text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>
          <Icon size={16} className={dark ? "text-slate-300" : "text-slate-500"} />
          {title}
        </p>
        {subtitle && <p className={cn("mt-1 text-xs", dark ? "text-slate-400" : "text-slate-500")}>{subtitle}</p>}
      </div>
    </div>
  );
}

function StatCard({ dark, icon: Icon, label, value, sub }) {
  return (
    <Panel dark={dark} className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn("text-xs uppercase tracking-[0.18em]", dark ? "text-slate-400" : "text-slate-500")}>{label}</p>
          <p className={cn("mt-3 text-3xl font-semibold tracking-tight", dark ? "text-white" : "text-slate-900")}>{value}</p>
          <p className={cn("mt-2 text-xs", dark ? "text-slate-400" : "text-slate-500")}>{sub}</p>
        </div>
        <div className={cn("grid h-11 w-11 place-items-center rounded-2xl border", dark ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-200 bg-slate-50 text-slate-700")}>
          <Icon size={18} />
        </div>
      </div>
      <div className={cn("mt-4 h-px w-full", dark ? "bg-white/8" : "bg-slate-200")} />
    </Panel>
  );
}

function StudentCard({ dark, student, selected, onClick }) {
  const riskTone = {
    낮음: dark ? "bg-white/6 text-slate-200 border-white/10" : "bg-slate-100 text-slate-700 border-slate-200",
    중간: dark ? "bg-amber-400/10 text-amber-100 border-amber-200/10" : "bg-amber-50 text-amber-700 border-amber-200",
    높음: dark ? "bg-rose-400/10 text-rose-100 border-rose-200/10" : "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <motion.button
      layout
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "w-full rounded-3xl border p-4 text-left transition-all",
        selected
          ? dark
            ? "border-white/18 bg-white/[0.08]"
            : "border-slate-300 bg-white"
          : dark
          ? "border-white/6 bg-white/[0.025] hover:bg-white/[0.05]"
          : "border-slate-200/90 bg-white/60 hover:bg-white"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("grid h-11 w-11 place-items-center rounded-2xl text-sm font-semibold", dark ? "bg-white/7 text-white" : "bg-slate-100 text-slate-700")}>
          {student.name.slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className={cn("truncate text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>{student.name}</p>
            <span className={cn("rounded-full border px-2 py-0.5 text-[11px]", riskTone[student.risk])}>{student.risk}</span>
          </div>
          <p className={cn("mt-1 text-xs", dark ? "text-slate-400" : "text-slate-500")}>{student.school} · {student.grade} · {student.tag}</p>
        </div>
        <ChevronRight size={16} className={dark ? "text-slate-500" : "text-slate-400"} />
      </div>
      <div className={cn("mt-4 h-1.5 overflow-hidden rounded-full", dark ? "bg-white/8" : "bg-slate-200") }>
        <div className={cn("h-full rounded-full", dark ? "bg-white/70" : "bg-slate-700")} style={{ width: `${student.score}%` }} />
      </div>
      <div className={cn("mt-2 flex justify-between text-[11px]", dark ? "text-slate-400" : "text-slate-500") }>
        <span>학습 안정도</span>
        <span>{student.score}%</span>
      </div>
    </motion.button>
  );
}

function NoticeComposer({ dark }) {
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
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const inputBase = cn(
    "w-full rounded-2xl border px-3 py-2.5 text-sm outline-none transition",
    dark
      ? "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500"
      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
  );

  return (
    <Panel dark={dark} className="p-5">
      <div className="flex items-center justify-between gap-3">
        <SectionTitle dark={dark} icon={Wand2} title="AI 공지문 생성기" subtitle="미니멀한 구성으로 바로 복사해 쓸 수 있는 공지 작성기" />
        <button onClick={copyText} className={cn("rounded-2xl border px-3 py-2 text-xs font-medium transition", dark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}>{copied ? "복사됨" : "복사"}</button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputBase}>
          {Object.entries(notices).map(([key, value]) => (
            <option key={key} value={key}>{value.label}</option>
          ))}
        </select>
        <input value={target} onChange={(e) => setTarget(e.target.value)} className={inputBase} />
        <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inputBase} />
      </div>

      <div className={cn("mt-4 rounded-3xl border p-4 text-sm leading-7", dark ? "border-white/8 bg-black/20 text-slate-100" : "border-slate-200 bg-[#fbfaf8] text-slate-700")}>
        {body.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </Panel>
  );
}

function ActionBoard({ dark }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem("pilup-command-tasks-v2");
      return stored
        ? JSON.parse(stored)
        : [
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
    localStorage.setItem("pilup-command-tasks-v2", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const clean = draft.trim();
    if (!clean) return;
    setTasks((prev) => [{ id: Date.now(), text: clean, done: false }, ...prev]);
    setDraft("");
  };

  return (
    <Panel dark={dark} className="p-5">
      <div className="flex items-center justify-between">
        <SectionTitle dark={dark} icon={ClipboardList} title="오늘의 액션 보드" subtitle="완료 상태는 브라우저에 자동 저장됩니다" />
        <span className={cn("rounded-full border px-3 py-1 text-xs", dark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-600")}>{tasks.filter((t) => t.done).length}/{tasks.length}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="새 할 일을 입력하세요"
          className={cn("min-w-0 flex-1 rounded-2xl border px-3 py-2.5 text-sm outline-none", dark ? "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400")}
        />
        <button onClick={addTask} className={cn("rounded-2xl border px-3 py-2 transition", dark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50") }><Plus size={18} /></button>
      </div>

      <div className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className={cn("flex items-center gap-3 rounded-3xl border p-3", dark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white/70")}
            >
              <button
                onClick={() => setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full border transition",
                  task.done
                    ? dark
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-slate-300 bg-slate-100 text-slate-700"
                    : dark
                    ? "border-white/12 bg-transparent text-transparent"
                    : "border-slate-300 bg-transparent text-transparent"
                )}
              >
                <CheckCircle2 size={14} />
              </button>
              <p className={cn("min-w-0 flex-1 text-sm", task.done ? "line-through opacity-50" : "", dark ? "text-slate-100" : "text-slate-700")}>{task.text}</p>
              <button onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))} className={dark ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-700"}><X size={16} /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Panel>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("전체");
  const [selected, setSelected] = useState(students[0]);
  const [newStudents, setNewStudents] = useState(6);
  const [tuition, setTuition] = useState(24);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery = `${s.name} ${s.school} ${s.grade} ${s.tag}`.toLowerCase().includes(query.toLowerCase());
      const matchesGrade = grade === "전체" || s.grade === grade;
      return matchesQuery && matchesGrade;
    });
  }, [query, grade]);

  const focusInsight = useMemo(() => {
    if (!selected) return "학생을 선택하면 맞춤 액션이 나타납니다.";
    if (selected.risk === "높음") return `${selected.name}은 실력보다 루틴 회복이 먼저입니다. 숙제량을 줄이고, 바로 성공할 수 있는 짧은 과제를 제시하는 방식이 효과적입니다.`;
    if (selected.risk === "중간") return `${selected.name}은 현재 속도와 정확도를 함께 안정시키는 단계입니다. 비슷한 유형을 3회 반복하는 구조가 잘 맞습니다.`;
    return `${selected.name}은 전반적인 흐름이 좋습니다. 쉬운 문제 반복보다 한 단계 높은 변형 문제를 섞어 성취감을 유지하는 편이 좋습니다.`;
  }, [selected]);

  const forecast = newStudents * tuition;

  const chartAxis = dark ? "#7c879a" : "#6b7280";
  const tooltipStyle = {
    background: dark ? "rgba(12,17,27,0.96)" : "rgba(255,255,255,0.98)",
    border: dark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(15,23,42,.08)",
    borderRadius: 18,
    color: dark ? "white" : "#111827",
  };

  return (
    <Shell dark={dark}>
      <Panel dark={dark} className="p-5 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("grid h-14 w-14 place-items-center rounded-3xl border", dark ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-800") }>
              <Command size={23} />
            </div>
            <div>
              <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em]", dark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-500") }>
                <LayoutDashboard size={13} /> Pilup AI Command Deck
              </div>
              <h1 className={cn("mt-3 text-2xl font-semibold tracking-tight md:text-4xl", dark ? "text-white" : "text-slate-900")}>필업 운영실 · 더 조용하고 더 정교하게</h1>
              <p className={cn("mt-2 max-w-3xl text-sm leading-7", dark ? "text-slate-400" : "text-slate-600")}>네온 느낌을 줄이고, 여백과 타이포 중심으로 정리한 미니멀 버전입니다. 기능은 유지하면서 시각적 피로감을 낮췄어요.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className={cn("rounded-2xl border px-4 py-2.5 text-sm font-medium transition", dark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50")}><Sparkles className="mr-2 inline" size={15} />AI 추천 실행</button>
            <button onClick={() => setDark((v) => !v)} className={cn("rounded-2xl border px-3 py-2.5 transition", dark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50")}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          </div>
        </div>
      </Panel>

      <section className="mt-5 grid gap-4 md:grid-cols-4">
        <StatCard dark={dark} icon={Users} label="Students" value="27명" sub="위험도 높은 학생 3명" />
        <StatCard dark={dark} icon={MailCheck} label="Notices" value="4건" sub="학부모 안내 2건 포함" />
        <StatCard dark={dark} icon={TrendingUp} label="Revenue" value="840만" sub="전월 대비 +6.3%" />
        <StatCard dark={dark} icon={Target} label="Actions" value="8개" sub="오늘 핵심 액션" />
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.02fr_1.38fr_0.95fr]">
        <div className="space-y-5">
          <Panel dark={dark} className="p-5">
            <SectionTitle dark={dark} icon={GraduationCap} title="학생 레이더" subtitle="검색, 학년 필터, 위험도 확인" />
            <div className="mt-4 flex gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2", dark ? "text-slate-500" : "text-slate-400")} size={16} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="학생 검색" className={cn("w-full rounded-2xl border py-2.5 pl-9 pr-3 text-sm outline-none", dark ? "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500" : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400")} />
              </div>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className={cn("rounded-2xl border px-3 py-2.5 text-sm outline-none", dark ? "border-white/10 bg-white/[0.04] text-white" : "border-slate-200 bg-white text-slate-800") }>
                {["전체", "중3", "고1", "고2"].map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="mt-4 space-y-3">
              {filteredStudents.map((student) => (
                <StudentCard key={student.name} dark={dark} student={student} selected={selected?.name === student.name} onClick={() => setSelected(student)} />
              ))}
            </div>
          </Panel>

          <ActionBoard dark={dark} />
        </div>

        <div className="space-y-5">
          <Panel dark={dark} className="overflow-hidden">
            <div className="p-6 md:p-7">
              <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs", dark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-600") }>
                <Sparkles size={14} /> AI Focus Brief
              </div>
              <h2 className={cn("mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-[2.65rem] md:leading-[1.15]", dark ? "text-white" : "text-slate-900")}>오늘 가장 먼저 챙길 것은 <span className={dark ? "text-slate-300" : "text-slate-700"}>학생의 루틴과 우선순위</span>입니다.</h2>
              <p className={cn("mt-4 max-w-2xl text-sm leading-7", dark ? "text-slate-400" : "text-slate-600")}>이 화면은 단순히 예쁜 대시보드가 아니라, 학생 상태 · 수업 일정 · 공지문 · 매출 시뮬레이션을 한 흐름으로 묶어서 “오늘 뭐부터 해야 하는지”를 보여주는 운영 도구입니다.</p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className={cn("rounded-4xl border p-5", dark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white/70") }>
                  <div className="flex items-center gap-3">
                    <div className={cn("grid h-12 w-12 place-items-center rounded-2xl text-sm font-semibold", dark ? "bg-white/8 text-white" : "bg-slate-100 text-slate-700")}>{selected.name.slice(0, 1)}</div>
                    <div>
                      <p className={cn("text-lg font-semibold", dark ? "text-white" : "text-slate-900")}>{selected.name}</p>
                      <p className={cn("text-xs", dark ? "text-slate-400" : "text-slate-500")}>{selected.school} · {selected.grade} · {selected.mood}</p>
                    </div>
                  </div>
                  <p className={cn("mt-4 text-sm leading-7", dark ? "text-slate-300" : "text-slate-700")}>{selected.note}</p>
                  <div className={cn("mt-4 rounded-3xl border p-4", dark ? "border-white/8 bg-black/15" : "border-slate-200 bg-[#fbfaf8]")}>
                    <p className={cn("text-xs font-medium uppercase tracking-[0.16em]", dark ? "text-slate-400" : "text-slate-500")}>Aini Recommendation</p>
                    <p className={cn("mt-2 text-sm leading-7", dark ? "text-slate-100" : "text-slate-700")}>{focusInsight}</p>
                  </div>
                </div>

                <div className={cn("rounded-4xl border p-5", dark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white/70") }>
                  <SectionTitle dark={dark} icon={CalendarDays} title="오늘 수업 타임라인" subtitle="시간별 준비 상태" />
                  <div className="mt-4 space-y-3">
                    {schedule.map((item) => (
                      <div key={item.time} className={cn("rounded-3xl border p-4", dark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white") }>
                        <div className="flex items-center justify-between gap-3">
                          <p className={cn("text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>{item.time}</p>
                          <span className={cn("rounded-full border px-2 py-1 text-[11px]", dark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-500")}>{item.state}</span>
                        </div>
                        <p className={cn("mt-2 text-sm", dark ? "text-slate-200" : "text-slate-700")}>{item.title}</p>
                        <p className={cn("mt-1 text-xs", dark ? "text-slate-500" : "text-slate-400")}>{item.room}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <NoticeComposer dark={dark} />
        </div>

        <div className="space-y-5">
          <Panel dark={dark} className="p-5">
            <SectionTitle dark={dark} icon={LineChart} title="성장 시뮬레이터" subtitle="신규 등록에 따른 예상 추가 월매출" />
            <div className="mt-5 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ left: -24, right: 8, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cleanRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={dark ? "#f8fafc" : "#111827"} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={dark ? "#f8fafc" : "#111827"} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="value" stroke={dark ? "#f8fafc" : "#111827"} strokeWidth={2.3} fill="url(#cleanRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className={cn("mt-4 rounded-4xl border p-4", dark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white/70") }>
              <label className={cn("block text-xs", dark ? "text-slate-400" : "text-slate-500")}>신규 학생 수: <b className={dark ? "text-white" : "text-slate-800"}>{newStudents}명</b>
                <input type="range" min="0" max="20" value={newStudents} onChange={(e) => setNewStudents(Number(e.target.value))} className="mt-2 w-full" />
              </label>
              <label className={cn("mt-4 block text-xs", dark ? "text-slate-400" : "text-slate-500")}>평균 수강료: <b className={dark ? "text-white" : "text-slate-800"}>{tuition}만원</b>
                <input type="range" min="18" max="32" value={tuition} onChange={(e) => setTuition(Number(e.target.value))} className="mt-2 w-full" />
              </label>
              <div className={cn("mt-4 rounded-3xl border p-4", dark ? "border-white/8 bg-black/15" : "border-slate-200 bg-[#fbfaf8]")}>
                <p className={cn("text-xs uppercase tracking-[0.18em]", dark ? "text-slate-400" : "text-slate-500")}>Projected Gain</p>
                <p className={cn("mt-2 text-3xl font-semibold", dark ? "text-white" : "text-slate-900")}>+{forecast}만원</p>
                <p className={cn("mt-2 text-xs leading-6", dark ? "text-slate-500" : "text-slate-500")}>고정비, 퇴원율, 형제 할인까지 연결하면 실제 운영용 시뮬레이터로 확장 가능합니다.</p>
              </div>
            </div>
          </Panel>

          <Panel dark={dark} className="p-5">
            <SectionTitle dark={dark} icon={ArrowUpRight} title="다음 확장 아이디어" subtitle="현재 프로토타입을 실제 운영툴로 키우는 방향" />
            <div className="mt-4 space-y-3">
              {[
                "학생 추가 / 수정 / 삭제 기능",
                "상담 메모 저장 기능",
                "시험지 업로드 → 자동 분석",
                "Firebase 연결 → 여러 기기 동기화",
              ].map((item) => (
                <div key={item} className={cn("rounded-3xl border p-4 text-sm", dark ? "border-white/8 bg-white/[0.03] text-slate-200" : "border-slate-200 bg-white/70 text-slate-700")}>{item}</div>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </Shell>
  );
}
