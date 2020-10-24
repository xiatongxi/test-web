FROM 192.168.123.25:31104/unis/java:8

ADD ./target/depot-web.jar /root
CMD ["sh", "-c", "cd /root; java -Djava.security.egd=file:/dev/./urandom -jar /root/depot-web.jar --depot-web.server.enable-self-preservation=false"]
EXPOSE 9025
