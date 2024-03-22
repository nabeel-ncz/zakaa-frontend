export const NODE_ENV: 'dev' | 'prod' = 'dev';
export const PUBLIC_RESOURCE_URL = (NODE_ENV as 'dev' | 'prod') === 'dev' ? 'https://zakaa.nabeel.cloud' : 'https://zakaa.nabeel.cloud';
export const SOCKET_SERVICE = (NODE_ENV as 'dev' | 'prod') === 'dev' ? 'http://localhost:3007' : 'https://zakaa.nabeel.cloud';