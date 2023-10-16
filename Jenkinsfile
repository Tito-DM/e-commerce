pipeline{
     agent { docker { image 'node:current-alpine3.17' } }
    stages {
        stage('build') {
         
            steps {
               
               git 'https://github.com/Tito-DM/e-commerce'
               sh 'npm install'
            }

       
        }

       
    }
   
}