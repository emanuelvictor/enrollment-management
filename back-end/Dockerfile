#
# Build stage
#

FROM maven:3.6.3-jdk-11-slim AS build

WORKDIR usr/src/app

COPY . ./

RUN mvn clean package -DskipTests

#
# Package stage
#

FROM openjdk:11-jre-slim

ARG JAR_NAME="enrollments-0.1"

WORKDIR /usr/src/app

EXPOSE ${HTTP_PORT}

COPY --from=build /usr/src/app/target/${JAR_NAME}.jar ./app.jar

CMD ["java", "-Dspring.datasource.url=jdbc:postgresql://postgres:5432/enrollment", "-jar", "./app.jar"]