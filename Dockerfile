FROM node:14-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY ./ .

RUN npm run build

EXPOSE 7767

CMD ["npm","build"]