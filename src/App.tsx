import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Home,
  MapPin,
  Search,
  Sparkles,
  Trophy,
  UserRound,
  UsersRound,
  WalletCards,
  X,
  CheckCircle2,
  SlidersHorizontal,
  ShieldCheck,
  BadgeCheck,
  Building2,
  ArrowUpRight,
  QrCode,
} from 'lucide-react';

type Session = {
  id: string;
  title: string;
  venue: string;
  area: string;
  date: string;
  time: string;
  price: number;
  joined: number;
  capacity: number;
  dupr: string;
  vibe: string;
  host: string;
  hostRating: number;
  courtCount: number;
  venueCost: number;
  cover: string;
  tags: string[];
};

const sessions: Session[] = [
  {
    id: 'night-chicken',
    title: 'Wednesday Night Chicken',
    venue: 'Smash Yard Pickleball',
    area: 'เมืองขอนแก่น',
    date: 'วันนี้',
    time: '18:00–20:00',
    price: 190,
    joined: 9,
    capacity: 12,
    dupr: '2.5–3.5',
    vibe: 'ชิลล์ เน้นเล่นทั่วถึง',
    host: 'Nui',
    hostRating: 4.9,
    courtCount: 2,
    venueCost: 800,
    cover: 'linear-gradient(135deg, #173b2f 0%, #246f55 48%, #b8f23a 160%)',
    tags: ['มาคนเดียวได้', 'Smart Match'],
  },
  {
    id: 'beginner',
    title: 'Beginner Friendly',
    venue: 'Chicken Court Club',
    area: 'กังสดาล',
    date: 'พรุ่งนี้',
    time: '19:00–21:00',
    price: 170,
    joined: 6,
    capacity: 12,
    dupr: 'มือใหม่–3.0',
    vibe: 'มือใหม่สบาย ๆ',
    host: 'Bank',
    hostRating: 4.8,
    courtCount: 2,
    venueCost: 700,
    cover: 'linear-gradient(135deg, #1e293b 0%, #334155 45%, #38bdf8 150%)',
    tags: ['มือใหม่', 'มีคนจัดคู่ให้'],
  },
  {
    id: 'competitive',
    title: 'Friday Competitive Mix',
    venue: 'North Court Arena',
    area: 'บึงแก่นนคร',
    date: 'ศุกร์นี้',
    time: '20:00–22:00',
    price: 220,
    joined: 11,
    capacity: 16,
    dupr: '3.2–4.2',
    vibe: 'จริงจัง แต่เป็นมิตร',
    host: 'Ploy',
    hostRating: 5,
    courtCount: 3,
    venueCost: 1200,
    cover: 'linear-gradient(135deg, #3d1f1f 0%, #7f1d1d 52%, #fb923c 150%)',
    tags: ['เกมเข้ม', 'จัดตาม DUPR'],
  },
];

function formatBaht(value: number) {
  return new Intl.NumberFormat('th-TH').format(Math.round(value));
}

export default function App() {
  const [tab, setTab] = useState<'home' | 'games' | 'organizer' | 'profile'>('home');
  const [dateFilter, setDateFilter] = useState('ทั้งหมด');
  const [selected, setSelected] = useState<Session | null>(null);
  const [joinedIds, setJoinedIds] = useState<string[]>(['beginner']);
  const [search, setSearch] = useState('');

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchDate = dateFilter === 'ทั้งหมด' || session.date === dateFilter;
      const query = search.trim().toLowerCase();
      const matchSearch = !query || `${session.title} ${session.venue} ${session.area}`.toLowerCase().includes(query);
      return matchDate && matchSearch;
    });
  }, [dateFilter, search]);

  const joinSession = (session: Session) => {
    if (!joinedIds.includes(session.id)) setJoinedIds((prev) => [...prev, session.id]);
    setSelected(null);
    setTab('games');
  };

  return (
    <div className="min-h-screen bg-[#f5f7f2] text-[#152019]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f5f7f2]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <button onClick={() => setTab('home')} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#17251f] text-xl shadow-sm">🐔</div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#688076]">Pickleball community</div>
              <div className="text-xl font-black tracking-tight">CHICKEN BALL</div>
            </div>
          </button>
          <button onClick={() => setTab('organizer')} className="hidden items-center gap-2 rounded-full border border-[#dbe2da] bg-white px-4 py-2 text-sm font-bold shadow-sm md:flex">
            <Sparkles size={16} /> Organizer
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 md:px-6 md:pb-12">
        {tab === 'home' && (
          <>
            <section className="relative overflow-hidden rounded-[30px] bg-[#17251f] px-5 py-7 text-white shadow-xl shadow-[#17251f]/10 md:px-9 md:py-10">
              <div className="absolute -right-14 -top-20 h-60 w-60 rounded-full bg-[#b8f23a]/20 blur-2xl" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[#dff8a9]"><UsersRound size={14} /> มาคนเดียวก็เล่นได้</span>
                <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">อยากเล่นก็มา<br />เดี๋ยวเราจัดก๊วนให้</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 md:text-base">เลือกเวลา เลือกระดับ จ่ายครั้งเดียว แล้ว Chicken Ball ช่วยจัดคน จัดคู่ และดูแลรอบให้คุณ</p>
              </div>
              <div className="relative z-10 mt-7 flex items-center gap-3 rounded-2xl bg-white p-2 text-[#17251f] shadow-lg md:max-w-xl">
                <Search className="ml-2 text-[#789085]" size={20} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ค้นหาสนาม หรือชื่อก๊วน" className="w-full bg-transparent px-1 py-2 text-sm font-semibold outline-none" />
                <button className="rounded-xl bg-[#b8f23a] p-3"><SlidersHorizontal size={18} /></button>
              </div>
            </section>

            <section className="mt-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#73877e]">OPEN GAMES</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight">ก๊วนที่กำลังเปิดรับ</h2>
                </div>
                <span className="text-sm font-bold text-[#577064]">{filteredSessions.length} ก๊วน</span>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {['ทั้งหมด', 'วันนี้', 'พรุ่งนี้', 'ศุกร์นี้'].map((item) => (
                  <button key={item} onClick={() => setDateFilter(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${dateFilter === item ? 'bg-[#17251f] text-white' : 'border border-[#dbe3da] bg-white text-[#53685f]'}`}>{item}</button>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {filteredSessions.map((session) => {
                  const left = session.capacity - session.joined;
                  return (
                    <button key={session.id} onClick={() => setSelected(session)} className="group overflow-hidden rounded-[26px] border border-[#e2e8df] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative h-36 p-5 text-white" style={{ background: session.cover }}>
                        <div className="flex items-start justify-between">
                          <span className="rounded-full bg-black/20 px-3 py-1.5 text-xs font-bold backdrop-blur">{session.date}</span>
                          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#17251f]">฿{session.price}</span>
                        </div>
                        <div className="absolute bottom-4 left-5 right-5">
                          <h3 className="text-xl font-black tracking-tight">{session.title}</h3>
                          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white/80"><MapPin size={14} /> {session.venue}</div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-sm font-bold"><Clock3 size={16} className="text-[#698278]" /> {session.time}</div>
                          <span className={`text-xs font-black ${left <= 2 ? 'text-[#d45a3c]' : 'text-[#527064]'}`}>เหลือ {left} ที่</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-[#607269]">
                          <span className="rounded-lg bg-[#f1f5ef] px-2.5 py-1.5 font-bold">DUPR {session.dupr}</span>
                          <span className="rounded-lg bg-[#f1f5ef] px-2.5 py-1.5 font-bold">{session.joined}/{session.capacity} คน</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-[#edf0ea] pt-4">
                          <div className="flex items-center gap-2 text-sm font-bold"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17251f] text-white">{session.host[0]}</div> Host {session.host}</div>
                          <ChevronRight className="transition group-hover:translate-x-1" size={20} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {tab === 'games' && (
          <section>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#73877e]">MY GAMES</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">ก๊วนของฉัน</h1>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {sessions.filter((s) => joinedIds.includes(s.id)).map((session) => (
                <article key={session.id} className="rounded-[26px] border border-[#e2e8df] bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf8c8] px-2.5 py-1 text-xs font-black text-[#385316]"><CheckCircle2 size={13} /> จ่ายแล้ว</span>
                      <h2 className="mt-3 text-xl font-black">{session.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-[#65776e]">{session.venue}</p>
                    </div>
                    <div className="rounded-2xl bg-[#17251f] px-4 py-3 text-center text-white"><div className="text-xs font-bold text-white/60">ENTRY</div><div className="text-xl font-black">฿{session.price}</div></div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-bold">
                    <div className="rounded-2xl bg-[#f5f7f2] p-3"><CalendarDays size={17} className="mb-2" />{session.date}</div>
                    <div className="rounded-2xl bg-[#f5f7f2] p-3"><Clock3 size={17} className="mb-2" />{session.time}</div>
                  </div>
                  <button className="mt-4 w-full rounded-2xl bg-[#b8f23a] px-4 py-3.5 text-sm font-black text-[#17251f]">ดูรายละเอียดและการจัดคู่</button>
                </article>
              ))}
              {sessions.filter((s) => joinedIds.includes(s.id)).length === 0 && <div className="rounded-[26px] border border-dashed border-[#cdd7cf] bg-white p-10 text-center text-[#6f8178]">ยังไม่มีก๊วนที่เข้าร่วม</div>}
            </div>
          </section>
        )}

        {tab === 'organizer' && <OrganizerDashboard session={sessions[0]} />}

        {tab === 'profile' && (
          <section className="mx-auto max-w-2xl">
            <div className="rounded-[30px] bg-[#17251f] p-7 text-white">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#b8f23a] text-3xl font-black text-[#17251f]">N</div>
              <h1 className="mt-4 text-3xl font-black">Nui</h1>
              <p className="mt-1 text-white/60">DUPR 3.21 • เล่นมาแล้ว 18 ก๊วน</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat value="18" label="Games" dark />
                <Stat value="4.9" label="Rating" dark />
                <Stat value="86%" label="Show up" dark />
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(24,39,31,0.08)] backdrop-blur-xl md:left-1/2 md:bottom-5 md:right-auto md:w-[520px] md:-translate-x-1/2 md:rounded-full md:border">
        <div className="grid grid-cols-4 gap-1">
          <NavButton active={tab === 'home'} onClick={() => setTab('home')} icon={<Home size={20} />} label="หาก๊วน" />
          <NavButton active={tab === 'games'} onClick={() => setTab('games')} icon={<Trophy size={20} />} label="ก๊วนของฉัน" />
          <NavButton active={tab === 'organizer'} onClick={() => setTab('organizer')} icon={<WalletCards size={20} />} label="Organizer" />
          <NavButton active={tab === 'profile'} onClick={() => setTab('profile')} icon={<UserRound size={20} />} label="โปรไฟล์" />
        </div>
      </nav>

      {selected && <SessionSheet session={selected} joined={joinedIds.includes(selected.id)} onClose={() => setSelected(null)} onJoin={() => joinSession(selected)} />}
    </div>
  );
}

function SessionSheet({ session, joined, onClose, onJoin }: { session: Session; joined: boolean; onClose: () => void; onJoin: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#101712]/55 p-0 backdrop-blur-sm md:items-center md:p-6" onMouseDown={onClose}>
      <div onMouseDown={(e) => e.stopPropagation()} className="max-h-[94vh] w-full overflow-y-auto rounded-t-[32px] bg-white shadow-2xl md:max-w-xl md:rounded-[32px]">
        <div className="relative h-44 p-5 text-white" style={{ background: session.cover }}>
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-black/20 p-2 backdrop-blur"><X size={20} /></button>
          <div className="absolute bottom-5 left-5 right-5">
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-black backdrop-blur">{session.date} • {session.time}</span>
            <h2 className="mt-3 text-2xl font-black">{session.title}</h2>
          </div>
        </div>
        <div className="p-5 pb-7">
          <div className="flex items-start justify-between gap-4">
            <div><div className="flex items-center gap-2 font-black"><MapPin size={17} /> {session.venue}</div><p className="mt-1 text-sm text-[#6d7d75]">{session.area} • {session.courtCount} คอร์ต</p></div>
            <div className="text-right"><div className="text-3xl font-black">฿{session.price}</div><div className="text-xs font-bold text-[#73847b]">ต่อคน</div></div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <InfoBox value={`${session.joined}/${session.capacity}`} label="ผู้เล่น" />
            <InfoBox value={session.dupr} label="DUPR" />
            <InfoBox value={`${session.hostRating} ★`} label={`Host ${session.host}`} />
          </div>

          <div className="mt-5 rounded-2xl bg-[#f4f7f1] p-4">
            <div className="flex items-center gap-2 font-black"><Sparkles size={18} /> Smart Match</div>
            <p className="mt-2 text-sm leading-6 text-[#5f7168]">ระบบช่วยจัดคู่ตามระดับและหมุนคนลงสนามให้เวลาเล่นใกล้เคียงกัน ไม่ต้องมากับเพื่อนก็เข้าก๊วนได้</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">{session.tags.map((tag) => <span key={tag} className="rounded-full border border-[#dce6da] px-3 py-1.5 text-xs font-black text-[#52685d]">{tag}</span>)}</div>

          <div className="mt-6 flex items-center justify-between border-t border-[#edf0ea] pt-5">
            <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17251f] font-black text-white">{session.host[0]}</div><div><div className="font-black">Host {session.host}</div><div className="text-xs font-semibold text-[#718078]">ยืนยันตัวตนแล้ว • ⭐ {session.hostRating}</div></div></div>
            <BadgeCheck className="text-[#4a7b55]" />
          </div>

          <button disabled={joined} onClick={onJoin} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-black ${joined ? 'bg-[#e8eee6] text-[#6e7b73]' : 'bg-[#b8f23a] text-[#17251f] shadow-lg shadow-[#b8f23a]/20'}`}>
            {joined ? <><CheckCircle2 size={20} /> เข้าก๊วนแล้ว</> : <>จ่าย ฿{session.price} และเข้าก๊วน <ArrowUpRight size={19} /></>}
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#75837b]"><ShieldCheck size={13} /> ชำระผ่านระบบ Chicken Ball • ตรวจสอบสถานะอัตโนมัติ</div>
        </div>
      </div>
    </div>
  );
}

function OrganizerDashboard({ session }: { session: Session }) {
  const gross = session.price * session.capacity;
  const paymentFee = gross * 0.025;
  const margin = gross - session.venueCost - paymentFee;
  const platform = margin * 0.25;
  const organizer = margin - platform;

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#73877e]">ORGANIZER</p><h1 className="mt-1 text-3xl font-black tracking-tight">หลังบ้านผู้จัดก๊วน</h1><p className="mt-2 text-sm font-semibold text-[#6b7b73]">เห็นคน เงิน และยอดจ่ายสนามในหน้าเดียว</p></div>
        <button className="rounded-2xl bg-[#17251f] px-5 py-3 text-sm font-black text-white">+ สร้างก๊วนใหม่</button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-[30px] bg-[#17251f] p-5 text-white shadow-xl shadow-[#17251f]/10 md:p-7">
          <div className="flex items-start justify-between gap-4"><div><span className="rounded-full bg-[#b8f23a] px-3 py-1.5 text-xs font-black text-[#17251f]">กำลังเปิดรับ</span><h2 className="mt-3 text-2xl font-black">{session.title}</h2><p className="mt-1 text-sm font-semibold text-white/60">{session.venue} • {session.time}</p></div><button className="rounded-full bg-white/10 p-3"><ChevronRight /></button></div>
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat value={`฿${formatBaht(gross)}`} label="ยอดรับเต็ม" dark />
            <Stat value={`${session.capacity}/${session.capacity}`} label="ชำระแล้ว" dark />
            <Stat value={`฿${formatBaht(session.venueCost)}`} label="ค่าสนาม" dark />
            <Stat value={`฿${formatBaht(organizer)}`} label="ส่วนของคุณ" dark highlight />
          </div>
        </div>

        <div className="rounded-[30px] border border-[#e1e8df] bg-white p-5 md:p-6">
          <div className="flex items-center gap-2 text-sm font-black"><CircleDollarSign size={18} /> Settlement</div>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <MoneyRow label="ยอดขาย" value={gross} />
            <MoneyRow label="ค่าสนาม" value={-session.venueCost} />
            <MoneyRow label="ค่ารับชำระ ~2.5%" value={-paymentFee} />
            <div className="border-t border-dashed border-[#d9e1d9] pt-3"><MoneyRow label="กำไรหลังต้นทุน" value={margin} bold /></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[26px] border border-[#e1e8df] bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between"><div><div className="text-sm font-black">การแบ่งรายได้</div><p className="mt-1 text-xs font-semibold text-[#74837b]">คำนวณจาก Margin หลังหักสนามและค่ารับเงิน</p></div><span className="rounded-full bg-[#f0f4ed] px-3 py-1.5 text-xs font-black">75 / 25</span></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-[#eef4ea] p-4"><div className="flex items-center gap-2 text-xs font-black text-[#68776f]"><UserRound size={15} /> ORGANIZER 75%</div><div className="mt-2 text-3xl font-black">฿{formatBaht(organizer)}</div><p className="mt-1 text-xs text-[#74837b]">พร้อมถอนหลังปิดก๊วน</p></div>
            <div className="rounded-2xl bg-[#eef4ea] p-4"><div className="flex items-center gap-2 text-xs font-black text-[#68776f]"><Building2 size={15} /> CHICKEN BALL 25%</div><div className="mt-2 text-3xl font-black">฿{formatBaht(platform)}</div><p className="mt-1 text-xs text-[#74837b]">Platform revenue</p></div>
          </div>
        </div>

        <div className="rounded-[26px] border border-[#e1e8df] bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-black"><Building2 size={18} /> จ่ายให้สนาม</div>
          <div className="mt-5 text-3xl font-black">฿{formatBaht(session.venueCost)}</div>
          <p className="mt-1 text-xs font-semibold text-[#74837b]">Smash Yard Pickleball</p>
          <div className="mt-4 rounded-xl bg-[#fff7df] px-3 py-2 text-xs font-black text-[#8a6417]">● รอจ่ายหลังจบรอบ</div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#17251f] px-4 py-3.5 text-sm font-black text-white"><QrCode size={17} /> จ่ายให้สนาม</button>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, dark = false, highlight = false }: { value: string; label: string; dark?: boolean; highlight?: boolean }) {
  return <div className={`rounded-2xl p-4 ${dark ? highlight ? 'bg-[#b8f23a] text-[#17251f]' : 'bg-white/8' : 'bg-[#f4f7f1]'}`}><div className="text-2xl font-black tracking-tight">{value}</div><div className={`mt-1 text-[11px] font-bold ${dark && !highlight ? 'text-white/50' : 'text-[#687970]'}`}>{label}</div></div>;
}

function InfoBox({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl bg-[#f4f7f1] p-3 text-center"><div className="text-sm font-black">{value}</div><div className="mt-1 text-[10px] font-bold text-[#77867e]">{label}</div></div>;
}

function MoneyRow({ label, value, bold = false }: { label: string; value: number; bold?: boolean }) {
  return <div className={`flex items-center justify-between ${bold ? 'font-black' : ''}`}><span className="text-[#687970]">{label}</span><span className={value < 0 ? 'text-[#b8513a]' : ''}>{value < 0 ? '-' : ''}฿{formatBaht(Math.abs(value))}</span></div>;
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-black transition md:flex-row md:gap-2 md:text-xs ${active ? 'bg-[#17251f] text-white' : 'text-[#6d7e76] hover:bg-[#f3f5f1]'}`}>{icon}<span>{label}</span></button>;
}
