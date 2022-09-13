FROM node:16
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json yarn.lock tsconfig.json ./
USER node
RUN yarn
COPY --chown=node:node . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
