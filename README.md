# devops-k3d-k3s-lab

# podman machin setup

> podman machine init
> podman machine start
> podman info

Here we do not need socket config since we are using podman machine, it does that istead of mannualy config.

# create local registry

> k3d registry create local-registry --port 6000

# create cluster

> k3d cluster create dev-cluster --servers 1 --agents 2 --registry-use k3d-local-registry:6000 -p "8080:80@loadbalancer"

With this command we created a cluster with 1 server and 2 worker nodes.

# node apps

In this step I created three nodejs apps. Two of them are simple nodejs apps but one is api nodejs app which using express. Also I created Dockerfiles for all these apps.

# build images

> podman build -t localhost:6000/app-a:1 .
> podman build -t localhost:6000/app-b:1 .
> podman build -t localhost:6000/app-api:1 .

# socket problem fix

Since host and podman's VM are not same, we need first to find IP of host using command:

> ipconfig getifaddr en0

Than we should enter in the podman VM terminal using command:

> podman machine ssh

List podman images using command: 

> podman images

And check are there our images. Next we need to chnage localhost in the name of the image with real host IP

> podman tag localhost:6000/app-a:1 192.168.1.181:6000/app-a:1
> podman tag localhost:6000/app-b:1 192.168.1.181:6000/app-b:1
> podman tag localhost:6000/app-appi:1 192.168.1.181:6000/app-api:1

And now we can push to registry on the host using command:

> podman push --tls-verify=false 192.168.1.181:6000/app-a:1
> podman push --tls-verify=false 192.168.1.181:6000/app-b:1
> podman push --tls-verify=false 192.168.1.181:6000/app-api:1

# kubernetes deployment

In this step I created deployment and service files for all apps and observabillity tools.
Than I run commands:

>kubectl apply -f k8s/apps/
>kubectl apply -f k8s/apps/services/
>kubectl apply -f k8s/observability/

# port forwarding

To run the app we need to ren port forwarding command 

>kubectl port-forward pod/app-a-df857fc6b-vzjdx 8081:3000
>kubectl port-forward pod/app-b-7478d86548-jz27r 8082:3000
>kubectl port-forward pod/app-api-69bd6fc98-j8xfz 8083:3000

![alt text](image.png)

