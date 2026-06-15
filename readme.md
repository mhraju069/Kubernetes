# Kubernetes Kind Cluster Setup Guide

A beginner-friendly guide for setting up a local Kubernetes cluster using Kind (Kubernetes IN Docker) and managing Kubernetes resources with `kubectl`.

## What You'll Learn

* Install Docker
* Install kubectl
* Install Kind
* Create and delete Kubernetes clusters
* Manage namespaces
* Create and manage Pods
* Create and manage Deployments
* Scale Deployments
* Perform rolling updates and rollbacks
* Inspect and troubleshoot resources

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

Enable and start Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Add your user to the Docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify installation:

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

Move it to your PATH:

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

Move it to your PATH:

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
kind create cluster --name <cluster-name> --config=config.yml
```

Example:

```bash
kind create cluster --name mycluster --config=config.yml
```

Verify cluster:

```bash
kubectl cluster-info --context kind-<cluster-name>
```

Example:

```bash
kubectl cluster-info --context kind-mycluster
```

View nodes:

```bash
kubectl get nodes --context kind-<cluster-name>
```

Example:

```bash
kubectl get nodes --context kind-mycluster
```

Delete cluster:

```bash
kind delete cluster --name <cluster-name>
```

Example:

```bash
kind delete cluster --name mycluster
```

---

# 5. Namespace Management

## Create Namespace

```bash
kubectl create namespace <namespace>
```

Example:

```bash
kubectl create namespace nginx
```

## Delete Namespace

```bash
kubectl delete namespace <namespace>
```

Example:

```bash
kubectl delete namespace nginx
```

## List Namespaces

```bash
kubectl get namespaces
```

or

```bash
kubectl get ns
```

---

# 6. Pod Management

## Create Pod (CLI)

```bash
kubectl run <pod-name> \
  --image=<image-name> \
  --restart=Never \
  -n <namespace>
```

Example:

```bash
kubectl run nginx-pod \
  --image=nginx:latest \
  --restart=Never \
  -n nginx
```

## Create Pod (YAML)

```bash
kubectl apply -f pod.yml -n <namespace>
```

Example:

```bash
kubectl apply -f pod.yml -n nginx
```

## Delete Pod

```bash
kubectl delete pod <pod-name> -n <namespace>
```

Example:

```bash
kubectl delete pod nginx-pod -n nginx
```

## List Pods

```bash
kubectl get pods -n <namespace>
```

Example:

```bash
kubectl get pods -n nginx
```

## List Pods in All Namespaces

```bash
kubectl get pods --all-namespaces
```

## Describe Pod

```bash
kubectl describe pod <pod-name> -n <namespace>
```

Example:

```bash
kubectl describe pod nginx-pod -n nginx
```

## View Pod Logs

```bash
kubectl logs <pod-name> -n <namespace>
```

Example:

```bash
kubectl logs nginx-pod -n nginx
```

---

# 7. Deployment Management

## Create Deployment (CLI)

```bash
kubectl create deployment <deployment-name> \
  --image=<image-name> \
  -n <namespace>
```

Example:

```bash
kubectl create deployment nginx-deployment \
  --image=nginx:latest \
  -n nginx
```

## Create Deployment (YAML)

```bash
kubectl apply -f deployment.yml -n <namespace>
```

Example:

```bash
kubectl apply -f deployment.yml -n nginx
```

## Delete Deployment

```bash
kubectl delete deployment <deployment-name> -n <namespace>
```

Example:

```bash
kubectl delete deployment nginx-deployment -n nginx
```

## List Deployments

```bash
kubectl get deployments -n <namespace>
```

Example:

```bash
kubectl get deployments -n nginx
```

## Describe Deployment

```bash
kubectl describe deployment <deployment-name> -n <namespace>
```

Example:

```bash
kubectl describe deployment nginx-deployment -n nginx
```

---

# 8. Scaling Deployments

## Scale Up

```bash
kubectl scale deployment <deployment-name> \
  --replicas=<replica-count> \
  -n <namespace>
```

Example:

```bash
kubectl scale deployment nginx-deployment \
  --replicas=3 \
  -n nginx
```

## Scale Down

```bash
kubectl scale deployment nginx-deployment \
  --replicas=1 \
  -n nginx
```

Check Pods:

```bash
kubectl get pods -n <namespace>
```

---

# 9. Rollout & Update Deployment

## Update Container Image

```bash
kubectl set image deployment/<deployment-name> \
  <container-name>=<new-image-name> \
  -n <namespace>
```

Example:

```bash
kubectl set image deployment/nginx-deployment \
  nginx=nginx:1.27 \
  -n nginx
```

---

## Check Rollout Status

```bash
kubectl rollout status deployment/<deployment-name> -n <namespace>
```

Example:

```bash
kubectl rollout status deployment/nginx-deployment -n nginx
```

---

## View Rollout History

```bash
kubectl rollout history deployment/<deployment-name> -n <namespace>
```

Example:

```bash
kubectl rollout history deployment/nginx-deployment -n nginx
```

---

## Roll Back to Previous Version

```bash
kubectl rollout undo deployment/<deployment-name> -n <namespace>
```

Example:

```bash
kubectl rollout undo deployment/nginx-deployment -n nginx
```

---

## Roll Back to a Specific Revision

```bash
kubectl rollout undo deployment/<deployment-name> \
  --to-revision=<revision-number> \
  -n <namespace>
```

Example:

```bash
kubectl rollout undo deployment/nginx-deployment \
  --to-revision=2 \
  -n nginx
```

---

# 10. Useful Commands

## Get All Resources in a Namespace

```bash
kubectl get all -n <namespace>
```

Example:

```bash
kubectl get all -n nginx
```

## Get Detailed Resource Information

```bash
kubectl describe pod <pod-name> -n <namespace>
kubectl describe deployment <deployment-name> -n <namespace>
```

## Watch Resource Changes

```bash
kubectl get pods -n <namespace> -w
```

## Show Pod IPs and Node Information

```bash
kubectl get pods -o wide -n <namespace>
```

## Show Events

```bash
kubectl get events -n <namespace>
```

## Get YAML Definition of a Resource

```bash
kubectl get deployment <deployment-name> -n <namespace> -o yaml
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
* https://kubernetes.io/docs/tasks/