FROM ubuntu:18.04

# -----------------------
# POSTGRESQL 13 INSTALATION and CONFIGURATION
# -----------------------
#mainteiner
MAINTAINER Emanuel Victor <emanuel.info@gmail.com>

#config tzdata configurations
RUN apt-get update && DEBIAN_FRONTEND="noninteractive" TZ="America/Sao_Paulo" apt-get install -y tzdata

#install postgres dependencies
RUN apt-get update && apt install -y curl gpg gnupg2 software-properties-common apt-transport-https lsb-release ca-certificates

#handler certificates of postgres
RUN curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

# Add PostgreSQL's repository. It contains the most recent stable release of PostgreSQL.
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee  /etc/apt/sources.list.d/pgdg.list'

#install postgresql-13
RUN apt-get update && apt install -y postgresql-13 postgresql-client-13

# Swithing postgres user
USER postgres

#creating enrollment role and enrollment and enrollment_test databases
RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER enrollment WITH SUPERUSER PASSWORD 'enrollment';" &&\
    createdb -O enrollment enrollment  &&\
    createdb -O enrollment enrollment_test

## Adjust PostgreSQL configuration so that remote connections to the database are possible.
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/13/main/pg_hba.conf

## And add ``listen_addresses`` to ``/etc/postgresql/13/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/13/main/postgresql.conf

## Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/13/bin/postgres", "-D", "/var/lib/postgresql/13/main", "-c", "config_file=/etc/postgresql/13/main/postgresql.conf"]

# -----------------------
# JAVA APPLICATION
# -----------------------
FROM openjdk:11-jre
RUN mkdir /app
ARG JAR_FILE
ADD /target/${JAR_FILE} /app/enrollment.jar
WORKDIR /app
# Set the default command to run when starting the container
ENTRYPOINT ["/etc/init.d/postgresql", "start", "java","-jar", "enrollment.jar"]

## Expose the PostgreSQL port
EXPOSE 5432