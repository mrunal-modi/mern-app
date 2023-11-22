#!/bin/bash

# Function to clone environment
clone_env() {
    cloneAppName=mern-app-dev
    cloneNamespace=mern-app-dev
    clusterID=$(/home/user/.local/bin/actoolkit -o table list clusters | awk '$2=="rke1"{print $4}')
    sourceAppID=$(/home/user/.local/bin/actoolkit -o table list apps | awk '$2=="mern-app-prd"{print $4}')

    /home/user/.local/bin/actoolkit clone --cloneAppName cloneAppName \
    --clusterID 601ff60e-1fcb-4f69-be89-2a2c4ca5a715 \
    --cloneNamespace mern-app-dev \
    --sourceAppID 0a6de1ad-afe8-4a60-9de3-385adcdae34d

    kubectl delete deployment frontend -n mern-app-dev
    kubectl delete service frontend-svc -n mern-app-dev
    kubectl apply -f frontend-deployment-dev.yaml
    kubectl apply -f frontend-service-dev.yaml
    kubectl apply -f ingress-resource-dev.yaml
    # echo "192.168.0.215 dev.myexampleapp.com" >> /etc/hosts
}

# Function to delete environment
delete_env() {
    cloneAppName=mern-app-dev
    sourceAppID=$(/home/user/.local/bin/actoolkit -o table list apps | awk '$2=="mern-app-dev"{print $4}')

    /home/user/.local/bin/actoolkit unmanage app f72d2e7a-cc29-4d1c-88b2-8fd7d39a4b4d
    kubectl delete namespace cloneNamespace
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