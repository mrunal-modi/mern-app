#!/bin/bash

setup_actoolkit() {   
    sudo apt-get update -y
    sudo apt-get install pip
    sudo python3 -m pip install actoolkit
    export PATH="/home/user/.local/bin:$PATH"
    cp -p actoolkit-sample-config.yaml config.yaml
}

deploy_prd_env(){
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
}

define_prd_env() {   
    ClusterName=rke1
    appLogicalName=mern-app-prd
    namespaceName=mern-app-prd
    clusterID=$(actoolkit -o table list clusters | awk -v cn="$ClusterName" '$2==cn{print $4}')
    # Execute the command
    actoolkit manage app $appLogicalName $namespaceName $clusterID || { echo "actoolkit manage app command failed"; exit 1; }
}

snap_prd_env() {   
    appLogicalName=mern-app-prd
    appID=$(actoolkit -o table list apps | awk -v sa="$appLogicalName" '$2==sa{print $4}')
    # Execute the command
    actoolkit create snapshot $appID snap1
}

replicate_prd_env() {  
    destClusterName=rke2
    destNamespace=mern-app-dr
    appLogicalName=mern-app-prd
    appID=$(actoolkit -o table list apps | awk -v sa="$appLogicalName" '$2==sa{print $4}')
    destClusterID=$(actoolkit -o table list clusters | awk -v cn="$destClusterName" '$2==cn{print $4}')
    # Execute the command
    actoolkit create replication $appID -c $destClusterID -n $destNamespace -f 30m
}

clone_dev_env() {
    cloneAppName=mern-app-dev
    cloneNamespace=mern-app-dev
    ClusterName=rke1
    sourceAppName=mern-app-prd
    clusterID=$(actoolkit -o table list clusters | awk -v cn="$ClusterName" '$2==cn{print $4}')
    sourceAppID=$(actoolkit -o table list apps | awk -v sa="$sourceAppName" '$2==sa && !/replication destination/{print $4}')
    # Execute the command
    echo "actoolkit clone --cloneAppName $cloneAppName --clusterID $clusterID --cloneNamespace $cloneNamespace --sourceAppID $sourceAppID"
    actoolkit clone --cloneAppName $cloneAppName --clusterID $clusterID --cloneNamespace $cloneNamespace --sourceAppID $sourceAppID
    kubectl delete deployment frontend -n $cloneNamespace || echo "Deployment frontend not found in namespace $cloneNamespace"
    kubectl delete service frontend-svc -n $cloneNamespace || echo "Service frontend-svc not found in namespace $cloneNamespace"
    kubectl apply -f frontend-deployment-dev.yaml || echo "Failed to apply frontend-deployment-dev.yaml"
    kubectl apply -f frontend-service-dev.yaml || echo "Failed to apply frontend-service-dev.yaml"
    kubectl apply -f ingress-resource-dev.yaml || echo "Failed to apply ingress-resource-dev.yaml"
}

delete_dev_env() {
    export KUBECONFIG=/home/user/kubeconfigs/rke1/kube_config_cluster.yml
    cloneAppName=mern-app-dev
    cloneNamespace=mern-app-dev
    cloneAppID=$(actoolkit -o table list apps | awk -v sa="$cloneAppName" '$2==sa{print $4}')
    actoolkit unmanage app $cloneAppID
    kubectl delete namespace $cloneNamespace
}

# Main script execution
case $1 in
    setup_actoolkit)
        setup_actoolkit
        ;;
    deploy_prd_env)
        deploy_prd_env
        ;;
    define_prd_env)
        define_prd_env
        ;;
    snap_prd_env)
        snap_prd_env
        ;;
    replicate_prd_env)
        replicate_prd_env
        ;;
    clone_dev_env)
        clone_dev_env
        ;;
    delete_dev_env)
        delete_dev_env
        ;;
    *)
        echo "Usage: $0 [setup_actoolkit|deploy_prd_env|define_prd_env|snap_prd_env|replicate_prd_env|clone_dev_env|delete_dev_env]"
        exit 1
        ;;
esac
