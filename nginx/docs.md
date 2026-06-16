# Namespace Management

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

#  Pod Management

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

# Deployment Management

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

Delete deployment with Deployment Name:

```bash
kubectl delete deployment <deployment-name> -n <namespace>
```

Example:
```bash
kubectl delete deployment nginx-deployment -n nginx
```

Delete by YAML file:

```bash
kubectl delete -f deployment.yml -n nginx
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

# Scaling Deployments

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

# Rollout & Update Deployment

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

# ReplicaSet

## Create a ReplicaSet

```bash
kubectl apply -f replicaset.yml -n <namespace>
```

Example:

```bash
kubectl apply -f replicaset.yml -n nginx
```


## List ReplicaSet

```bash
kubectl get rs -n <namespace>
```

Example:

```bash
kubectl get rs -n nginx
```

## Delete ReplicaSet

Delete by ReplicaSet Name:

```bash
kubectl delete rs <rs-name> -n <namespace>
```

Example:

```bash
kubectl delete rs replicaset-nginx -n nginx
```

Delete by YAML file:

```bash
kubectl delete -f replicaset.yml -n nginx
```

---

# Useful Commands

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