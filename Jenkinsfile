pipeline{
     agent { docker { image 'node:latest' } }
    stages {
        stage('SCM') {
            checkout scm
        }
        stage('build') {
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