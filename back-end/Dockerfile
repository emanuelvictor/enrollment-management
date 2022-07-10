FROM openjdk:11-jre
RUN mkdir app
ADD /target/enrollments-0.1.jar /app/enrollments.jar
WORKDIR /app
ENTRYPOINT java -Dspring.datasource.url=jdbc:postgresql://postgres:5432/enrollment -jar enrollments.jar

EXPOSE 8080