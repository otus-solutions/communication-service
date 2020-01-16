###############################################
###               Variables                 ###
###############################################
variable "communication-service-dockerfile" {
  default = "."
}
variable "communication-service-name" {
  default = "communication-service"
}
variable "communication-service-directory" {
  default = "communication-service"
}
variable "communication-service-source" {
  default = "source"
}
variable "communication-service-npminstall" {
  default = "npm install"
}
variable "communication-service-npmtest" {
  default = "npm test"
}
variable "communication-service-cleanup" {
  default = "rm -rf node_modules dist package-lock.json"
}
variable "communication-service-npmprune" {
  default = "npm prune --production"
}

#################################################
### DB-DISTRIBUTION-API : Build Image Service ###
#################################################
resource "null_resource" "communication-service-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.communication-service-source}"
    command = "${var.communication-service-cleanup}"
  }
}

resource "null_resource" "communication-service-install" {
  depends_on = [null_resource.communication-service-cleanup]
  provisioner "local-exec" {
    working_dir = "${var.communication-service-source}"
    command = "${var.communication-service-npminstall}"
  }
}

resource "null_resource" "communication-service-test" {
  depends_on = [null_resource.communication-service-install]
  provisioner "local-exec" {
    working_dir = "${var.communication-service-source}"
    command = "${var.communication-service-npmtest}"
  }
}

resource "null_resource" "communication-service-prune" {
  depends_on = [null_resource.communication-service-test]
  provisioner "local-exec" {
    working_dir = "${var.communication-service-source}"
    command = "${var.communication-service-npmprune}"
  }
}

resource "null_resource" "communication-service" {
  depends_on = [null_resource.communication-service-prune]
  provisioner "local-exec" {
    command = "docker build -t ${var.communication-service-name} ${var.communication-service-dockerfile}"
  }
}
