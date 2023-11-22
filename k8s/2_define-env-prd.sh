#!/bin/bash

# Function to clone environment
define_env() {   
    ClusterName=rke1
    appLogicalName=mern-app-prd
    namespaceName=mern-app-prd
    clusterID=$(actoolkit -o table list clusters | awk -v cn="$ClusterName" '$2==cn{print $4}')
    # Execute the command
    actoolkit manage app $appLogicalName $namespaceName $clusterID || { echo "actoolkit manage app command failed"; exit 1; }
}

snap_env() {   
    appLogicalName=mern-app-prd
    appID=$(actoolkit -o table list apps | awk -v sa="$appLogicalName" '$2==sa{print $4}')
    # Execute the command
    actoolkit create snapshot $appID snap1
}

replicate_env() {  
    destClusterName=rke2
    destNamespace=mern-app-dr
    appLogicalName=mern-app-prd
    appID=$(actoolkit -o table list apps | awk -v sa="$appLogicalName" '$2==sa{print $4}')
    destClusterID=$(actoolkit -o table list clusters | awk -v cn="$destClusterName" '$2==cn{print $4}')
    # Execute the command
    actoolkit create replication $appID -c $destClusterID -n $destNamespace -f 30m
}

# Main script execution
case $1 in
    define)
        define_env
        ;;
    snap)
        snap_env
        ;;
    replicate)
        replicate_env
        ;;
    *)
        echo "Usage: $0 [define|snap|replicate]"
        exit 1
        ;;
esac
