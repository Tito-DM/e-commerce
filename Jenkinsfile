pipeline{
     agent { docker { image 'node:latest' } }
    stages {
    
        stage('build') {
            steps {
               git 'https://github.com/Tito-DM/e-commerce'
               
            }
        }

        stage('SonarQube Analysis') {
             steps {
            script{
                def scannerHome = tool 'SonarScanner';
                 withSonarQubeEnv() {
                 sh "${scannerHome}/bin/sonar-scanner"
                }
            }
             }
    
        }
       
    }
   
}