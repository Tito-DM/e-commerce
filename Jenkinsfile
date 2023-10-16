pipeline{
     agent { docker { image 'node:18.18.1-alpine3.18' } }
    stages {
        stage('build') {
         
            steps {
                sh 'sudo chown -R 129:137 "/.npm"'
               git 'https://github.com/Tito-DM/e-commerce'
               sh 'npm install'
            }

       
        }

       
    }
   
}