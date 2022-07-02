FROM node:lts

COPY ./ /robot-manager/ 
RUN chmod 777 /robot-manager/scripts/run.sh

ENTRYPOINT ["/robot-manager/scripts/run.sh" ]
EXPOSE 3000