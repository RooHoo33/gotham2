
FROM tobi312/rpi-nginx:alpine

COPY build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 443

CMD ["nginx","-g","daemon off;"]
