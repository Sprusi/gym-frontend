FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
