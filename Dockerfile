FROM node:14
WORKDIR /
COPY . /
RUN npm install
ENV PORT 5000
EXPOSE 8080
CMD ["npm", "start"]
