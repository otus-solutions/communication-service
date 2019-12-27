# communication-service

# Build Code
`npm run production --prefix source/` 

# Build Image
`docker build -t account-service .` 

# Run Container
`sudo docker run -d -p 80:8080 
-e MEMORY=1024 
-e DATABASE_HOSTNAME='account-db' 
-e DATABASE_POR=27017 
-e DATABASE_USER='user' 
-e DATABASE_PASS='user'
--name communication-service communication-service`



