# Install Helm:

## Install from Source:

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-4
chmod 700 get_helm.sh
./get_helm.sh
```

## Setup project:

### Update service.yml targetPort:

```yaml
  targetPort: {{ .Values.service.targetPort }}
```

### Update values.yml :
 
1. Add project image and tags
2. Update Ports ----> (Host port)
3. Add targetPort in service section ----> (Project port)

## Create Helm Chart:

```bash
helm create myproject -n apps --create-namespace
```

## Upgrade project:

- Update files
- Update Chart.yml appVersion
- Run helm upgrade

```bash
helm upgrade myproject myproject/ -n apps
```

## Uninstall project:

```bash
helm uninstall myproject -n apps
```

## Install project:

```bash
helm install myproject myproject/ -n apps
```

## Rollback project:

```bash
helm rollback myproject <Revision number> -n apps
```

## Port Forwarding :

```bash
kubectl port-forward svc/myproject -n apps <HostPort>:<service.port>
```

