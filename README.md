# jravn

## Bootstrap environment in Google Cloud project

- Create a google cloud project
- Run `bootstrap.sh`
- Create a service account to use with github actions
- [Make the service account owner of the domain](https://search.google.com/search-console/users)
- Create a bucket for the terraform backend-config
- Set the variables for terraform
- Run the workflow `deploy.yml`
