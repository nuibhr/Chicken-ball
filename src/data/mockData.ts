import { Player, CourtMatch, QueuePlayer, EventSession, SquadPlayer } from '../types';

export const INITIAL_PLAYERS: Player[] = [
  // Court 1 - Team A
  {
    id: 'p1',
    name: 'หนุ่ย (มาเดี่ยว)',
    level: 25,
    hp: 100,
    maxHp: 100,
    capColor: 0xEF4444, // Red
    shirtColor: 0x2563EB, // Blue
    side: 'A',
    courtId: 1,
    dupr: 3.85,
    stats: { dink: 88, smash: 79, serve: 85, stamina: 92 },
    paddle: 'Selkirk Vanguard Control',
    avatarIcon: '🧢',
    playStyle: 'Dinker เน้นหยอด'
  },
  {
    id: 'p2',
    name: 'พลอย (มาเดี่ยว)',
    level: 22,
    hp: 95,
    maxHp: 100,
    capColor: 0xF97316, // Orange
    shirtColor: 0xEC4899, // Pink
    side: 'A',
    courtId: 1,
    dupr: 3.42,
    stats: { dink: 92, smash: 70, serve: 80, stamina: 85 },
    paddle: 'Joola Perseus 3',
    avatarIcon: '👧',
    playStyle: 'All-Rounder ครบเครื่อง'
  },
  // Court 1 - Team B
  {
    id: 'p3',
    name: 'เอก (มาเดี่ยว)',
    level: 28,
    hp: 82,
    maxHp: 100,
    capColor: 0x3B82F6, // Blue
    shirtColor: 0x059669, // Emerald
    side: 'B',
    courtId: 1,
    dupr: 4.10,
    stats: { dink: 86, smash: 94, serve: 90, stamina: 88 },
    paddle: 'CRBN 1X 16mm Power',
    avatarIcon: '⚡',
    playStyle: 'Banger สายสแมช'
  },
  {
    id: 'p4',
    name: 'บอย (มาเดี่ยว)',
    level: 24,
    hp: 88,
    maxHp: 100,
    capColor: 0x6B7280, // Grey
    shirtColor: 0xD97706, // Amber
    side: 'B',
    courtId: 1,
    dupr: 3.65,
    stats: { dink: 84, smash: 82, serve: 78, stamina: 90 },
    paddle: 'Paddletek Bantam TS-5',
    avatarIcon: '🔥',
    playStyle: 'All-Rounder ครบเครื่อง'
  },

  // Court 2 - Team A
  {
    id: 'p5',
    name: 'พี่ต้น (มาเดี่ยว)',
    level: 30,
    hp: 100,
    maxHp: 100,
    capColor: 0x10B981, // Green
    shirtColor: 0x7C3AED, // Purple
    side: 'A',
    courtId: 2,
    dupr: 4.28,
    stats: { dink: 95, smash: 89, serve: 92, stamina: 94 },
    paddle: 'Franklin Signature Pro',
    avatarIcon: '👑',
    playStyle: 'Dinker เน้นหยอด'
  },
  {
    id: 'p6',
    name: 'นุช (มาเดี่ยว)',
    level: 26,
    hp: 92,
    maxHp: 100,
    capColor: 0xDB2777, // Pink
    shirtColor: 0x0284C7, // Sky Blue
    side: 'A',
    courtId: 2,
    dupr: 3.72,
    stats: { dink: 89, smash: 78, serve: 84, stamina: 86 },
    paddle: 'Engage Pursuit Pro',
    avatarIcon: '⭐',
    playStyle: 'All-Rounder ครบเครื่อง'
  },
  // Court 2 - Team B
  {
    id: 'p7',
    name: 'แชมป์ (มาเดี่ยว)',
    level: 27,
    hp: 86,
    maxHp: 100,
    capColor: 0x8B5CF6, // Violet
    shirtColor: 0xDC2626, // Crimson
    side: 'B',
    courtId: 2,
    dupr: 3.95,
    stats: { dink: 87, smash: 91, serve: 88, stamina: 89 },
    paddle: 'Diadem Edge 18k Carbon',
    avatarIcon: '🛡️',
    playStyle: 'Banger สายสแมช'
  },
  {
    id: 'p8',
    name: 'กอล์ฟ (มาเดี่ยว)',
    level: 23,
    hp: 90,
    maxHp: 100,
    capColor: 0xEAB308, // Yellow
    shirtColor: 0x1E293B, // Slate
    side: 'B',
    courtId: 2,
    dupr: 3.55,
    stats: { dink: 82, smash: 85, serve: 81, stamina: 84 },
    paddle: 'Six Zero DBD Control',
    avatarIcon: '🎯',
    playStyle: 'All-Rounder ครบเครื่อง'
  },
  // Bench / Waiting for Rotation (กำลังพักดื่มน้ำ รอสลับเข้าชุดถัดไป)
  {
    id: 'p9',
    name: 'เบิร์ด (พักรอบนี้)',
    level: 21,
    hp: 100,
    maxHp: 100,
    capColor: 0x14B8A6,
    shirtColor: 0x475569,
    side: 'A',
    courtId: 0, // Bench
    dupr: 3.15,
    stats: { dink: 75, smash: 78, serve: 76, stamina: 88 },
    paddle: 'Head Radical Elite',
    avatarIcon: '☕',
    playStyle: 'Beginner มือใหม่อยากลอง',
    isBench: true
  },
  {
    id: 'p10',
    name: 'ฝน (พักรอบนี้)',
    level: 24,
    hp: 100,
    maxHp: 100,
    capColor: 0xEC4899,
    shirtColor: 0x059669,
    side: 'B',
    courtId: 0, // Bench
    dupr: 3.35,
    stats: { dink: 84, smash: 72, serve: 79, stamina: 85 },
    paddle: 'Diadem Icon V2',
    avatarIcon: '🍉',
    playStyle: 'Dinker เน้นหยอด',
    isBench: true
  },
  {
    id: 'p11',
    name: 'เต้ (พักรอบนี้)',
    level: 26,
    hp: 100,
    maxHp: 100,
    capColor: 0x6366F1,
    shirtColor: 0xF59E0B,
    side: 'A',
    courtId: 0, // Bench
    dupr: 3.70,
    stats: { dink: 80, smash: 88, serve: 83, stamina: 90 },
    paddle: 'Gearbox Pro Power',
    avatarIcon: '⚡',
    playStyle: 'Banger สายสแมช',
    isBench: true
  },
  {
    id: 'p12',
    name: 'แนน (พักรอบนี้)',
    level: 25,
    hp: 100,
    maxHp: 100,
    capColor: 0xA855F7,
    shirtColor: 0x0EA5E9,
    side: 'B',
    courtId: 0, // Bench
    dupr: 3.58,
    stats: { dink: 83, smash: 80, serve: 82, stamina: 87 },
    paddle: 'ProXR Signature 16',
    avatarIcon: '🥤',
    playStyle: 'All-Rounder ครบเครื่อง',
    isBench: true
  }
];

export const INITIAL_SESSIONS: EventSession[] = [
  {
    id: 'sess_1',
    title: 'ก๊วนเลิกงาน: รวมพลคนหาเพื่อนเล่น (Solo Prime Squad)',
    tagline: 'มาคนเดียวได้เลย โฮสต์จัดคู่ หมุนเวียน 12 คน เล่น 2 คอร์ตตลอด 2 ชม.',
    timeSlot: '18:00 - 20:00',
    dateLabel: 'วันนี้ (รอบปัจจุบัน)',
    status: 'in_progress',
    headFee: 190, // ค่าหัวคิว 190 บ./คน
    courtRentalCost: 800, // ค่าเช่า 2 คอร์ด 2 ชม.
    targetPlayers: 12,
    duprRange: 'DUPR 3.0 - 4.2 (เล่นเป็นแล้ว ตีแรลลี่สนุก)',
    atmosphere: 'ผสมผสาน',
    currentMatchIndex: 2,
    totalMatchesInSession: 6,
    registeredPlayers: [
      { id: 'p1', name: 'หนุ่ย', dupr: 3.85, avatarIcon: '🧢', playStyle: 'Dinker เน้นหยอด', bio: 'มาคนเดียวครับ เน้นสนุก ไม่ซีเรียสแต้ม', paidStatus: 'paid', joinedAt: '16:20', isSolo: true, assignedCourt: 1, assignedSide: 'A' },
      { id: 'p2', name: 'พลอย', dupr: 3.42, avatarIcon: '👧', playStyle: 'All-Rounder ครบเครื่อง', bio: 'เพิ่งย้ายมาขอนแก่น ไม่มีก๊วน ดีใจที่มีระบบนี้!', paidStatus: 'paid', joinedAt: '16:35', isSolo: true, assignedCourt: 1, assignedSide: 'A' },
      { id: 'p3', name: 'เอก', dupr: 4.10, avatarIcon: '⚡', playStyle: 'Banger สายสแมช', bio: 'สายสปีดลูก แต่ดิงก์ได้ครับ หาเพื่อนซ้อม', paidStatus: 'paid', joinedAt: '16:40', isSolo: true, assignedCourt: 1, assignedSide: 'B' },
      { id: 'p4', name: 'บอย', dupr: 3.65, avatarIcon: '🔥', playStyle: 'All-Rounder ครบเครื่อง', bio: 'เพื่อนที่ทำงานไม่เล่นพิเคิลบอล เลยมาแจมเดี่ยว', paidStatus: 'paid', joinedAt: '16:50', isSolo: true, assignedCourt: 1, assignedSide: 'B' },
      { id: 'p5', name: 'พี่ต้น', dupr: 4.28, avatarIcon: '👑', playStyle: 'Dinker เน้นหยอด', bio: 'ชอบเล่นดิงก์ยาวๆ ชวนคุยเก่งครับ', paidStatus: 'paid', joinedAt: '17:00', isSolo: true, assignedCourt: 2, assignedSide: 'A' },
      { id: 'p6', name: 'นุช', dupr: 3.72, avatarIcon: '⭐', playStyle: 'All-Rounder ครบเครื่อง', bio: 'มาเดี่ยวประจำค่ะ สบายใจดี ไม่ต้องง้อเพื่อน', paidStatus: 'paid', joinedAt: '17:05', isSolo: true, assignedCourt: 2, assignedSide: 'A' },
      { id: 'p7', name: 'แชมป์', dupr: 3.95, avatarIcon: '🛡️', playStyle: 'Banger สายสแมช', bio: 'ชอบตีบ่ายคล้อยถึงค่ำครับ', paidStatus: 'paid', joinedAt: '17:10', isSolo: true, assignedCourt: 2, assignedSide: 'B' },
      { id: 'p8', name: 'กอล์ฟ', dupr: 3.55, avatarIcon: '🎯', playStyle: 'All-Rounder ครบเครื่อง', bio: 'พร้อมลุยทุกแมตช์ครับ', paidStatus: 'paid', joinedAt: '17:15', isSolo: true, assignedCourt: 2, assignedSide: 'B' },
      { id: 'p9', name: 'เบิร์ด', dupr: 3.15, avatarIcon: '☕', playStyle: 'Beginner มือใหม่อยากลอง', bio: 'มือใหม่ครับ แนะนำด้วยครับผม', paidStatus: 'paid', joinedAt: '17:20', isSolo: true, isBench: true },
      { id: 'p10', name: 'ฝน', dupr: 3.35, avatarIcon: '🍉', playStyle: 'Dinker เน้นหยอด', bio: 'ชอบดื่มชานมแล้วมาตีพิเคิลบอล', paidStatus: 'paid', joinedAt: '17:22', isSolo: true, isBench: true },
      { id: 'p11', name: 'เต้', dupr: 3.70, avatarIcon: '⚡', playStyle: 'Banger สายสแมช', bio: 'มาหาคู่ซ้อมก่อนลงแข่งทัวร์', paidStatus: 'paid', joinedAt: '17:25', isSolo: true, isBench: true },
      { id: 'p12', name: 'แนน', dupr: 3.58, avatarIcon: '🥤', playStyle: 'All-Rounder ครบเครื่อง', bio: 'มาแจมสนุกๆ คลายเครียด', paidStatus: 'paid', joinedAt: '17:30', isSolo: true, isBench: true }
    ]
  },
  {
    id: 'sess_2',
    title: 'ก๊วนรอบดึก: Night Owl King of Court (รับเพิ่มอีก 3 คน!)',
    tagline: 'สำหรับคนนอนดึก เลิกงานช้า ไม่ต้องเกณฑ์เพื่อน โฮสต์จับคู่ให้ลงตีทั้งชุด',
    timeSlot: '20:00 - 22:00',
    dateLabel: 'วันนี้ (รอบถัดไป)',
    status: 'open',
    headFee: 200, // ค่าหัวคิว 200 บ./คน
    courtRentalCost: 800,
    targetPlayers: 12,
    duprRange: 'DUPR 3.0 - 4.5 (ระดับกลาง - แข่งขัน)',
    atmosphere: 'จริงจังเก็บแต้ม',
    currentMatchIndex: 0,
    totalMatchesInSession: 6,
    registeredPlayers: [
      { id: 's2_1', name: 'โค้ชกานต์ (KKU)', dupr: 4.50, avatarIcon: '🏅', playStyle: 'All-Rounder ครบเครื่อง', bio: 'ยินดีไกด์ช็อตให้เพื่อนร่วมตี้ครับ', paidStatus: 'paid', joinedAt: '15:10', isSolo: true },
      { id: 's2_2', name: 'มาร์ค', dupr: 3.45, avatarIcon: '🚀', playStyle: 'Banger สายสแมช', bio: 'มาเดี่ยวครับ คล่องตัวดี', paidStatus: 'paid', joinedAt: '15:40', isSolo: true },
      { id: 's2_3', name: 'วิว', dupr: 3.80, avatarIcon: '✨', playStyle: 'Dinker เน้นหยอด', bio: 'ชอบดวลหน้าเน็ต Kitchen มาก', paidStatus: 'paid', joinedAt: '16:00', isSolo: true },
      { id: 's2_4', name: 'กิตติ', dupr: 3.60, avatarIcon: '🎾', playStyle: 'All-Rounder ครบเครื่อง', bio: 'หาเพื่อนตีโซน มข.', paidStatus: 'paid', joinedAt: '16:15', isSolo: true },
      { id: 's2_5', name: 'บอส', dupr: 3.90, avatarIcon: '🕶️', playStyle: 'Banger สายสแมช', bio: 'พร้อมตีรอบดึกครับ ไม่ชอบแดดร้อน', paidStatus: 'paid', joinedAt: '16:30', isSolo: true },
      { id: 's2_6', name: 'หมอเจมส์', dupr: 3.75, avatarIcon: '🩺', playStyle: 'Dinker เน้นหยอด', bio: 'ออกเวรแล้วมาคลายเส้น', paidStatus: 'paid', joinedAt: '17:00', isSolo: true },
      { id: 's2_7', name: 'แอนนา', dupr: 3.30, avatarIcon: '🎀', playStyle: 'All-Rounder ครบเครื่อง', bio: 'มาเดี่ยวครั้งที่ 3 แล้ว ติดใจระบบ!', paidStatus: 'paid', joinedAt: '17:15', isSolo: true },
      { id: 's2_8', name: 'บิ๊ก', dupr: 4.15, avatarIcon: '💪', playStyle: 'Banger สายสแมช', bio: 'สายไดรฟ์แรงๆ ครับ', paidStatus: 'paid', joinedAt: '17:35', isSolo: true },
      { id: 's2_9', name: 'โจ้', dupr: 3.50, avatarIcon: '🎸', playStyle: 'All-Rounder ครบเครื่อง', bio: 'ชิลล์ๆ ได้หมดครับ', paidStatus: 'paid', joinedAt: '17:40', isSolo: true }
    ]
  },
  {
    id: 'sess_3',
    title: 'ก๊วนมือใหม่หัดดิงก์ (Beginner Friendly Solo Party)',
    tagline: 'ไม่มีไม้ ไม่เคยเล่น ไม่มีเพื่อน? มาแต่ตัว มีคนสอน มีเพื่อนเล่นแน่นอน!',
    timeSlot: '16:00 - 18:00',
    dateLabel: 'พรุ่งนี้',
    status: 'open',
    headFee: 160,
    courtRentalCost: 700,
    targetPlayers: 10,
    duprRange: 'DUPR 2.0 - 3.2 (มือใหม่ต้อนรับสุดๆ)',
    atmosphere: 'ชิลล์เน้นสนุก',
    currentMatchIndex: 0,
    totalMatchesInSession: 5,
    registeredPlayers: [
      { id: 's3_1', name: 'ฟ้า', dupr: 2.50, avatarIcon: '🌸', playStyle: 'Beginner มือใหม่อยากลอง', bio: 'เพิ่งหัดตีได้ 2 วัน อยากมีเพื่อนเล่น', paidStatus: 'paid', joinedAt: '14:00', isSolo: true },
      { id: 's3_2', name: 'วิน', dupr: 2.80, avatarIcon: '👟', playStyle: 'Beginner มือใหม่อยากลอง', bio: 'มาคนเดียวครับ กำลังหาก๊วนประจำ', paidStatus: 'paid', joinedAt: '14:20', isSolo: true },
      { id: 's3_3', name: 'แพรว', dupr: 2.65, avatarIcon: '🌼', playStyle: 'Beginner มือใหม่อยากลอง', bio: 'อยากออกกำลังกาย ไม่กล้าไปลงกับสายโหด', paidStatus: 'paid', joinedAt: '14:50', isSolo: true },
      { id: 's3_4', name: 'อาร์ท', dupr: 3.00, avatarIcon: '🎨', playStyle: 'All-Rounder ครบเครื่อง', bio: 'ใจดี ตีรับส่งลูกให้ได้ครับ', paidStatus: 'paid', joinedAt: '15:10', isSolo: true },
      { id: 's3_5', name: 'เมย์', dupr: 2.70, avatarIcon: '🧋', playStyle: 'Beginner มือใหม่อยากลอง', bio: 'มาคนเดียวครั้งแรก ตื่นเต้นมาก', paidStatus: 'paid', joinedAt: '15:30', isSolo: true }
    ]
  }
];

export const INITIAL_MATCHES: Record<number, CourtMatch> = {
  1: {
    courtId: 1,
    courtName: 'คอร์ต 1 (Gym A - Prime Batch)',
    teamAName: 'หนุ่ย + พลอย (มาเดี่ยว)',
    teamBName: 'เอก + บอย (มาเดี่ยว)',
    teamAPlayers: [INITIAL_PLAYERS[0], INITIAL_PLAYERS[1]],
    teamBPlayers: [INITIAL_PLAYERS[2], INITIAL_PLAYERS[3]],
    scoreA: 9,
    scoreB: 7,
    serverNumber: 2,
    servingSide: 'A',
    currentRound: 2,
    totalRounds: 6,
    gameStatus: 'active',
    sessionTitle: 'รอบ 18:00 - 20:00 (ชุด Match 2/6)',
    tacticalTip: 'ก๊วนนี้โฮสต์สุ่มคู่ให้: หนุ่ยสายดิงก์เข้าคู่กับพลอยได้สมดุล — เอกกับบอยต้องเน้นสื่อสารเรียกบอล "Mine!" ให้ชัดเจน!'
  },
  2: {
    courtId: 2,
    courtName: 'คอร์ต 2 (Gym B - Prime Batch)',
    teamAName: 'พี่ต้น + นุช (มาเดี่ยว)',
    teamBName: 'แชมป์ + กอล์ฟ (มาเดี่ยว)',
    teamAPlayers: [INITIAL_PLAYERS[4], INITIAL_PLAYERS[5]],
    teamBPlayers: [INITIAL_PLAYERS[6], INITIAL_PLAYERS[7]],
    scoreA: 6,
    scoreB: 5,
    serverNumber: 1,
    servingSide: 'B',
    currentRound: 2,
    totalRounds: 6,
    gameStatus: 'active',
    sessionTitle: 'รอบ 18:00 - 20:00 (ชุด Match 2/6)',
    tacticalTip: 'สลับหมุนเวียนคู่ทุกแมตช์: จบเซ็ตนี้ 4 คนที่ม้านั่งพัก (เบิร์ด, ฝน, เต้, แนน) จะผลัดเข้ามาลงสนามแทน!'
  }
};

export const INITIAL_QUEUE: QueuePlayer[] = [
  { id: 'q1', name: 'ดอน (มาเดี่ยว รอสล็อตถัดไป)', dupr: 3.40, joinTime: '17:40', status: 'waiting', isSolo: true, contactPhone: '081-xxx-9988' },
  { id: 'q2', name: 'แพท (มาเดี่ยว เพิ่งมาถึง)', dupr: 3.20, joinTime: '17:45', status: 'waiting', isSolo: true, contactPhone: '089-xxx-1122' },
  { id: 'q3', name: 'โอลิเวอร์ (Expats KK)', dupr: 3.90, joinTime: '17:48', status: 'waiting', isSolo: true, contactPhone: '095-xxx-3344' }
];

