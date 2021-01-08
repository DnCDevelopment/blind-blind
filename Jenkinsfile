pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh '''cd ~/projects/

for d in */ ; do
    echo "$d"
done'''
      }
    }

  }
}