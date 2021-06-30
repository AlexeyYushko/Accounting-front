FROM node:latest AS builder
WORKDIR /app

COPY ./angularapp .

RUN npm i && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/angularapp .

ENTRYPOINT ["nginx", "-g", "daemon off;"]