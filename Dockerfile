FROM node:12.16.3
WORKDIR /usr/src/app

COPY server .
COPY client client/

# build client
RUN cd client && \
npm install -q --production && \
npm run build -q

# build server
RUN npm install -q --production

EXPOSE 3000
CMD npm start
