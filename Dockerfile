FROM node:16.17.0-slim as builder

COPY . /project/

WORKDIR /project

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

FROM nginx

COPY react.conf /etc/nginx/conf.d/react.conf

COPY --from=builder /project/build/ /usr/local/spotify/
