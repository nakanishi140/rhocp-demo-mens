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
              def bc = openshift.selector("bc", "mens")
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
    stage("create tag") {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              echo "Create Tag Image: mens"
              openshift.tag("mens:1.0")
            }
          }
        }
      }
    }
  }
}
