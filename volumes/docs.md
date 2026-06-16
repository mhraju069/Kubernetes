# Create PV manually

# Create Parsist Volume
```bash
kubectl apply -f persistent-volume.yml

```
# Create Parsist Volume Claim
```bash
kubectl apply -f persistent-volume-claim.yml
```

# Create Deployment
```bash
kubectl apply -f deployment.yml -n <namespace>
```

# Get the Logs
```bash
kubectl logs -f <pod-name> -n <namespace>
```

# Pod on which node it is running
```bash
kubectl get pods -o wide
```

# Delete
```bash
kubectl delete deployment test-deployment -n <namespace>
kubectl delete pvc local-pvc -n <namespace>
kubectl delete pv local-pv -n <namespace>
```