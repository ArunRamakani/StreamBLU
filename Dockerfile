FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV MY_SQL /app

CMD ["sh", "-c", "node ./index.js ${MY_SQL}"]

EXPOSE 50051
