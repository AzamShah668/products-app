pipeline {
    agent any

    environment {
        DOCKER_USER     = "azamshah"
        VM_USER         = "verjenkins"
        STAGING_IP      = "192.168.56.104"
        PROD_IP         = "192.168.56.105"
        SSH_CREDS_ID    = "vm-deploy-key"
        GIT_CREDS_ID    = "products-repo-deploy-key"
        DOCKER_CREDS_ID = "docker-hub-creds"
        TAG             = "${env.BUILD_NUMBER}"
        // CHANGED PORT TO 8082 TO AVOID CONFLICT WITH YOUR OTHER APP
        STAGING_URL     = "http://${env.STAGING_IP}:8089" 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: "${env.GIT_CREDS_ID}",
                    url: 'git@github.com:AzamShah668/products-app.git'
            }
        }

        stage('Build & Push') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: DOCKER_CREDS_ID,
                            passwordVariable: 'PASS',
                            usernameVariable: 'USER'
                        )
                    ]) {
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh "docker build -t ${DOCKER_USER}/products-frontend:v${TAG} ./frontend"
                        sh "docker push ${DOCKER_USER}/products-frontend:v${TAG}"
                        sh "docker build -f Dockerfile.backend -t ${DOCKER_USER}/products-backend:v${TAG} ."
                        sh "docker push ${DOCKER_USER}/products-backend:v${TAG}"
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                sshagent([SSH_CREDS_ID]) {
                    script {
                        sh "scp -o StrictHostKeyChecking=no docker-compose.staging.yml ${VM_USER}@${STAGING_IP}:~/docker-compose.yml"
                        sh "ssh -o StrictHostKeyChecking=no ${VM_USER}@${STAGING_IP} 'mkdir -p ~/db'"
                        sh "scp -o StrictHostKeyChecking=no db/init.sql ${VM_USER}@${STAGING_IP}:~/db/init.sql"
                        sh """
                            ssh -o StrictHostKeyChecking=no ${VM_USER}@${STAGING_IP} '
                                export TAG=${TAG}
                                export DOCKER_USER=${DOCKER_USER}
                                docker compose down -v
                                docker compose pull
                                docker compose up -d
                            '
                        """
                    }
                }
            }
        }

        stage('Testing Stage') {
            steps {
                echo "Running smoke tests on ${env.STAGING_URL}"
                sh '''
                    docker run --rm \
                      -e STAGING_URL=${STAGING_URL} \
                      -v $PWD:/app \
                      -w /app \
                      python:3.11 \
                      sh -c "
                        pip install pytest requests &&
                        pytest -v tests/
                      "
                '''
            }
        }

        stage('Approval Gate') {
            steps {
                input message: 'Staging looks good. Deploy to Production?', ok: 'Promote!'
            }
        }

        stage('Deploy to Production') {
            steps {
                sshagent([SSH_CREDS_ID]) {
                    script {
                        sh "scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${VM_USER}@${PROD_IP}:~/docker-compose.yml"
                        sh "ssh -o StrictHostKeyChecking=no ${VM_USER}@${PROD_IP} 'mkdir -p ~/db'"
                        sh "scp -o StrictHostKeyChecking=no db/init.sql ${VM_USER}@${PROD_IP}:~/db/init.sql"
                        sh """
                            ssh -o StrictHostKeyChecking=no ${VM_USER}@${PROD_IP} '
                                export TAG=${TAG}
                                export DOCKER_USER=${DOCKER_USER}
                                docker compose down
                                docker compose pull
                                docker compose up -d
                            '
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Reclaims space on your laptop immediately after build
            sh 'docker system prune -f'
        }
        failure {
            echo "Build failed - check DNS, SSH keys, or Port Conflicts"
        }
        success {
            echo "Successfully deployed Products App to Production on port 8082!"
        }
    }
}
