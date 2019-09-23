FROM node:latest

# Environment variables
ENV DEBIAN_FRONTEND noninteractive
ENV HUBOT_NAME shota_brother
ENV HUBOT_OWNER jt
ENV HUBOT_DESCRIPTION Hubot

RUN useradd hubot -m

RUN npm install -g hubot coffee-script yo generator-hubot

USER hubot

WORKDIR /home/hubot

RUN yo hubot --owner="${HUBOT_OWNER}" --name="${HUBOT_NAME}" --description="${HUBOT_DESCRIPTION}" --defaults && sed -i /heroku/d ./external-scripts.json && sed -i /redis-brain/d ./external-scripts.json && npm install hubot-scripts && npm install hubot-plurk-adapter --save && npm install rabbit.js --save && npm install request --save && npm install --save fs && npm install cheerio --save  && npm install node-schedule && npm install oauth
#setting the external-scripts on the line17↑

VOLUME ["/home/hubot/scripts"]

CMD bin/hubot -n $HUBOT_NAME --adapter plurk-adapter