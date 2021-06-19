# roon-node-red

Roon control by node-red.

This node is a wrapper for the roon node.js API.

## For meta&neeo users:
### 1 How install the node
#### 1.1 Go to your node-red instance create for the meta driver 
generally it is something like http://192.168.50.115:1880/ ==> you need to replace 192.168.50.115 by the IP address of the device running meta and node-red).
#### 1.2 On the page, click the burger icon on the top right of your screen and choose "palette"
#### 1.3 Click on the install pane and search roon-core
#### 1.4 Choose install
### 2 Now you need to create the flow associated to the node (node-red is the sum of nodes and flows)
#### 2.1 Go to the menu again (burger :-))  and choose import.
#### 2.2 Click select a file to import
#### 2.3 copy paste this into the filename: https://raw.githubusercontent.com/jac459/roon-node-red/main/roon-flow.json
#### 2.4 Click import and drag and drop the schema somewhere in the page (make it looks good).
#### 2.5 Click Deploy
### 3 Now we need to tell roon we have an extension
#### 3.1 Open your roon UI.
#### 3.2 Go to settings
#### 3.3 Choose Extensions
#### 3.4 You will see the roon-core and will just have to click Enable.
Congratulation, you are done.


