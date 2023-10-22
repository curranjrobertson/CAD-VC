FROM node:20.5.1

WORKDIR /usr/CAD-file-Sharing/client

COPY package*.json ./

RUN npm install npm install axios npm install react --save npm install react-dom --save npm install webpack webpack-dev-server webpack-cli --save npm install babel-core babel-loader babel-preset-env babel-preset-react html-webpack-plugin --save-dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]