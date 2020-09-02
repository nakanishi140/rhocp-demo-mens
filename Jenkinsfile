pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
  stages {
    stage("project") {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              echo "Using project: ${openshift.project()}"
            }
          }
        }
      }
    }
    stage("build image") {
     steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              echo "Build Appliction Image: mens"
              def bc = openshift.selector("bc", "mens-v10")
              bc.startBuild().logs("-f")
              def bb = bc.narrow("bc").related("builds")
              timeout(10) {
                bb.untilEach(1) {
                  return (it.object().status.phase == "Complete")
                }
              }
            }
          }
        }
      }
    }
    stage('deploy') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              sh "oc rollout restart deployment/mens-v10"
                timeout(10) {
              }
            }
          }
        }
      }
    }
  }
}
