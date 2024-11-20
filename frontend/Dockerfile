# ベースイメージ
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# パッケージインストールと開発環境起動
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
