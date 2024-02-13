FROM node:current-alpine

WORKDIR /app

COPY . . 

RUN npm i

CMD ["npm" , "run" , "production"]