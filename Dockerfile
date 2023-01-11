FROM node:16

# Create app directory
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

COPY package*.json ./

RUN npm install


EXPOSE 9000

CMD [ "npm", "run", "start" ]

# RUN npm run start