#!/bin/bash

sudo apt-get update -y
sudo apt-get install pip
sudo python3 -m pip install actoolkit

export PATH="/home/user/.local/bin:$PATH"
