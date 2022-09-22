FROM node:16-alpine
WORKDIR /app
RUN npm install -g -f yarn
COPY yarn.*lock ./
RUN yarn --frozen-lockfile
COPY . .
EXPOSE 3000
CMD yarn start:dev --watch
