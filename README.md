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

