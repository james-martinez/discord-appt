FROM node:lts
WORKDIR /app
COPY ./app.js /app/
RUN npm init -y
RUN npm install discord.js
CMD [ "node", "index.js" ]
