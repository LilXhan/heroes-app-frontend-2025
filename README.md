# Heroes App

## Up Server

1. Clone Repository.
2. Edit file `.env`.
3. Execute `npm install`
4. Execute `npm run dev`
5. `"build": "vitest run && tsc -b && vite build",`
6. LOAD ENV 
`
set -a
source .env
set +a
docker-compose build --no-cache
docker-compose up -d
`