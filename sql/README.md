# Create StatefullSet MySQL

## Create Namespace (Optional)
```bash
kubectl create namespace mysql
```

## Create Secret

```bash
kubectl apply -f secreat.yml
```

## Create ConfigMap

```bash
kubectl apply -f config-map.yml
```

## Create StatefulSet

```bash
kubectl apply -f statefull-set.yml
```

## Create Service

```bash
kubectl apply -f service.yml
```

## Verification

- Check if pods are running: 
 ```bash
 kubectl get pods -n mysql
 ```

- Check if services are running:
 ```bash
 kubectl get services -n mysql
 ```
 
- Check if statefulset is running:
 ```bash
 kubectl get statefulset -n mysql
 ```

- Access MySQL:
```bash
kctl exec -it mysql-statefulset-1 -n mysql -- bash
```

- Connect to MySQL shell:
```bash
mysql -u root -p
```


## Delete MySQL
- kubectl delete statefulset mysql-statefulset -n mysql
- kubectl delete service mysql-service -n mysql
- kubectl delete namespace mysql
