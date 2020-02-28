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
            docker.image('mongo:4').withRun("--network ${n} --hostname mongo") {}
            docker.image('node:12').inside("--network ${n}") {
              sh 'node --version'
              sh 'ls .'
              sh 'node src/index.js'
            }
          }
        }
      }
    }
  }
}
