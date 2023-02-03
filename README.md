## MFLabsTest

# Stack/Tools used:
1) Github               - since the task was shared in github
2) MERN                 - App is built in MERN
3) Helm                 - Helm is a standard in k8s to deploy apps
4) swagger              - API documentation
5) Cloud Atlas Mongo    - for demo purpose, used cloud DB but in realtime we need to have our own db. Hence, DB is not included in kubernetes deployment.
6) docker               - container runtime used, other alternaives are containerd.
7) Logging              - Logging is not implemented here because, we don't have ELK.
8) Monitoring           - ServiceMonitor is added which can be used to monitor kubernetes service object.

## Testing in local/dev env:
1) Clone repo.
2) cd mflabstest && cd app
3) run `npm install && npm start`
4) curl -v http://localhost:8081/movie
5) now our DB is in cloud atlas https://www.mongodb.com/cloud/atlas/register not local
6) kill the node process. (Ctrl+C)
7) Now lets build the docker image and do a compose up.
8) docker-compose -f docker-compose-dev.yml up
9) mongorestore -u admin -p admin --archive < prashants.dump
10) kindly use this dump prashants.dump.
11) curl -v http://localhost:8081/movie

## Deployment in prod (manually)
1) clone repo.
2) cd deployment
3) helm install "releaseName"  . --kubeconfig "~/.kube/your kubeconfig file" -n "namespace"
4) In case you are getting error like "exec plugin: invalid apiVersion "client.authentication.k8s.io/v1alpha1".
Then run below:
helm template "releaseName" . > test.yaml
kubectl apply -f test.yaml --kubeconfig "~/.kube/your kubeconfig file" -n "namespace"
5) kubectl cp ../app/prashants.dump "namespace"/mflabs-0:tmp/prashants.dump -c mongo --kubeconfig "~/.kube/your kubeconfig file" -n "namespace"
6) kubectl exec -it mflabs-0  --kubeconfig "~/.kube/your kubeconfig file" -n "namespace" bash
7) cd /tmp/
8) mongorestore -u admin -p admin --archive < prashants.dump 
9) kubectl port-forward svc/mflabs-svc 8081:80 --kubeconfig "~/.kube/your kubeconfig file" -n "namespace"
10) curl -v http://localhost:8081/movie

## Deployment in prod (using GitOps/ArgoCD)
1) kubectl create namespace argocd
2) kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.21/manifests/install.yaml
3) check if all pods are fine using "kubectl get all --all-namespaces"
4) kubectl port-forward svc/argocd-server 9000:80 --kubeconfig ~/.kube/config -n argocd
4) For our v2.4.21 login credentials "admin" and get password from "kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo"
5) For earlier versions password is the pod name of "argocd-server"
6) 