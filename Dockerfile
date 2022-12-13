FROM node:lts
WORKDIR /app
COPY ./index.js /app/
RUN npm init -y
RUN npm install discord.js
CMD [ "node", "index.js" ]
