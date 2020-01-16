variable "communication-service-port"{
  default = 53002
}

variable "communication-service-name"{
  default = "communication-service:latest"
}

resource "docker_image" "communication-service" {
  name = "${var.communication-service-name}"
}

resource "docker_network" "communication-network"{
  name = "communication-service-network"
}

resource "docker_container" "communication-service" {
  name = "communication-service"
  image = "${docker_image.communication-service.name}"
  ports {
	internal = 8080
	external = "${var.communication-service-port}"
  }
  networks_advanced {
    name = "${docker_network.communication-network.name}"
  }
}
