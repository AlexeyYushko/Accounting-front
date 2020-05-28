FROM node:14.3-slim AS build-env
WORKDIR /app

COPY angularapp/package.json .
COPY angularapp/angular.json .
COPY angularapp/tsconfig.json .
RUN npm install -g @angular/cli && npm install

COPY angularapp/src ./src
COPY angularapp/tsconfig.app.json .
WORKDIR /app
RUN ng build --prod

FROM nginx:1.17

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/dist/angularapp .