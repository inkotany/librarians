server {
    listen 80;
    server_name librarians.gaggleniti.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    access_log /var/log/nginx/nextjs.access.log;
    error_log  /var/log/nginx/nextjs.error.log;
}
