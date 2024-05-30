pipeline {

  environment {
    dockerimagename = "bsehovic2/react-app"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
       // git 'https://github.com/bsehovic2/jenkins-kubernetes-deployment'
	git branch: 'main', url: 'https://github.com/bsehovic2/jenkins-kubernetes-deployment'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhub-credentials'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

   // stage('Deploying React.js container to Kubernetes') {
     // steps {
       // script {
         // kubernetesDeploy(configs: "deployment.yaml", "service.yaml")
        //}
      //}
    //}

      stage('Deploy to Kubernetes') {
    steps {
        script {
            // Using the shell to apply Kubernetes configurations
            sh '''
            kubectl apply -f deployment.yaml
            kubectl apply -f service.yaml
            '''
        }
    }
}

  }

}
