FROM image-registry.openshift-image-registry.svc:5000/demo/basenode:latest

RUN git clone https://github.com/nakanishi140/rhocp-demo-mens.git
RUN mv rhocp-demo-mens/* ./
RUN chgrp -R 0 /root/app &&  chmod -R g=u /root/app
USER 1001
EXPOSE 8080
ENTRYPOINT ["node","app.js"]
