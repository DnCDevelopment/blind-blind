pipeline {
  agent any
  stages {
    stage('pre-install') {
      steps {
        sh '''cd ~/projects/blind-blind/
git pull'''
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
pm2 restart blind-blind'''
      }
    }

  }
}