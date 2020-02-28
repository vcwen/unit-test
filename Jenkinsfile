def withDockerNetwork(Closure inner) {
  try {
    networkId = UUID.randomUUID().toString()
    sh "docker network create ${networkId}"
    inner.call(networkId)
  } finally {
    sh "docker network rm ${networkId}"
  }
}

pipeline {
  agent none 
  stages {
    stage('test') {
      agent any
      steps {
        script {
          docker.image('mongo:4').withRun() {mongo ->
          docker.image('node:12').inside("--link ${mongo.id}:mongo -u root:root") {
            sh 'node --version'
            sh 'npm install'
            sh 'node src/index.js'
          }
        }
        }
        
        
      }
    }
  }
}
