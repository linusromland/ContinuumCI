FROM node:18-alpine as api

# Install git
RUN apk update
RUN apk add --no-cache git

# Build the nodejs app
WORKDIR /app

# Copy the source code
COPY . .

# Install the dependencies
RUN npm install

# Build the app
RUN npm run build -w api

# Expose the port 80 & 443
EXPOSE 3000

# Start nginx & api
CMD npm run start:prod -w api