FROM node:14-alpine

COPY package.json entrypoint.sh /
RUN npm install --only=production && chmod +x entrypoint.sh

COPY ./dist /dist

WORKDIR /

EXPOSE 5005

CMD ["entrypoint.sh"]
