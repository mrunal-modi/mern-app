cd ~mern-app/k8s
kubectl apply -f metallb-config.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f clusterrole-file.yaml
kubectl apply -f clusterrolebinding-file.yaml
kubectl create ns mern-app-prd
kubectl apply -f database-pvc.yaml
kubectl apply -f database-deployment.yaml
kubectl apply -f database-service.yaml
kubectl apply -f backend-env-configmap.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f ingress-resource-prd.yaml
#echo "192.168.0.215 prd.myexampleapp.com" >> /etc/hosts