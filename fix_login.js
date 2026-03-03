const fs = require('fs');
const file = 'src/app/login/page.tsx';
let data = fs.readFileSync(file, 'utf8');

const target = `<button
              type="button"
              onClick={() => handleOAuth('apple')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.365 21.49c-.66.49-1.92.93-3.23.95-1.57.02-2.52-.45-3.69-.45-1.22 0-2.29.5-3.83.5-1.12.02-2.61-.41-3.48-1.54C-.295 18.42-.585 14.29 1.255 11.59c.92-1.35 2.58-2.22 4.19-2.26 1.63-.04 2.65.65 3.96.65 1.25 0 3.03-.78 4.79-.75 1.54.02 2.89.5 3.82 1.48-3.08 1.57-2.61 5.38.31 6.51-.55 1.58-1.42 3.42-1.96 4.27z" />
                <path d="M15.425 6.78c.84-1.02 1.41-2.43 1.26-3.83-1.2.05-2.67.8-3.55 1.83-.71.84-1.36 2.27-1.18 3.65 1.34.1 2.64-.62 3.47-1.65z" />
              </svg>
              Apple
            </button>`;

const replacement = `<button
              type="button"
              onClick={() => handleOAuth('azure')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="10.5" height="10.5" fill="#f25022"/>
                <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7fba00"/>
                <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00a4ef"/>
                <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#ffb900"/>
              </svg>
              Microsoft
            </button>`;

data = data.replace(target, replacement);
fs.writeFileSync(file, data);
