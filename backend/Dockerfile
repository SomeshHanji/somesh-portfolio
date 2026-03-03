FROM maven:3.8.7-openjdk-18-slim AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8001

ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_NAME=portfolio_db
ENV DB_USER=root
ENV DB_PASSWORD=

ENTRYPOINT ["java", "-jar", "app.jar"]
