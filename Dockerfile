FROM --platform=linux/x86_64 node:18.16.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" , "start:prod" ]