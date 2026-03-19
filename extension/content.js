/**
 * LeakWall Content Script
 * Runs on supported AI tool pages.
 * Intercepts paste and input events, scans for sensitive data patterns,
 * and warns the user before content reaches the AI.
 *
 * ALL PROCESSING IS LOCAL — no data is transmitted to LeakWall servers.
 */

import { scanText, LeakResult } from './scanner.js';

const TOOL_NAME = detectToolName();

function detectToolName() {
  const host = window.location.hostname;
  const map = {
    'chat.openai.com': 'ChatGPT',
    'chatgpt.com': 'ChatGPT',
    'claude.ai': 'Claude',
    'gemini.google.com': 'Gemini',
    'copilot.microsoft.com': 'Copilot',
    'chat.deepseek.com': 'DeepSeek',
    'www.perplexity.ai': 'Perplexity',
    'poe.com': 'Poe',
    'www.jasper.ai': 'Jasper',
    'app.copy.ai': 'Copy.ai',
    'chat.mistral.ai': 'Mistral',
  };
  return map[host] || host;
}

let warningOverlay = null;

function removeWarning() {
  if (warningOverlay) {
    warningOverlay.remove();
    warningOverlay = null;
  }
}

function showWarning(leaks, targetEl) {
  removeWarning();

  const overlay = document.createElement('div');
  overlay.id = 'leakwall-warning';
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2147483647;
    width: 340px;
    background: #0f172a;
    border: 1px solid #ef4444;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(239,68,68,0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    animation: leakwall-slide-in 0.2s ease-out;
  `;

  const leakSummary = leaks.map(l => `<li style="margin:4px 0;color:#fca5a5">● ${l.label}</li>`).join('');

  overlay.innerHTML = `
    <style>
      @keyframes leakwall-slide-in {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
    </style>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:36px;height:36px;background:#ef4444;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">
        🛡️
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#fff">Sensitive data detected</div>
        <div style="font-size:11px;color:#94a3b8;margin-top:1px">LeakWall intercepted before ${TOOL_NAME}</div>
      </div>
    </div>
    <ul style="list-style:none;margin:0 0 14px;padding:0;font-size:12px">
      ${leakSummary}
    </ul>
    <div style="display:flex;gap:8px">
      <button id="leakwall-send-anyway" style="flex:1;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:#94a3b8;font-size:12px;font-weight:600;cursor:pointer">
        Send anyway
      </button>
      <button id="leakwall-dismiss" style="flex:1;padding:8px;background:#ef4444;border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:600;cursor:pointer">
        Clear & edit
      </button>
    </div>
    <div style="margin-top:10px;font-size:10px;color:#475569;text-align:center">
      All detection is local. LeakWall never reads your content.
    </div>
  `;

  document.body.appendChild(overlay);
  warningOverlay = overlay;

  document.getElementById('leakwall-dismiss').addEventListener('click', () => {
    if (targetEl) {
      targetEl.value = '';
      targetEl.textContent = '';
      const inputEvent = new Event('input', { bubbles: true });
      targetEl.dispatchEvent(inputEvent);
    }
    removeWarning();
  });

  document.getElementById('leakwall-send-anyway').addEventListener('click', () => {
    removeWarning();
    recordEvent(leaks, 'warned');
  });

  recordEvent(leaks, 'blocked');

  setTimeout(removeWarning, 15000);
}

function recordEvent(leaks, action) {
  chrome.storage.local.get(['leakEvents'], (result) => {
    const events = result.leakEvents || [];
    events.unshift({
      id: Date.now(),
      tool: TOOL_NAME,
      leaks: leaks.map(l => l.label),
      action,
      timestamp: new Date().toISOString(),
      severity: leaks.some(l => l.severity === 'critical') ? 'critical' : 'high',
    });
    const trimmed = events.slice(0, 200);
    chrome.storage.local.set({ leakEvents: trimmed });
  });

  chrome.storage.local.get(['totalBlocked'], (result) => {
    const count = (result.totalBlocked || 0) + 1;
    chrome.storage.local.set({ totalBlocked: count });
    chrome.action.setBadgeText({ text: String(count) });
    chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
  });
}

function handlePasteOrInput(event) {
  let text = '';

  if (event.type === 'paste') {
    const clipData = event.clipboardData || window.clipboardData;
    if (!clipData) return;
    text = clipData.getData('text');
  } else {
    const el = event.target;
    text = el.value || el.textContent || el.innerText || '';
  }

  if (!text || text.length < 8) return;

  const leaks = scanText(text);
  if (leaks.length > 0) {
    event.preventDefault();
    event.stopImmediatePropagation();
    showWarning(leaks, event.target);
  }
}

function attachListeners() {
  document.addEventListener('paste', handlePasteOrInput, true);

  const observer = new MutationObserver(() => {
    const inputs = document.querySelectorAll(
      'textarea:not([data-leakwall]), [contenteditable="true"]:not([data-leakwall])'
    );
    inputs.forEach((el) => {
      el.setAttribute('data-leakwall', 'true');
      el.addEventListener('paste', handlePasteOrInput, true);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const existing = document.querySelectorAll('textarea, [contenteditable="true"]');
  existing.forEach((el) => {
    el.setAttribute('data-leakwall', 'true');
    el.addEventListener('paste', handlePasteOrInput, true);
  });
}

attachListeners();
