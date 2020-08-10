pipeline {
  environment {
    registry = "sankardockerdev/my-react-app"
    registryCredential = 'docker-hub-credentials'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Pull Frontend Code From GitHub') {
      steps {
        git 'https://github.com/sankaraspiresys/reactappfrontend.git'
      }
    }
    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('Your Sonar Server Name here') {
            sh '''
            ${scannerHome}/bin/sonar-scanner \
            -D sonar.projectKey=my-react-app \
            -D sonar.projectName=my-react-app \
            -D sonar.projectVersion=1.0 \
            -D sonar.sources=./src \
            '''
      }
    }
    stage('Building Docker Image for Frontend') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Push Image To Docker Hub for Frontend') {
      steps{
        script {
          /* Finally, we'll push the image with two tags:
                   * First, the incremental build number from Jenkins
                   * Second, the 'latest' tag.
                   * Pushing multiple tags is cheap, as all the layers are reused. */
          docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
              //dockerImage.push("${env.BUILD_NUMBER}")
              dockerImage.push("latest")
          }
        }
      }
    }
  }
}