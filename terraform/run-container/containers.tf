variable "communication-service-port"{
  default = 53002
}

variable "communication-service-name"{
  default = "communication-service:latest"
}

resource "docker_image" "communication-service" {
  name = "${var.communication-service-name}"
}

variable "communication-network"{
  default = "otus-api-network"
}

resource "docker_container" "communication-service" {
  name = "communication-service"
  image = "${docker_image.communication-service.name}"
  ports {
	internal = 8080
	external = "${var.communication-service-port}"
  }

  networks_advanced {
    name = "${var.communication-network}"
  }

}
