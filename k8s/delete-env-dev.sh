cloneAppName=mern-app-dev
sourceAppID=/home/user/.local/bin/actoolkit -o table list apps | awk '$2=="mern-app-dev"{print $4}'

/home/user/.local/bin/actoolkit unmanage app f72d2e7a-cc29-4d1c-88b2-8fd7d39a4b4d
kubectl delete namedspace cloneNamespace