# Create a Kubernetes Cluster

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