FROM node:alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER root
RUN npm ci
COPY --chown=node:node . .
EXPOSE 5000
ENV NODE_ENV=production
CMD [ "sh", "-c" , "npm run migrate up; node src/app.js" ]