pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "frontend-image"
        DOCKER_IMAGE_BACKEND = "backend-image"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    // Checkout the Git repository
                    checkout scm
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Navigate to the backend directory and build Docker image
                    dir('backend') {
                        bat '''
                            docker build -t %DOCKER_IMAGE_BACKEND% .
                        '''
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Navigate to the frontend directory and build Docker image
                    dir('frontend') {
                        bat '''
                            docker build -t %DOCKER_IMAGE_FRONTEND% .
                        '''
                    }
                }
            }
        }

        stage('Run Backend') {
            steps {
                script {
                    // Run the backend Docker container
                    bat '''
                        docker run -d --name backend-container %DOCKER_IMAGE_BACKEND%
                    '''
                }
            }
        }

        stage('Run Frontend') {
            steps {
                script {
                    // Run the frontend Docker container
                    bat '''
                        docker run -d --name frontend-container %DOCKER_IMAGE_FRONTEND%
                    '''
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    // You can add backend test scripts here
                    bat '''
                        echo "Running Backend Tests"
                        // Add test commands for backend
                    '''
                }
            }
        }

        stage('Test Frontend') {
            steps {
                script {
                    // You can add frontend test scripts here
                    bat '''
                        echo "Running Frontend Tests"
                        // Add test commands for frontend
                    '''
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push the Docker images to Docker Hub or your container registry
                    bat '''
                        docker push %DOCKER_IMAGE_BACKEND%
                        docker push %DOCKER_IMAGE_FRONTEND%
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Add your deployment steps here (e.g., AWS ECS, Kubernetes)
                    echo "Deploying application..."
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up resources'
            // Clean up any resources (e.g., remove Docker containers)
            bat '''
                docker rm -f frontend-container
                docker rm -f backend-container
            '''
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
