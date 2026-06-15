# Kubernetes Kind Cluster Setup Guide

This guide covers:

* Installing Docker
* Installing kubectl
* Installing Kind (Kubernetes IN Docker)
* Creating a Kubernetes cluster
* Managing namespaces
* Managing Pods
* Managing Deployments
* Scaling Deployments

---

# Prerequisites

* Ubuntu/Debian-based Linux distribution
* Internet connection
* Sudo privileges

---

# 1. Install Docker

Update package repositories:

```bash
sudo apt update
```

Install Docker:

```bash
sudo apt install -y docker.io
```

Enable and start Docker service:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Add current user to Docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify Docker installation:

```bash
docker --version
docker run hello-world
```

---

# 2. Install kubectl

Download the latest stable release:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Make it executable:

```bash
chmod +x kubectl
```

Move to system path:

```bash
sudo mv kubectl /usr/local/bin/
```

Verify installation:

```bash
kubectl version --client
```

---

# 3. Install Kind

Download Kind:

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.32.0/kind-linux-amd64
```

Make it executable:

```bash
chmod +x ./kind
```

Move to system path:

```bash
sudo mv ./kind /usr/local/bin/kind
```

Verify installation:

```bash
kind version
```

---

# 4. Create a Kubernetes Cluster

Create a cluster using a configuration file:

```bash
kind create cluster --name mycluster --config=config.yml
```

Verify cluster:

```bash
kubectl cluster-info --context kind-mycluster
```

View cluster nodes:

```bash
kubectl get nodes --context kind-mycluster
```

---

# 5. Namespace Management

## Create Namespace

```bash
kubectl create namespace nginx
```

## Delete Namespace

```bash
kubectl delete namespace nginx
```

## List Namespaces

```bash
kubectl get ns
```

---

# 6. Pod Management

## Create Pod (Command)

```bash
kubectl run nginx-pod \
  --image=nginx:latest \
  --restart=Never \
  -n nginx
```

## Create Pod (YAML File)

```bash
kubectl apply -f pod.yml -n nginx
```

## Delete Pod

```bash
kubectl delete pod nginx-pod -n nginx
```

## List Pods in Namespace

```bash
kubectl get pods -n nginx
```

## List Pods in All Namespaces

```bash
kubectl get pods --all-namespaces
```

---

# 7. Deployment Management

## Create Deployment (Command)

```bash
kubectl create deployment nginx-deployment \
  --image=nginx:latest \
  -n nginx
```

## Create Deployment (YAML File)

```bash
kubectl apply -f deployment.yml -n nginx
```

## Delete Deployment

```bash
kubectl delete deployment nginx-deployment -n nginx
```

## List Deployments

```bash
kubectl get deployments -n nginx
```

---

# 8. Scale Deployment

## Scale Up to 3 Replicas

```bash
kubectl scale deployment nginx-deployment \
  --replicas=3 \
  -n nginx
```

## Scale Down to 1 Replica

```bash
kubectl scale deployment nginx-deployment \
  --replicas=1 \
  -n nginx
```

Check running pods:

```bash
kubectl get pods -n nginx
```

---

# Useful Commands

## Get All Resources in Namespace

```bash
kubectl get all -n nginx
```

## Describe Pod

```bash
kubectl describe pod nginx-pod -n nginx
```

## Describe Deployment

```bash
kubectl describe deployment nginx-deployment -n nginx
```

## View Pod Logs

```bash
kubectl logs nginx-pod -n nginx
```

## Delete Cluster

```bash
kind delete cluster --name mycluster
```

---

# Project Structure

```text
.
├── README.md
├── config.yml
├── pod.yml
└── deployment.yml
```

---

# References

* https://kind.sigs.k8s.io/
* https://kubernetes.io/docs/
* https://docs.docker.com/

```
```