pipeline {
    agent any

    environment {
        FRONTEND_PORT = 5173
        BACKEND_PORT = 8000
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git branch: 'varun', url: 'https://github.com/vrbalbudhe/WMS.git'
            }
        }

        stage('Build Backend') {
            steps {
                // Navigate to the backend directory and build the Docker image
                dir('backend') {
                    script {
                        docker.build('backend-image', '.')
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                // Navigate to the frontend directory and build the Docker image
                dir('frontend') {
                    script {
                        docker.build('frontend-image', '.')
                    }
                }
            }
        }

        stage('Run Backend') {
            steps {
                // Run backend container
                script {
                    docker.image('backend-image').run("-d -p ${BACKEND_PORT}:8000")
                }
            }
        }

        stage('Run Frontend') {
            steps {
                // Run frontend container
                script {
                    docker.image('frontend-image').run("-d -p ${FRONTEND_PORT}:3000")
                }
            }
        }

        stage('Test Backend') {
            steps {
                // Example of running backend tests (adjust with your test framework)
                script {
                    // For example, using `curl` or testing the API with Postman
                    sh 'curl http://localhost:${BACKEND_PORT}/health'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                // Example of running frontend tests (adjust with your test framework)
                script {
                    // Test frontend using a tool like Cypress or Jest
                    sh 'curl http://localhost:${FRONTEND_PORT}/'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push both frontend and backend images to Docker Hub (or any registry)
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image('frontend-image').push('latest')
                        docker.image('backend-image').push('latest')
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your containers to a server, ECS, Kubernetes, etc.
                // Example: Using ECS or other cloud services
                echo 'Deploying to production (or test) environment'
            }
        }
    }

    post {
        always {
            // Clean up resources or notify team (optional)
            echo 'Cleaning up resources or notifying team'
        }

        success {
            // Notify success (optional)
            echo 'Pipeline executed successfully!'
        }

        failure {
            // Notify failure (optional)
            echo 'Pipeline failed!'
        }
    }
}
