FROM node:current-alpine

WORKDIR /app

COPY pagekage.json . 

RUN npm i

CMD ["npm" , "run" , "production"]