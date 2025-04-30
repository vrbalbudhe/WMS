#!/bin/bash

# Update & install packages
apt update -y
apt install -y openjdk-17-jdk docker.io

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

newgrp docker

# Create Jenkins home directory
mkdir -p /home/ubuntu/jenkins_home
chown -R 1000:1000 /home/ubuntu/jenkins_home

# Pull and run Jenkins with required volumes
docker pull jenkins/jenkins:lts-jdk17

docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v /home/ubuntu/jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart unless-stopped \
  jenkins/jenkins:lts-jdk17

echo "Initial admin password can be found with: docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword"