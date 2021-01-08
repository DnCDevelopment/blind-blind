pipeline {
  agent any
  stages {
    stage('pre-install') {
      steps {
        sh '''cd ~/projects/blind-blind/
'''
      }
    }

    stage('install') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh '''npm run build
npm start'''
      }
    }

  }
}