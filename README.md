# communication-service
This project aims to provide resource for different communication models such as email, sms etc.

# Build Code
`npm run production --prefix source /`

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
# SMTP Configuration

## System Environments

```
-e MAILER_FROM='any@email'
-e MAILER_HOST='localhost'
-e MAILER_PORT=1025
-e MAILER_SECURE='false'
-e MAILER_AUTH_USER='user'
-e MAILER_AUTH_PASS='pass'
```

## Local server
follow the link https://nodemailer.com/app/

# REst communication
`/api/communication`
Service responsible for sending emails.

```json
{
    "email":"email@email.com",
    "variables": {
                   "name":"username",
	           "id":"id"
    },
    "id":"5e1e2ef297369aec0f34429x"
}
```

**email**: email address for shipping.
**variables**: variables for replacement.
**id**: template identifier.

`/api/create-communication`
Template data persists.

```json
{
    " name ":" communication ",
    " template ":" <html> <head> <title> Document </title> </head> <body> <p> Hello {{name}}. </p> <p> Identification: {{id} } </p> </body> </html> "
}
```

**name**: The name of the project or assignee.
**template**: Template html.
**{{}}**: Variable interpolation

`/api/find-communication`
Search for a template.

```json
{
    " id ":" 5e1e2ef297369aec0f34429x "
}
```

**id**: template identifier.

`/api/get-all-communication/`
Search for all templates.


`/api/update-communication`
Updates the template data.

```json
{
    " id ":" 5e1e2ef297369aec0f34429x ",
    " name ":" communication ",
    " template ":" <html> <head> <title> Document </title> </head> <body> <p> Hello {{name}}. </p> <p> Identification: {{id} } </p> </body> </html> "
}
```

**id**: template identifier.
**name**: The name of the project or assignee.
**template**: Template html.
**{{}}**: Variable interpolation


`/api/delete-communication`
Delete a template.

```json
{
    " id ":" 5e1e2ef297369aec0f34429x "
}
```

**id**: template identifier.

# Contato
contato@otus-solutions.com.br
