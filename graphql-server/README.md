# GraphQL Server

## Run Docker container locally

```bash
# Build image
docker build -t graphql-server .

# Spin up container on http://localhost:49160
docker run -p 49160:4000 -d graphql-server
```

## Push image to Artifact Registry

```bash
# Setup Gcloud CLI to Artifact Registry
gcloud auth configure-docker europe-west1-docker.pkg.dev

# Build image with tag used in Artifact Registry
docker build -t europe-west1-docker.pkg.dev/gcp-playground-jens/docker-repository/graphql-server .

# Push image to Artifact Registry
docker push europe-west1-docker.pkg.dev/gcp-playground-jens/docker-repository/graphql-server
```

## Deploy to Cloud Run

```bash
# Deploy command
gcloud run deploy graphql-server --image europe-west1-docker.pkg.dev/gcp-playground-jens/docker-repository/graphql-server --platform managed --region europe-west1
```

## Deploy to GKE

```bash
# Check connection to GKE cluster
gcloud container clusters get-credentials autopilot-cluster-1 --zone europe-west1

# Create Kubernetes Deployment
kubectl create deployment graphql-server --image=europe-west1-docker.pkg.dev/gcp-playground-jens/docker-repository/graphql-server:v1

# Set the baseline number of Deployment replicas to 3
kubectl scale deployment graphql-server --replicas=3

# Create a HorizontalPodAutoscaler resource for your Deployment.
kubectl autoscale deployment graphql-server --cpu-percent=80 --min=1 --max=5

# To see the Pods created, run the following command:
kubectl get pods

```

## Exposing graphql-server to the internet

```bash
# Use the kubectl expose command to generate a Kubernetes Service for the hello-app deployment
kubectl expose deployment graphql-server --name=graphql-server-service --type=LoadBalancer --port 80 --target-port 4000

# Run the following command to get the Service details for hello-app-service
kubectl get service

# graphql-server-service is now  available via EXTERNAL-IP
```

https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app
