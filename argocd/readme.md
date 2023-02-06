## ArgoCD Installation
1) cd charts
1) helm repo add argo-cd https://argoproj.github.io/argo-helm
2) helm dep update .
3) helm install argocd .  -n argocd  --create-namespace
4) check if all pods are fine using "kubectl get all --all-namespaces"
5) kubectl port-forward svc/argocd-server 9090:80 --kubeconfig ~/.kube/config -n argocd
6) goto http://localhost:9090
7) For our v2.4.21 login with credentials "admin" and get password from "kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo". For earlier versions 
password is the pod name of "argocd-server".

## Deploy Kind Application manifests 
8) "helm template ../apps/ | kubectl apply -f -" deploys our apps
9) Now we have deployed our restapi in dev and prod namespaces.
If we change image.tag in values-dev.yaml, only dev release gets updated.
10) kubectl port-forward svc/mflabstest-svc 8081:80 --kubeconfig ~/.kube/config -n dev
11) curl -v http://localhost:8081/movie