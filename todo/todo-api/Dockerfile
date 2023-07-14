FROM node:16.15.1
WORKDIR /api
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 9000
CMD ["npm", "start"]
