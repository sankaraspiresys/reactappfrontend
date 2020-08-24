pipeline {
  agent any
  environment {
      PROJECT_ID = 'snappy-surf-285008'
      CLUSTER_NAME = 'cluster-1'
      LOCATION = 'us-central1-c'
      CREDENTIALS_ID = 'gke'
  }
  stages {
    stage("Checkout code") {
      steps {
          checkout scm
      }
    }
    stage("Build image") {
      steps {
          script {
              myapp = docker.build("sankardockerdev/my-react-app")
          }
      }
    }
    stage("Push image") {
      steps {
          script {
              docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                      myapp.push("latest")
              }
          }
      }
    }
    stage('Deploy to GKE') {
      steps{
          sh "sed -i 's/my-react-app:latest/my-react-app:latest/g' deployment.yaml"
          step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
      }
    }
  }    
}