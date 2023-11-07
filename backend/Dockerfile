FROM node:13.12.0-alpine

# Step 1 - Add container working directory
WORKDIR /app
# Step 2 - Copy npm dependencies
COPY package.json ./
# COPY package-lock.json ./
# Step 3 - Install dependencies
RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 8080
CMD [ "node", "index.js" ]