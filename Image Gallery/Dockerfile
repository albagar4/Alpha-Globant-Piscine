FROM node:18
RUN npm install express cors dotenv
COPY backend/back.js .
COPY backend/.env .
EXPOSE 5000
CMD ["node", "back.js"]