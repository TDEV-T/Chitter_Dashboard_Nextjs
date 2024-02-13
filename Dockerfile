FROM node:current-alpine

WORKDIR /app

COPY package.json . 

RUN npm i

CMD ["npm" , "run" , "production"]