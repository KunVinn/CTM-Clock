// Session persistence: Netlify Blobs in the functions runtime, in-memory Map locally.
const TTL_MS = 30 * 60 * 1000;
const MAX_TURNS = 12;
const memory = new Map();

function getBlobStore() {
  if (!process.env.NETLIFY) return null; // Blobs are only available inside the Netlify runtime.
  try {
    const { getStore } = require('@netlify/blobs');
    return getStore('tcm-sessions');
  } catch {
    return null;
  }
}

function emptySession() {
  return { facts: {}, turn: 0, asked: [], red_flags: [], updated_at: Date.now() };
}

function fresh(raw) {
  const session = { ...emptySession(), ...(raw && typeof raw === 'object' ? raw : {}) };
  return Date.now() - session.updated_at > TTL_MS ? emptySession() : session;
}

async function loadSession(id) {
  const store = getBlobStore();
  if (store) {
    try {
      const raw = await store.get(id, { type: 'json' });
      return fresh(raw);
    } catch {
      return emptySession();
    }
  }
  return fresh(memory.get(id));
}

async function saveSession(id, session) {
  session.updated_at = Date.now();
  session.turn = Math.min(session.turn, MAX_TURNS);
  const store = getBlobStore();
  if (store) {
    try {
      await store.set(id, JSON.stringify(session));
    } catch (error) {
      console.error('session blob save failed:', error);
    }
    return;
  }
  memory.set(id, session);
}

function newSessionId() {
  return globalThis.crypto?.randomUUID?.() || `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

module.exports = { emptySession, loadSession, saveSession, newSessionId, TTL_MS, MAX_TURNS };
