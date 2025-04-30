pipeline {
     agent any
     environment {
          DOCKERHUB_CREDENTIALS = credentials('dock-creds')
     }
     stages {
          stage('Checkout SCM') {
               steps {
                    git branch: 'varun', url: 'https://github.com/vrbalbudhe/WMS.git'
               }
          }
          stage('Build Backend') {
               steps {
                    dir('backend') {
                         sh 'docker build -t backend-image .'
                    }
               }
          }
          stage('Build Frontend') {
               steps {
                    dir('frontend') {
                         sh 'docker build -t frontend-image .'
                    }
               }
          }
          stage('Run Backend') {
               steps {
                    sh 'docker run -d --name backend-container backend-image'
               }
          }
          stage('Run Frontend') {
               steps {
                    sh 'docker run -d --name frontend-container frontend-image'
               }
          }
          stage('Test Backend') {
               steps {
                    sh '''
                    echo Running Backend Tests
                    # Replace with actual backend test command
                    '''
               }
          }
          stage('Test Frontend') {
               steps {
                    sh '''
                    echo Running Frontend Tests
                    # Replace with actual frontend test command
                    '''
               }
          }
          stage('Push Docker Images') {
               steps {
                    sh '''
                    echo Logging into Docker Hub
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker tag backend-image varun029/backend-image
                    docker tag frontend-image varun029/frontend-image
                    docker push varun029/backend-image
                    docker push varun029/frontend-image
                    '''
               }
          }
          stage('Deploy') {
               steps {
                    sh '''
                    docker stop backend frontend || true
                    docker rm backend frontend || true
                    docker pull varun029/backend-image
                    docker pull varun029/frontend-image
                    docker run -d --name backend -p 8000:8000 varun029/backend-image
                    docker run -d --name frontend -p 5173:5173 varun029/frontend-image
                    '''
               }
          }
     }
     post {
          always {
               echo 'Cleaning up resources'
               sh 'docker rm -f frontend-container || echo "Frontend container already removed"'
               sh 'docker rm -f backend-container || echo "Backend container already removed"'
          }
          failure {
               echo 'Pipeline failed!'
          }
          success {
               echo 'Pipeline completed successfully!'
          }
     }
}
