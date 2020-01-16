# communication-service
This project aims to provide resource for different communication models such as email, sms etc.

## Terraform

### Build Image
`terraform init terraform/build-image`
`terraform apply terraform/build-image`

### Build Container
`terraform init terraform/run-container`
`terraform apply terraform/run-container`

## !Terraform

### Build Code
`npm run production --prefix source/` 

### Build Image
`docker build -t communication-service .` 

### Build Container
`sudo docker run -d -p 80:8080 
-e MEMORY=1024 
-e DATABASE_HOSTNAME='communication-db' 
-e DATABASE_POR=27017 
-e DATABASE_USER='user' 
-e DATABASE_PASS='user'
--name communication-service communication-service`



