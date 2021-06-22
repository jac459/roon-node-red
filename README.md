# roon-node-red

Roon control by node-red.

This node is a wrapper for the roon node.js API.


# For meta&neeo users:
### How install the node
#### Go to your node-red instance create for the meta driver 
generally it is something like http://192.168.50.115:1880/ ==> you need to replace 192.168.50.115 by the IP address of the device running meta and node-red).
#### On the page, click the burger icon on the top right of your screen and choose "palette"
#### Click on the install pane and search roon-core
#### Choose install
### Now you need to create the flow associated to the node (node-red is the sum of nodes and flows)
#### Go to the menu again (burger :-))  and choose import.
#### Click select a file to import
#### copy paste this into the filename: https://raw.githubusercontent.com/jac459/roon-node-red/main/roon-flow.json
#### Click import and drag and drop the schema somewhere in the page (make it looks good).
#### Click Deploy
Congratulation, you are done.
