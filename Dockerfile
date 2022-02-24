FROM node:14-alpine

COPY ./dist /dist

WORKDIR /dist 

EXPOSE 5005

CMD ["node", "index.js"]
