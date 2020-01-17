# communication-service
This project aims to provide resource for different communication models such as email, sms etc.

Env configuration

`-e MAILER_FROM='any@nubmi9.catchall.delivery'
-e MAILER_HOST='localhost'
-e MAILER_PORT=1025
-e MAILER_SECURE='false'
-e MAILER_AUTH_USER='project.1'
-e MAILER_AUTH_PASS='secret.1'`

Local server

follow the link https://nodemailer.com/app/


/api/communication

Description: Sending email with variable substitution service, by email to a specific email.

Model:

email: email address for shipping.

variables: variables to replace as per template and enter {{}}.

id: search id.

example:
{
    " email ":" teste@gmail.com ",
    " variables ": {
    " name ":" username ",
	" id ":" id "
    },
    " id ":" 5e1e2ef297369aec0f34429x "
}


/ api / create-communication

Description: Template data persists.

Model:

name: The name of the project or assignee.

template: template html.

example:
{
    " name ":" communication ",
    " template ":" <html> <head> <title> Document </title> </head> <body> <p> Hello {{name}}. </p> <p> Identification: {{id} } </p> </body> </html> "
}


/ api / find-communication

Description: Search for a template.

Model:

id: search id.

example:
{
    " id ":" 5e1e2ef297369aec0f34429x "
}


api / get-all-communication

Description: Search for all templates.

Model:

no model


/ api / update-communication

Description: Updates the template data.

Model:

id: search id.

name: The name of the project or assignee.

template: template html.

example:
{
    " id ":" 5e1e2ef297369aec0f34429x ",
    " name ":" communication ",
    " template ":" <html> <head> <title> Document </title> </head> <body> <p> Hello {{name}}. </p> <p> Identification: {{id} } </p> </body> </html> "
}


/ api / delete-communication

Description: Delete a template.

Model:

id: search id.

example:
{
    " id ":" 5e1e2ef297369aec0f34429x "
}

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





