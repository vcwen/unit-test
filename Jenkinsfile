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
          withDockerNetwork{ n ->
            docker.image('mongo:5').withRun("--network ${n} --name mongo") {}
            docker.image('node:12').withRun("--network ${n} --name app") {
              sh 'node --version'
            }
          }
        }
      }
    }
  }
}
