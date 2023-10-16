pipeline{
     agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
         
            steps {
               
               git 'https://github.com/Tito-DM/e-commerce'
               sh 'rm -r node /var/lib/jenkins/workspace/node'
               sh 'npm install'
            }

       
        }

       
    }
   
}