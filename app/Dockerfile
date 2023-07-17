FROM --platform=linux/amd64 summerwind/actions-runner-dind:v2.303.0-ubuntu-22.04-3417c5a

# SHELL ["/bin/bash", "--login", "-c"]
WORKDIR $HOME

RUN sudo apt-get update \
  && sudo apt-get install -y \
  less \
  && sudo apt-get clean \ 
  && sudo rm -rf /var/lib/apt/lists/*
  
RUN curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x ./kubectl \
    && mv ./kubectl /usr/local/bin/kubectl
