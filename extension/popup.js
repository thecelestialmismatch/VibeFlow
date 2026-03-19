const SEVERITY_ICONS = {
  critical: '🔴',
  high: '🟠',
  medium: '🟡',
};

function render(data) {
  const { totalBlocked, recentEvents, settings } = data;

  document.getElementById('stat-blocked').textContent = totalBlocked ?? 0;

  const toggle = document.getElementById('toggle-enabled');
  toggle.checked = settings?.enabled !== false;

  const statusText = document.getElementById('status-text');
  statusText.textContent = toggle.checked ? 'Protected' : 'Paused';

  const list = document.getElementById('event-list');

  if (!recentEvents || recentEvents.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">✅</div>
        <div class="empty-label">No leaks detected yet.<br />You're protected.</div>
      </div>
    `;
    return;
  }

  list.innerHTML = recentEvents.map((event) => {
    const icon = SEVERITY_ICONS[event.severity] || '⚪';
    const leakLabels = (event.leaks || []).slice(0, 2).join(', ');
    const statusClass = event.action === 'blocked' ? 'status-blocked' : 'status-warned';
    const statusLabel = event.action === 'blocked' ? 'Blocked' : 'Warned';
    const timeStr = event.timestamp
      ? new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    return `
      <div class="event-item">
        <span class="event-icon">${icon}</span>
        <div class="event-body">
          <div class="event-type">${leakLabels || 'Sensitive data'}</div>
          <div class="event-meta">${event.tool} · ${timeStr}</div>
        </div>
        <span class="event-status ${statusClass}">${statusLabel}</span>
      </div>
    `;
  }).join('');
}

chrome.runtime.sendMessage({ type: 'GET_STATS' }, (response) => {
  if (response) render(response);
});

document.getElementById('toggle-enabled').addEventListener('change', (e) => {
  const enabled = e.target.checked;
  document.getElementById('status-text').textContent = enabled ? 'Protected' : 'Paused';
  chrome.runtime.sendMessage({ type: 'UPDATE_SETTINGS', payload: { enabled } });
});

document.getElementById('btn-clear').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'CLEAR_EVENTS' }, () => {
    document.getElementById('stat-blocked').textContent = '0';
    document.getElementById('event-list').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">✅</div>
        <div class="empty-label">No leaks detected yet.<br />You're protected.</div>
      </div>
    `;
  });
});

document.getElementById('btn-dashboard').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://leakwall.com/dashboard' });
});
