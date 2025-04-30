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
                         bat 'docker build -t backend-image .'
                    }
               }
          }

          stage('Build Frontend') {
               steps {
                    dir('frontend') {
                         bat 'docker build -t frontend-image .'
                    }
               }
          }

          stage('Run Backend') {
               steps {
                    bat 'docker run -d --name backend-container backend-image'
               }
          }

          stage('Run Frontend') {
               steps {
                    bat 'docker run -d --name frontend-container frontend-image'
               }
          }

          stage('Test Backend') {
               steps {
                    bat '''
                echo Running Backend Tests
                REM Replace with actual backend test command
                '''
               }
          }

          stage('Test Frontend') {
               steps {
                    bat '''
                echo Running Frontend Tests
                REM Replace with actual frontend test command
                '''
               }
          }

          stage('Push Docker Images') {
               steps {
                    bat '''
                echo Logging into Docker Hub
                echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin

                docker tag backend-image varun029/backend-image
                docker tag frontend-image varun029/frontend-image

                docker push varun029/backend-image
                docker push varun029/frontend-image
                '''
               }
          }

          stage('Deploy') {
               steps {
                    bat '''
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
               bat 'docker rm -f frontend-container || echo Frontend container already removed'
               bat 'docker rm -f backend-container || echo Backend container already removed'
          }

          failure {
               echo 'Pipeline failed!'
          }

          success {
               echo 'Pipeline completed successfully!'
          }
     }
}
