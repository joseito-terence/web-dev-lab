FROM node:16.15.1
WORKDIR /app
COPY ["package.json", "yarn.lock"]
COPY vite.config.ts ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]
