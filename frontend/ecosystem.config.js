require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  // Статику раздаёт nginx, поэтому PM2 не запускает Node-процесс для фронтенда.
  // Этот конфиг нужен только для секции deploy — доставки кода и сборки бандла.
  apps: [],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env`,
      'post-deploy': 'bash frontend/scripts/deploy.sh',
    },
  },
};
