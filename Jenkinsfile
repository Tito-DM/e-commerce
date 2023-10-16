pipeline{
     agent { dockerContainer { image 'node:18.18.1-alpine3.18' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
   
}