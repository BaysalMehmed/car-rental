FROM gradle:7.5-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:11
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/car-rental-api.jar
COPY Files-Upload/ Files-Upload/

ENTRYPOINT ["java","-jar","/app/car-rental-api.jar"]