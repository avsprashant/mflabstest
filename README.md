## MFLabsTest

# Stack/Tools used:
1) Github CI            - since the task was shared in github
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
9) mongorestore -u admin -p admin --archive < movies.dump
10) kindly use this dump movies.dump.
11) curl -v http://localhost:8081/movie
12) Now kill the docker-compose process. (Ctrl+C)
13) Now let's deploy in dev/test namespace in kubernetes cluster.

## Deployment in test/dev namespace (manually)
1) clone repo.
2) cd ../manifests
3) helm install mflabstest . -n mflabstest --create-namespace --kubeconfig "~/.kube/your kubeconfig file"
4) In case you are getting error like "exec plugin: invalid apiVersion "client.authentication.k8s.io/v1alpha1".
Then run below:
helm template "releaseName" . -n "namespace" > test.yaml
kubectl apply -f test.yaml --kubeconfig "~/.kube/your kubeconfig file" -n "namespace"
5) kubectl port-forward svc/mflabstest-svc 8081:80 -n mflabstest --kubeconfig "~/.kube/your kubeconfig file"
6) curl -v http://localhost:8081/movie

## Deployment in prod (using GitOps/ArgoCD)
1) cd ../argocd
2) refer instructions there