/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Player, CourtMatch, QueuePlayer, ArenaLightingMode, EventSession, SquadPlayer, AdminUser, DuprMatchBatch } from './types';
import { INITIAL_PLAYERS, INITIAL_MATCHES, INITIAL_QUEUE, INITIAL_SESSIONS } from './data/mockData';
import { retroAudio } from './audio/retroAudio';
import { TopNav } from './components/TopNav';
import { PickleballScene } from './components/PickleballScene';
import { TacticalHud } from './components/TacticalHud';
import { MobileSimulatorModal } from './components/MobileSimulatorModal';
import { CashierModal } from './components/CashierModal';
import { TrainerCardModal } from './components/TrainerCardModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminLedgerModal } from './components/AdminLedgerModal';

export default function App() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [matches, setMatches] = useState<Record<number, CourtMatch>>(INITIAL_MATCHES);
  const [activeCourtId, setActiveCourtId] = useState<number>(1);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(INITIAL_PLAYERS[0]);
  const [queue, setQueue] = useState<QueuePlayer[]>(INITIAL_QUEUE);

  // Event Sessions & Solo Matchmaking State
  const [sessions, setSessions] = useState<EventSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('sess_1');

  // Modals & UI States
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isCashierOpen, setIsCashierOpen] = useState<boolean>(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Player | null>(null);

  // Admin & Full-Stack Ledger States
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminLedgerOpen, setIsAdminLedgerOpen] = useState<boolean>(false);

  // Diorama Controls
  const [lightingMode, setLightingMode] = useState<ArenaLightingMode>('day');
  const [cameraPreset, setCameraPreset] = useState<'isometric' | 'topdown' | 'action'>('isometric');
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);
  const [isRallyActive, setIsRallyActive] = useState<boolean>(true);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(
    '🎾 ยินดีต้อนรับสู่ก๊วนหาเพื่อนเล่น! จัดรอบลงสนามเป็นชุด & คิดค่าหัวคิว'
  );

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3800);
  }, []);

  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Rotate Batch Squad Handler ("จัดเข้าไปเลยทั้งชุด ทั้งชั่วโมงเป็นรอบๆ")
  const handleRotateBatch = useCallback(() => {
    retroAudio.playLevelUp();

    setSessions((prevSessions) =>
      prevSessions.map((s) => {
        if (s.id === activeSessionId) {
          const nextIndex = s.currentMatchIndex < s.totalMatchesInSession ? s.currentMatchIndex + 1 : 1;
          return { ...s, currentMatchIndex: nextIndex };
        }
        return s;
      })
    );

    // Shuffle players in the squad: rotate the bench players into courts and court players to bench!
    setPlayers((currentPlayers) => {
      // Rotate the 12 players circularly by 4 positions
      const rotated = [...currentPlayers];
      const chunk = rotated.splice(0, 4);
      rotated.push(...chunk);

      // Reassign court and bench status
      // First 4 -> Court 1
      // Next 4 -> Court 2
      // Last 4 -> Bench
      return rotated.map((p, idx) => {
        if (idx < 4) {
          return { ...p, courtId: 1, side: idx < 2 ? 'A' : 'B', isBench: false, hp: 100 };
        } else if (idx < 8) {
          return { ...p, courtId: 2, side: idx < 6 ? 'A' : 'B', isBench: false, hp: 100 };
        } else {
          return { ...p, courtId: 0, isBench: true, hp: 100 };
        }
      });
    });

    // Update matches on the 2 courts with the newly rotated pairs
    setMatches((prev) => {
      // Find current rotated players
      const p1 = players[4] || players[0];
      const p2 = players[5] || players[1];
      const p3 = players[6] || players[2];
      const p4 = players[7] || players[3];
      const p5 = players[8] || players[4];
      const p6 = players[9] || players[5];
      const p7 = players[10] || players[6];
      const p8 = players[11] || players[7];

      return {
        1: {
          ...prev[1],
          teamAName: `${p1.name.split(' ')[0]} + ${p2.name.split(' ')[0]} (สลับชุด)`,
          teamBName: `${p3.name.split(' ')[0]} + ${p4.name.split(' ')[0]} (สลับชุด)`,
          teamAPlayers: [p1, p2],
          teamBPlayers: [p3, p4],
          scoreA: 0,
          scoreB: 0,
          serverNumber: 1,
          servingSide: 'A',
          currentRound: (prev[1]?.currentRound || 1) + 1,
          gameStatus: 'active',
          sessionTitle: `รอบ ${currentSession?.timeSlot} (ชุดสลับใหม่)`,
          tacticalTip: 'สลับผู้เล่นชุดใหม่ลงสนาม: สื่อสารจังหวะดิงก์หน้าเน็ตกับคู่ใหม่ และคอยเช็กเท้าคู่แข่ง!'
        },
        2: {
          ...prev[2],
          teamAName: `${p5.name.split(' ')[0]} + ${p6.name.split(' ')[0]} (สลับชุด)`,
          teamBName: `${p7.name.split(' ')[0]} + ${p8.name.split(' ')[0]} (สลับชุด)`,
          teamAPlayers: [p5, p6],
          teamBPlayers: [p7, p8],
          scoreA: 0,
          scoreB: 0,
          serverNumber: 1,
          servingSide: 'B',
          currentRound: (prev[2]?.currentRound || 1) + 1,
          gameStatus: 'active',
          sessionTitle: `รอบ ${currentSession?.timeSlot} (ชุดสลับใหม่)`,
          tacticalTip: 'ผลัด 4 คนจากม้านั่งพักลงมาสดชื่น: ให้ใช้แรงเปิดเกมรุก Drive สลับ Soft Drop!'
        }
      };
    });

    showToast('🔄 สลับชุดผู้เล่นก๊วนลงสนามเรียบร้อย! ผลัดคนจากม้านั่งพักลงดวลครบทุกคน');
  }, [activeSessionId, currentSession, players, showToast]);

  // Solo Registration Handler
  const handleRegisterSoloSession = useCallback((sessionId: string, newSolo: SquadPlayer) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const updated = [...s.registeredPlayers, newSolo];
          return {
            ...s,
            registeredPlayers: updated,
            status: updated.length >= s.targetPlayers ? 'full' : 'open'
          };
        }
        return s;
      })
    );

    // Also add to active 3D players if in current session
    if (sessionId === activeSessionId) {
      const newDioramaPlayer: Player = {
        id: newSolo.id,
        name: newSolo.name,
        level: 22,
        hp: 100,
        maxHp: 100,
        capColor: Math.floor(Math.random() * 0xffffff),
        shirtColor: Math.floor(Math.random() * 0xffffff),
        side: 'A',
        courtId: 0, // bench
        dupr: newSolo.dupr,
        stats: { dink: 82, smash: 80, serve: 80, stamina: 90 },
        paddle: 'Selkirk Power Air',
        avatarIcon: newSolo.avatarIcon,
        playStyle: newSolo.playStyle,
        isBench: true
      };
      setPlayers((prev) => [...prev, newDioramaPlayer]);
    }

    const targetSession = sessions.find((s) => s.id === sessionId);
    showToast(`🎉 ${newSolo.name} ลงตี้คนเดียวสำเร็จ! ชำระค่าหัวคิว ฿${targetSession?.headFee || 190} เรียบร้อย`);
  }, [activeSessionId, sessions, showToast]);

  // Toggle Payment for a Player
  const handleTogglePlayerPayment = useCallback((sessionId: string, playerId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            registeredPlayers: s.registeredPlayers.map((p) => {
              if (p.id === playerId) {
                const nextStatus = p.paidStatus === 'paid' ? 'pending' : 'paid';
                return { ...p, paidStatus: nextStatus };
              }
              return p;
            })
          };
        }
        return s;
      })
    );
  }, []);

  // Update Score Handler
  const handleUpdateScore = (courtId: number, team: 'A' | 'B', delta: number) => {
    setMatches((prev) => {
      const match = prev[courtId];
      if (!match) return prev;

      let newScoreA = match.scoreA + (team === 'A' ? delta : 0);
      let newScoreB = match.scoreB + (team === 'B' ? delta : 0);

      newScoreA = Math.max(0, newScoreA);
      newScoreB = Math.max(0, newScoreB);

      let status: 'active' | 'match_point' | 'finished' = 'active';
      if ((newScoreA >= 10 || newScoreB >= 10) && Math.abs(newScoreA - newScoreB) >= 1) {
        status = 'match_point';
      }
      if ((newScoreA >= 11 || newScoreB >= 11) && Math.abs(newScoreA - newScoreB) >= 2) {
        status = 'finished';
        showToast(`🏆 ${team === 'A' ? match.teamAName : match.teamBName} คว้าชัยชนะในเซ็ตนี้!`);
      }

      setPlayers((currentPlayers) =>
        currentPlayers.map((p) => {
          if (p.courtId === courtId) {
            const isWinner = p.side === team;
            const hpDelta = isWinner ? -3 : -7;
            const newHp = Math.max(20, Math.min(100, p.hp + hpDelta));
            return { ...p, hp: newHp };
          }
          return p;
        })
      );

      return {
        ...prev,
        [courtId]: {
          ...match,
          scoreA: newScoreA,
          scoreB: newScoreB,
          gameStatus: status
        }
      };
    });
  };

  // Next Round Handler
  const handleNextRound = (courtId: number) => {
    setMatches((prev) => {
      const m = prev[courtId];
      if (!m) return prev;
      const nextR = m.currentRound < m.totalRounds ? m.currentRound + 1 : 1;
      showToast(`⚡ เริ่มต้นการแข่งขันรอบที่ ${nextR} / ${m.totalRounds}!`);
      return {
        ...prev,
        [courtId]: {
          ...m,
          currentRound: nextR,
          scoreA: 0,
          scoreB: 0,
          serverNumber: 1,
          servingSide: 'A',
          gameStatus: 'active'
        }
      };
    });

    setPlayers((currentPlayers) =>
      currentPlayers.map((p) => (p.courtId === courtId ? { ...p, hp: 100 } : p))
    );
  };

  // Switch Serving Side / Server
  const handleSwitchServingSide = (courtId: number) => {
    setMatches((prev) => {
      const m = prev[courtId];
      if (!m) return prev;
      if (m.serverNumber === 1) {
        showToast(`เปลี่ยนเป็น Server #2 ฝ่าย ${m.servingSide}`);
        return {
          ...prev,
          [courtId]: { ...m, serverNumber: 2 }
        };
      } else {
        const nextSide = m.servingSide === 'A' ? 'B' : 'A';
        showToast(`Side Out! เปลี่ยนฝ่ายเสิร์ฟเป็น Side ${nextSide} มือ 1`);
        return {
          ...prev,
          [courtId]: { ...m, servingSide: nextSide, serverNumber: 1 }
        };
      }
    });
  };

  // Reset Match
  const handleResetMatch = (courtId: number) => {
    setMatches((prev) => {
      const m = prev[courtId];
      if (!m) return prev;
      return {
        ...prev,
        [courtId]: {
          ...m,
          scoreA: 0,
          scoreB: 0,
          serverNumber: 1,
          servingSide: 'A',
          gameStatus: 'active'
        }
      };
    });
    showToast(`รีเซ็ตคะแนนคอร์ต ${courtId} เป็น 0 - 0`);
  };

  // AI Tactical Advice Generator
  const handleAnalyzeTactics = (courtId: number) => {
    setIsAiAnalyzing(true);
    retroAudio.playSelect();

    const tacticalPool = [
      'เน้น Third Shot Drop ลงใน Kitchen ข้ามไปฝั่งซ้ายของคู่แข่งเพื่อบีบให้เขายกบอลสูงให้เราบุกสแมช!',
      'สังเกตเห็นว่าคู่แข่งชอบสปีดบอลเร็ว ให้ฝ่ายเราถอย 1 ก้าว แล้วใช้ Soft Reset บล็อกบอลให้ตกลงหน้าเน็ต',
      'คู่แข่งยืนซ้อนกันในโซนเสิร์ฟ แนะนำให้ส่งลูกไดรฟ์ทะลุช่องกลางระหว่างตัว (Middle Solves Riddles)!',
      'ขยับเข้าใกล้เส้น Kitchen Line ให้เร็วขึ้นหลังรีเทิร์นเสิร์ฟ เพื่อบีบพื้นที่ดักวอลเลย์กลางอากาศ',
      'จังหวะหยอด Dink ดวลหน้าเน็ต ให้เปลี่ยนมุม Crosscourt ฉับพลันเพื่อดึงตัวคู่แข่งออกจากกลางคอร์ด'
    ];

    setTimeout(() => {
      const randomAdvice = tacticalPool[Math.floor(Math.random() * tacticalPool.length)];
      setMatches((prev) => {
        const m = prev[courtId];
        if (!m) return prev;
        return {
          ...prev,
          [courtId]: {
            ...m,
            tacticalTip: randomAdvice
          }
        };
      });
      setIsAiAnalyzing(false);
      retroAudio.playLevelUp();
      showToast('🤖 AI อัปเดตแท็กติกการเล่นใหม่แล้ว!');
    }, 600);
  };

  // Toggle SFX
  const handleToggleSfx = () => {
    const nextState = retroAudio.toggle();
    setSfxEnabled(nextState);
  };

  // Open Admin Handler
  const handleOpenAdmin = () => {
    retroAudio.playSelect();
    if (adminUser) {
      setIsAdminLedgerOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Deploy DUPR Balanced Squad to 3D Arena
  const handleDeploySquadToCourts = (balancedBatch: DuprMatchBatch) => {
    const c1p1 = balancedBatch.court1.teamA[0];
    const c1p2 = balancedBatch.court1.teamA[1];
    const c1p3 = balancedBatch.court1.teamB[0];
    const c1p4 = balancedBatch.court1.teamB[1];

    const c2p1 = balancedBatch.court2.teamA[0];
    const c2p2 = balancedBatch.court2.teamA[1];
    const c2p3 = balancedBatch.court2.teamB[0];
    const c2p4 = balancedBatch.court2.teamB[1];

    // Find full player records or fallback
    const findP = (id: string, defIdx: number) =>
      players.find((p) => p.id === id) || players[defIdx];

    const pC1A1 = findP(c1p1.id, 0);
    const pC1A2 = findP(c1p2.id, 1);
    const pC1B1 = findP(c1p3.id, 2);
    const pC1B2 = findP(c1p4.id, 3);

    const pC2A1 = findP(c2p1.id, 4);
    const pC2A2 = findP(c2p2.id, 5);
    const pC2B1 = findP(c2p3.id, 6);
    const pC2B2 = findP(c2p4.id, 7);

    setMatches((prev) => ({
      ...prev,
      1: {
        ...prev[1],
        teamAName: `${pC1A1.name.split(' ')[0]} + ${pC1A2.name.split(' ')[0]} (DUPR ${balancedBatch.court1.avgDuprA})`,
        teamBName: `${pC1B1.name.split(' ')[0]} + ${pC1B2.name.split(' ')[0]} (DUPR ${balancedBatch.court1.avgDuprB})`,
        teamAPlayers: [pC1A1, pC1A2],
        teamBPlayers: [pC1B1, pC1B2],
        scoreA: 0,
        scoreB: 0,
        gameStatus: 'active',
        tacticalTip: `DUPR สมดุลขั้นเทพ: ความต่างเพียง ${balancedBatch.court1.deltaDupr} แต้ม! ดวลสูสีไม่มีทีมแบก`
      },
      2: {
        ...prev[2],
        teamAName: `${pC2A1.name.split(' ')[0]} + ${pC2A2.name.split(' ')[0]} (DUPR ${balancedBatch.court2.avgDuprA})`,
        teamBName: `${pC2B1.name.split(' ')[0]} + ${pC2B2.name.split(' ')[0]} (DUPR ${balancedBatch.court2.avgDuprB})`,
        teamAPlayers: [pC2A1, pC2A2],
        teamBPlayers: [pC2B1, pC2B2],
        scoreA: 0,
        scoreB: 0,
        gameStatus: 'active',
        tacticalTip: `DUPR สมดุลขั้นเทพ: ความต่างเพียง ${balancedBatch.court2.deltaDupr} แต้ม! ดวลสูสีไม่มีทีมแบก`
      }
    }));

    // Update 3D player positions
    setPlayers((prev) => {
      const activeCourt1Ids = new Set([pC1A1.id, pC1A2.id, pC1B1.id, pC1B2.id]);
      const activeCourt2Ids = new Set([pC2A1.id, pC2A2.id, pC2B1.id, pC2B2.id]);

      return prev.map((p) => {
        if (activeCourt1Ids.has(p.id)) {
          const side = p.id === pC1A1.id || p.id === pC1A2.id ? 'A' : 'B';
          return { ...p, courtId: 1, side, isBench: false };
        } else if (activeCourt2Ids.has(p.id)) {
          const side = p.id === pC2A1.id || p.id === pC2A2.id ? 'A' : 'B';
          return { ...p, courtId: 2, side, isBench: false };
        } else {
          return { ...p, courtId: 0, isBench: true };
        }
      });
    });

    showToast('🚀 จัดก๊วนขั้นเทพสำเร็จ! นำคู่สมดุล DUPR ขึ้นสนาม 3D เรียบร้อยแล้ว');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#080f0c] text-[#F8FAF6] select-none font-sans">
      {/* Top Header Navigation */}
      <TopNav
        onToggleSimulator={() => setIsSimulatorOpen(!isSimulatorOpen)}
        isSimulatorOpen={isSimulatorOpen}
        onOpenCashier={() => setIsCashierOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={Boolean(adminUser)}
        adminName={adminUser?.name}
        sfxEnabled={sfxEnabled}
        onToggleSfx={handleToggleSfx}
        cameraPreset={cameraPreset}
        onChangeCamera={setCameraPreset}
        lightingMode={lightingMode}
        onChangeLighting={setLightingMode}
        currentSession={currentSession}
        onRotateBatch={handleRotateBatch}
      />

      {/* 3D WebGL 2.5D Diorama Canvas */}
      <PickleballScene
        players={players}
        activeCourtId={activeCourtId}
        onSelectPlayer={(p) => {
          setSelectedTrainer(p);
        }}
        onSelectCourt={(cId) => {
          setActiveCourtId(cId);
          showToast(`สลับโฟกัสไปที่ ${matches[cId]?.courtName || `คอร์ต ${cId}`}`);
        }}
        lightingMode={lightingMode}
        cameraPreset={cameraPreset}
        isRallyActive={isRallyActive}
        onToggleRally={() => setIsRallyActive(!isRallyActive)}
      />

      {/* Floating Tactical HUD: Match Board */}
      <TacticalHud
        match={matches[activeCourtId] || matches[1]}
        onUpdateScore={handleUpdateScore}
        onNextRound={handleNextRound}
        onSwitchServingSide={handleSwitchServingSide}
        onResetMatch={handleResetMatch}
        onAnalyzeTactics={handleAnalyzeTactics}
        onRotateBatch={handleRotateBatch}
        isAiAnalyzing={isAiAnalyzing}
      />

      {/* Interactive Mobile Simulator Modal (Solo Matchmaker & Head Fee App) */}
      <MobileSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        currentPlayer={currentPlayer}
        players={players}
        matches={matches}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onRegisterSoloSession={handleRegisterSoloSession}
        onRotateBatch={handleRotateBatch}
      />

      {/* Cashier / Host Management Modal (Event Sessions & Head Fee Cashier) */}
      <CashierModal
        isOpen={isCashierOpen}
        onClose={() => setIsCashierOpen(false)}
        matches={matches}
        players={players}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onRotateBatch={handleRotateBatch}
        onAddSoloPlayer={(solo) => handleRegisterSoloSession(activeSessionId, solo)}
        onTogglePlayerPayment={handleTogglePlayerPayment}
      />

      {/* Trainer Card Modal (when clicking 3D trainer) */}
      <TrainerCardModal
        player={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
        onSelectAsUser={(p) => {
          setCurrentPlayer(p);
          showToast(`เปลี่ยนผู้เล่นหลักเป็น "${p.name}" เรียบร้อย!`);
        }}
      />

      {/* Admin Login Modal (PIN 8888 or admin/admin123) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setIsAdminLedgerOpen(true);
          showToast(`ยินดีต้อนรับ ${user.name}! เข้าสู่ระบบแอดมินสำเร็จ`);
        }}
      />

      {/* Full-Stack Admin Ledger & Cashflow Management Modal */}
      <AdminLedgerModal
        isOpen={isAdminLedgerOpen}
        onClose={() => setIsAdminLedgerOpen(false)}
        adminUser={adminUser}
        onLogout={() => {
          setAdminUser(null);
          setIsAdminLedgerOpen(false);
          showToast('ออกจากระบบแอดมินเรียบร้อย');
        }}
        currentSessions={sessions}
        onDeploySquadToCourts={handleDeploySquadToCourts}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all">
          <div className="glass-pill px-4 py-2 rounded-2xl text-xs font-bold text-[#B8F23A] border border-[#B8F23A]/40 shadow-xl flex items-center gap-2 bg-slate-950/85 backdrop-blur-md">
            <span>⚡</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
