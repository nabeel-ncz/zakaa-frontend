export const NODE_ENV: 'dev' | 'prod' = 'prod';
export const PUBLIC_RESOURCE_URL = (NODE_ENV as 'dev' | 'prod') === 'dev' ? 'http://localhost:5000' : 'https://zakaa.nabeel.cloud';
export const SOCKET_SERVICE = (NODE_ENV as 'dev' | 'prod') === 'dev' ? 'http://localhost:3006' : 'https://zakaa.nabeel.cloud';