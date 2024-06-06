pipeline {
    environment {
        dockerimagename = "bsehovic2/react-app"
        dockerImage = ""
    }

    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout Source') {
            steps {
                git branch: 'main', url: 'https://github.com/bsehovic2/jenkins-kubernetes-deployment'
            }
        }

        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build(dockerimagename)
                }
            }
        }

        stage('Pushing Image') {
            environment {
                registryCredential = 'dockerhub-credentials'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        dockerImage.push("latest")
                    }
                }
            }
        }
        
        stage('Trivy Scan') {
            steps {
                script {
                    sh 'trivy image --format template --template "@/home/etftk/Documents/jenkins-deploy/trivy_reports/html.tpl" --output trivy_report.html bsehovic2/react-app:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Ensure Jenkins uses the correct kubeconfig file
                    withEnv(["KUBECONFIG=/home/etftk/.kube/config"]) {
                        sh '''
                        kubectl apply -f deployment.yaml
                        kubectl apply -f service.yaml
                        '''
                    }
                }
            }
        }

        stage('Restart Deployment') {
            steps {
                script {
                    // Ensure Jenkins uses the correct kubeconfig file
                    withEnv(["KUBECONFIG=/home/etftk/.kube/config"]) {
                        sh 'kubectl rollout restart deployment/deployment'
                    }
                }
            }
        }
    }
}

