#!/usr/bin/env bash
set -eo pipefail

export NVM_DIR="/home/sinonaz/.nvm"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "NVM not found: $NVM_DIR/nvm.sh" >&2
  exit 1
fi

. "$NVM_DIR/nvm.sh"

nvm install --lts
nvm use --lts

cd backend

ln -sfn /home/sinonaz/nodejs-mesto-project/.env .env

npm ci
npm run build

pm2 startOrReload ecosystem.config.js --env production --update-env
