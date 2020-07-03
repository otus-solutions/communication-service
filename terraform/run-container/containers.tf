variable "communication-service-port"{
  default = 8080
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

variable "communication-memory"{
  default = "1024"
}

variable "communication-mailer-service"{
  default = "gmail"
}

variable "communication-mailer-from"{
  default = "email@gmail.com"
}

variable "communication-auth-user"{
  default = "email@gmail.com"
}

variable "communication-auth-pass"{
  default = "senha"
}

variable "communication-database-user"{
  default = "communication"
}

variable "communication-database-pass"{
  default = "communication"
}

variable "communication-database-hostname"{
  default = "otus-database"
}

variable "elasticsearch-hostname"{
  default = "elasticsearch"
}

variable "elasticsearch-port"{
  default = "9200"
}

variable "elasticsearch-protocol"{
  default = "http"
}

variable "elasticsearch-initialize"{
  default = "true"
}

resource "docker_container" "communication-service" {
  name = "communication-service"
  image = "${docker_image.communication-service.name}"
  env = [
    "MEMORY=${var.communication-memory}",
    "MAILER_SERVICE=${var.communication-mailer-service}",
    "MAILER_FROM=${var.communication-mailer-from}",
    "MAILER_AUTH_USER=${var.communication-auth-user}",
    "MAILER_AUTH_PASS=${var.communication-auth-pass}",
    "DATABASE_USER=${var.communication-database-user}",
    "DATABASE_PASS=${var.communication-database-pass}",
    "DATABASE_HOSTNAME=${var.communication-database-hostname}",
    "ELASTICSEARCH_PORT=${var.elasticsearch-port}",
    "ELASTICSEARCH_HOSTNAME=${var.elasticsearch-hostname}",
    "ELASTICSEARCH_PROTOCOL=${var.elasticsearch-protocol}",
    "ELASTICSEARCH_INITIALIZE=${var.elasticsearch-initialize}"
  ]
  ports {
	internal = 8080
	external = "${var.communication-service-port}"
  }

  networks_advanced {
    name = "${var.communication-network}"
  }

}
