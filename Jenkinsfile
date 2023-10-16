pipeline{
     agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
             stage('SCM') {
                checkout scm
            }
         
            steps {
               git 'https://github.com/Tito-DM/e-commerce'
               
            }
        }

        stage('SonarQube Analysis') {
            script{
                def scannerHome = tool 'SonarScanner';
                 withSonarQubeEnv() {
                 sh "${scannerHome}/bin/sonar-scanner"
                }
            }
    
        }
       
    }
   
}