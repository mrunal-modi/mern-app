cd ~mern-app/k8s
kubectl apply -f frontend-deployment-dev.yaml
kubectl apply -f frontend-service-dev.yaml
kubectl apply -f ingress-resource-dev.yaml
# echo "192.168.0.215 dev.myexampleapp.com" >> /etc/hosts