pipeline{
     agent { docker { image 'node:18.18.1-alpine3.18' } }
    stages {
        stage('build') {
            steps {
               git 'https://github.com/Tito-DM/e-commerce'
                sh 'npm install'
            }

       
        }

       
    }
   
}