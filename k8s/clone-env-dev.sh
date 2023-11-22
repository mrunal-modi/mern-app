#!/bin/bash

# Function to clone environment
clone_env() {
    cloneAppName=mern-app-dev
    cloneNamespace=mern-app-dev
    ClusterName=rke1
    sourceAppName=mern-app-prd
    clusterID=$(/home/user/.local/bin/actoolkit -o table list clusters | awk -v cn="$ClusterName" '$2==cn{print $4}')
    sourceAppID=$(/home/user/.local/bin/actoolkit -o table list apps | awk -v sa="$sourceAppName" '$2==sa{print $4}')
    # Execute the command
    /home/user/.local/bin/actoolkit clone --cloneAppName $cloneAppName --clusterID $clusterID --cloneNamespace $cloneNamespace --sourceAppID $sourceAppID || { echo "actoolkit clone command failed"; exit 1; }
    kubectl delete deployment frontend -n $cloneNamespace || echo "Deployment frontend not found in namespace $cloneNamespace"
    kubectl delete service frontend-svc -n $cloneNamespace || echo "Service frontend-svc not found in namespace $cloneNamespace"
    kubectl apply -f frontend-deployment-dev.yaml || echo "Failed to apply frontend-deployment-dev.yaml"
    kubectl apply -f frontend-service-dev.yaml || echo "Failed to apply frontend-service-dev.yaml"
    kubectl apply -f ingress-resource-dev.yaml || echo "Failed to apply ingress-resource-dev.yaml"
}

# Function to delete environment
delete_env() {
    cloneAppName=mern-app-dev
    cloneNamespace=mern-app-dev
    cloneAppID=$(/home/user/.local/bin/actoolkit -o table list apps | awk -v sa="$cloneAppName" '$2==sa{print $4}')
    # Execute the commands
    /home/user/.local/bin/actoolkit unmanage app $cloneAppID
    kubectl delete namespace $cloneNamespace
}

# Main script execution
case $1 in
    clone)
        clone_env
        ;;
    delete)
        delete_env
        ;;
    *)
        echo "Usage: $0 [clone|delete]"
        exit 1
        ;;
esac
