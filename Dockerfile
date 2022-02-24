FROM nginx

COPY ./dist /usr/share/nginx/html/
# update custom nginx conf reason by vue-router
COPY ./default.conf /etc/nginx/conf.d/
# run script
COPY entrypoint.sh /

RUN chmod 755 /entrypoint.sh


EXPOSE 80
CMD ["/entrypoint.sh"]
