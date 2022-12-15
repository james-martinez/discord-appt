FROM node:lts
WORKDIR /app
COPY ./index.js /app/
RUN npm install
CMD [ "node", "index.js" ]
