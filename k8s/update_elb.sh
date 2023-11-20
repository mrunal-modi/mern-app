#!/bin/bash
# Update the HAProxy external load balancer to have the specified backend
# resolve to the IP address of the LoadBalancer service on the specified
# cluster and namespace.
# Usage: update_elb.sh <cluster> <namespace> <backend_name>
# e.g. update_elb.sh rke2 mern-app-dr wordpress

if [ $# -eq 0 ]
then
  echo Usage: update_elb.sh \<cluster\> \<namespace\> \<backend_name\>
  exit 0
elif [ $# -ne 3 ]
then
  echo Invalid arguments!
  echo Usage: update_elb.sh \<cluster\> \<namespace\> \<backend_name\>
  exit 1
fi

cluster=$1
namespace=$2
backend=$3

if [[ $cluster =~ ^ocp ]]
then
  # Assume OpenShift-style kubconfig file name
  KUBECONFIG=/home/user/kubeconfigs/${cluster}/kubeconfig
  OpenShift=1
else
  # Assume RKE-style kubconfig file name
  KUBECONFIG=/home/user/kubeconfigs/${cluster}/kube_config_cluster.yml
fi

if [ ! -e $KUBECONFIG ]
then
  echo Invalid cluster = $cluster, aborting!
  exit 1
fi

if [ ! -z $OpenShift ]
then
  echo Authenticating to the OpenShift cluster $cluster.
  oc login -u admin -p Netapp1!
fi

ip=$(kubectl get service -n $namespace -o json | jq '.items[].status | {loadBalancer} | select(.loadBalancer!={})' | jq '.loadBalancer.ingress[].ip' | sed 's/"//g')
if [ ! -z $ip ]
then
  echo Found cluster \"$cluster\" namespace \"$namespace\" LoadBalancer service IP \"$ip\"
  ssh lb1 /usr/local/bin/update_haproxy.sh $backend $ip
  if [ $? -eq 0 ]
  then
    echo Updated HAProxy \"$backend\" backend to use server IP \"$ip\"
  else
    echo Error while updating HAProxy backend \"$backend\", aborting!
  fi
else
  echo "No LoadBalancer service found on cluster $cluster for namespace $namespace, aborting!"
  exit 1
fi
