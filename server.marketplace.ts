import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

type MarketplaceSession = {
  id: string;
  title: string;
  timeSlot: string;
  dateLabel: string;
  headFee: number;
  courtRentalCost: number;
  targetPlayers: number;
  duprRange: string;
  atmosphere: string;
  status: 'open' | 'full' | 'completed';
};

const sessions: MarketplaceSession[] = [];

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'chicken-ball-marketplace',
    environment: isProduction ? 'production' : 'development',
    paymentMode: process.env.PAYMENT_MODE || (isProduction ? 'disabled' : 'preview'),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/sessions', (_req: Request, res: Response) => {
  res.json({ success: true, sessions });
});

app.post('/api/sessions', (req: Request, res: Response) => {
  const price = Number(req.body.headFee);
  const venueCost = Number(req.body.courtRentalCost);
  const capacity = Number(req.body.targetPlayers);

  if (!req.body.title || !Number.isFinite(price) || price <= 0 || !Number.isFinite(capacity) || capacity < 4) {
    return res.status(400).json({ success: false, message: 'ข้อมูลก๊วนไม่ครบหรือราคา/จำนวนผู้เล่นไม่ถูกต้อง' });
  }

  const session: MarketplaceSession = {
    id: `sess_${Date.now()}`,
    title: String(req.body.title),
    timeSlot: String(req.body.timeSlot || '18:00–20:00'),
    dateLabel: String(req.body.dateLabel || 'พรุ่งนี้'),
    headFee: price,
    courtRentalCost: Number.isFinite(venueCost) ? Math.max(0, venueCost) : 0,
    targetPlayers: Math.round(capacity),
    duprRange: String(req.body.duprRange || 'Open level'),
    atmosphere: String(req.body.atmosphere || 'ผสมผสาน'),
    status: 'open',
  };

  sessions.unshift(session);
  return res.status(201).json({ success: true, session });
});

app.post('/api/stripe/create-payment', (req: Request, res: Response) => {
  const paymentMode = process.env.PAYMENT_MODE || (isProduction ? 'disabled' : 'preview');
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ success: false, message: 'ยอดชำระไม่ถูกต้อง' });
  }

  // Preview mode exists only for UX testing. It must never silently run in production.
  if (!isProduction && paymentMode === 'preview') {
    return res.json({
      success: true,
      mode: 'simulated_preview',
      paymentId: `preview_${Date.now()}`,
      amount,
      message: 'Preview payment completed. No real money was charged.',
    });
  }

  // Production intentionally fails closed until a verified payment gateway/webhook is connected.
  return res.status(503).json({
    success: false,
    code: 'PAYMENT_GATEWAY_NOT_READY',
    message: 'ระบบรับเงินจริงยังไม่เปิดใช้งาน กรุณาตั้ง Payment Gateway และ webhook ก่อน',
  });
});

async function start() {
  if (!isProduction) {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chicken Ball marketplace listening on http://0.0.0.0:${PORT}`);
  });
}

start();
