# Install Metrics Server

## Apply metrics server deployment

```bash
kctl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## Edit metrics server deployment file

```bash
kubectl edit deployment metrics-server -n kube-system
```
#### Add below arguments to the deployment file

```yaml
- args:
    - --kubelet-insecure-tls
    - --kubelet-preferred-address-types=InternalIP,Hostname,ExternalIP
```

## Check metrics-server pods

```bash
kubectl get pods -n kube-system
```


## Restart the deployment

```bash
kubectl -n kube-system rollout restart deployment metrics-server
```

## Check metrics-server pods

```bash
kubectl get pods -n kube-system
```


# List All Metrics

```bash
kubectl top node
```

```bash
kubectl top pod
```
