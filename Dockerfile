FROM node:current-alpine

WORKDIR /app

COPY . . 

CMD ["npm" , "run" , "production"]