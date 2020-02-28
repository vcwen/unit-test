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
  agent {
    docker {
      image 'node:12'
    }

  }
  stages {
    stage('test') {
      script {
        withDockerNetwork{ n ->
          docker.image('mongo:5').withRun("--network ${n} --name mongo")
          sh "node .src/index.js"
        }
        
      }
    }

  }
}
