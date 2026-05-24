/**
 * LeakWall Service Worker (Background Script)
 * Handles extension lifecycle, badge updates, and cross-tab state.
 */

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      totalBlocked: 0,
      leakEvents: [],
      settings: {
        enabled: true,
        sensitivity: 'medium',
        showNotifications: true,
        monitoredTools: [
          'ChatGPT', 'Claude', 'Gemini', 'Copilot', 'DeepSeek',
          'Perplexity', 'Poe', 'Mistral', 'Jasper', 'Copy.ai',
        ],
      },
    });

    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_STATS') {
    chrome.storage.local.get(['totalBlocked', 'leakEvents', 'settings'], (data) => {
      sendResponse({
        totalBlocked: data.totalBlocked || 0,
        recentEvents: (data.leakEvents || []).slice(0, 5),
        settings: data.settings || {},
      });
    });
    return true;
  }

  if (message.type === 'UPDATE_SETTINGS') {
    chrome.storage.local.get(['settings'], (data) => {
      const updated = { ...data.settings, ...message.payload };
      chrome.storage.local.set({ settings: updated });
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.type === 'CLEAR_EVENTS') {
    chrome.storage.local.set({ leakEvents: [], totalBlocked: 0 });
    chrome.action.setBadgeText({ text: '' });
    sendResponse({ ok: true });
    return true;
  }
});
