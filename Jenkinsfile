pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh '''npm run build
'''
      }
    }

    stage('start') {
      steps {
        sh '''npm start
'''
      }
    }

  }
}