# Create a docker image of django-notes-app
```bash
docker build -t notesApp-k8s .
```

# Tag the docker image
```bash
docker tag notesApp-k8s:latest mhraju069/notesApp-k8s:latest
```

# Login to docker
```bash
docker login 
```

# Push the docker image
```bash
docker push mhraju069/notesApp-k8s:latest
```

# Ceate a namespace (optional)
```bash
kubectl apply -f namespace.yml
```

# Create a deployment
```bash
kubectl apply -f deployment.yml
```

# Create a service
```bash
kubectl apply -f service.yml
```


# List all namespaces
```bash
kubectl get namespaces
```

# List all pods
```bash
kubectl get pods -n apps
```

# List all deployments
```bash
kubectl get deployments -n apps
```

# List all services
```bash
kubectl get services -n apps
```

# Port Forwarding

```bash
kubectl port-forward service/notes-app-service -n apps 8888:8888 --address=0.0.0.0
```

# Open the browser and go the url access the application

```bash
http://localhost:8888
```