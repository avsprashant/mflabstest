## ArgoCD Installation
1) cd charts
1) helm repo add argo-cd https://argoproj.github.io/argo-helm
2) helm dep update .
3) helm install argocd .  -n argocd  --create-namespace
4) check if all pods are fine using "kubectl get all --all-namespaces"
5) kubectl port-forward svc/argocd-server 9090:80 --kubeconfig ~/.kube/config -n argocd
6) For our v2.4.21 login credentials "admin" and get password from "kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo". For earlier versions 
password is the pod name of "argocd-server".

## Deploy Kind Application manifests 
7) "helm template ../apps/ | kubectl apply -f -" deploys our apps
8) kubectl port-forward svc/mflabstest-svc 8081:80 --kubeconfig ~/.kube/config -n dev
9) curl -v http://localhost:8081/movie