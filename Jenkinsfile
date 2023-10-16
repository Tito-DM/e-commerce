pipeline{
     agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
         
            steps {
               
               git 'https://github.com/Tito-DM/e-commerce'
               sh 'npm install'
            }

       
        }

       
    }
   
}