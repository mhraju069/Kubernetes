# Create a Job

```bash
kubectl apply -f job.yml -n <namespace>
```

Example:

```bash
kubectl apply -f job.yml -n nginx
```

---

# List Jobs

```bash
kubectl get jobs -n <namespace>
```

Example:

```bash
kubectl get jobs -n nginx
```

# Check completed Jobs

```bash
kubectl get pods -n <namespace> -l job-name=<job-name>
```

Example:

```bash
kubectl get pods -n nginx -l job-name=demo-job
```

---

# View Job Logs

```bash
kubectl logs <pod-name> -n <namespace>
```

Example:

```bash
kubectl logs demo-job-8gmq8 -n nginx
```

---

# Delete a Job

```bash
kubectl delete job <job-name> -n <namespace>
```

Example:

```bash
kubectl delete job demo-job -n nginx
```




## Cron job

# Create a CronJob

```bash
kubectl apply -f cron-job.yml -n <namespace>
```

Example:

```bash
kubectl apply -f cron-job.yml -n nginx
```

---

# List CronJobs

```bash
kubectl get cronjobs -n <namespace>
```

Example:

```bash
kubectl get cronjobs -n nginx
```

---

# Check completed CronJob Pods

```bash
kubectl get pods -n <namespace>
```

Example:

```bash
kubectl get pods -n nginx
```

---

# View CronJob Logs

```bash
kubectl logs <pod-name> -n <namespace>
```

Example:

```bash
kubectl logs demo-cron-job-29692995-nfn5j -n nginx
```

---

# Delete a CronJob

```bash
kubectl delete cronjob <cronjob-name> -n <namespace>
```

Example:

```bash
kubectl delete cronjob demo-cron-job -n nginx
```
