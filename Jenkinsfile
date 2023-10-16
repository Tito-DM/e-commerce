pipeline{
     agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
         
            steps {
               sh "chmod +x -R ${env.WORKSPACE}"
               git 'https://github.com/Tito-DM/e-commerce'
               sh 'npm install'
            }

       
        }

       
    }
   
}