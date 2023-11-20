kubectl apply -f metallb-config.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f clusterrole-file.yaml
kubectl apply -f clusterrolebinding-file.yaml


kubectl delete deployment frontend -n mern-app-dr
kubectl delete service frontend-svc -n mern-app-dr
kubectl apply -f frontend-deployment-dr.yaml
kubectl apply -f frontend-service-dr.yaml
kubectl apply -f ingress-resource-dr.yaml

#echo "192.168.0.215 dr.myexampleapp.com" >> /etc/hosts