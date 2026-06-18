# Create Horizontal Pod Autoscaler

## Create namespace
```bash
kubectl apply -f namespace.yml
```

## Create deployment
```bash
kubectl apply -f deployment.yml
```

## Create service
```bash
kubectl apply -f service.yml
```

## Create hpa
```bash
kubectl apply -f hpa.yml
```

## Load test
```bash
python3 load_test.py
```

## Watch hpa
```bash
watch kubectl get hpa -n apache
```

## Watch deployment pods
```bash
watch kubectl get pods -n apache
```

## Watch deployment pods cpu usage
```bash
kubectl top pod -n apache
```