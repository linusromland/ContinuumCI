FROM nginx:stable-alpine AS nginx-api

# Copy the nginx.conf file to the nginx directory
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Create directory for sites-enabled
RUN mkdir -p /etc/nginx/sites-enabled

# Install nodejs and npm
RUN apk add --no-cache nodejs npm certbot certbot-nginx

# Build the nodejs app
WORKDIR /app

# Copy the source code
COPY . .

# Install the dependencies
RUN npm install

# Build the app
RUN npm run build -w nginxapi

# Expose the port 80 & 443
EXPOSE 80 443 3001

# Start nginx & api
CMD nginx -g 'daemon off;' & npm run start:prod -w nginxapi