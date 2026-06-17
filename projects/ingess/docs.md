# Install NGINX Ingress Controller
## https://kubernetes.github.io/ingress-nginx/deploy/
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

# Create Ingress
```bash
kubectl apply -f ingress.yml -n apps
```

# Check Ingress Status
```bash
kubectl get ingress -n apps
```

# Check Events
```bash
kubectl get events -n apps --field-selector involvedObject.name=apps-ingress
```