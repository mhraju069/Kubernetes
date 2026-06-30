# Services

## Create services
```bash
kubectl apply -f service.yml
```

## List all in nginx namespace
```bash
kubectl get all -n nginx
```

## Delete services
```bash
kubectl delete -f service.yml
```

## Connect to services from host

```bash
kubectl port-forward service/nginx-service -n nginx 80:80 --address=0.0.0.0
```

Or if say permission denied:

```bash
sudo -E kubectl port-forward service/nginx-service -n nginx 80:80 --address=0.0.0.0
```

## Then in browser, go to

```bash
http://localhost
```

## You will see the nginx welcome page
