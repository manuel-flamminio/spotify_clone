FROM node:16.17.0-slim

COPY . /project/

WORKDIR /project

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

RUN ["npm", "install", "-g", "serve"]

CMD ["serve", "-l", "80", "-s", "build"]
