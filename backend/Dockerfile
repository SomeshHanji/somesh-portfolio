FROM maven:3.8.7-openjdk-18-slim AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Render provides PORT automatically
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]