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

# Main script execution
case $1 in
    define)
        define_env
        ;;
    *)
        echo "Usage: $0 [define_env]"
        exit 1
        ;;
esac
