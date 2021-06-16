var RoonApi = require("node-roon-api"),
    RoonApiStatus = require("node-roon-api-status"),
    RoonApiImage = require("node-roon-api-image"),
    RoonApiBrowse = require("node-roon-api-browse"),
    RoonApiTransport = require("node-roon-api-transport");
 

module.exports = function(RED) {
    function roonCore(config) {
        RED.nodes.createNode(this,config); 
        var node = this;
        var theCore;
        var transport;
        var image;
        var browse;
        var roon = new RoonApi({
            extension_id:        'com.jac459.nodeRedRoon',
            display_name:        "node-red roon extension",
            display_version:     "0.9.2",
            publisher:           'jac459',
            email:               'jeanarnaudcourcier@gmail.com',
            website:             'https://github.com/jac459/roon-extension-test',
            core_paired: function(core) {
                let msg = {};
                theCore = {'coreId':core.core_id, 'coreName':core.display_name, 'coreVersion':core.display_version}; 
                transport = core.services.RoonApiTransport;
                image = core.services.RoonApiImage;
                browse = core.services.RoonApiBrowse;
                let queueSubscribed = false;
                transport.subscribe_zones(function() {
                    transport.get_zones(function(cmd, data) {
                        theCore.zones = data.zones;
                        theCore.cmd = cmd;
                        msg.payload = theCore;
                        node.send([msg]);
                       if (!queueSubscribed) {
                            theCore.zones.forEach( (zone) => {
                                 transport.subscribe_queue(zone, 256, (response, message) => {
                                    msg.payload = {'zoneId': zone.zone_id, "event": response, "queue":message};
                                    node.send([null,null,null,null,msg]);
                                })
                            });
                            queueSubscribed = true;
                        }
                    })
                });
 
                node.on('input', function(msg) {
                    if (msg.payload.state) {
                        transport.get_zones(function(cmd, data) {
                            theCore.zones = data.zones;
                            theCore.cmd = cmd;
                            msg.payload = theCore;
                            node.send([msg]);
                         })
                    } 
                    else if (msg.payload.transport) {
                        if (msg.payload.transport.control) {
                            transport.control(msg.payload.transport.zone, msg.payload.transport.control, (res) => {
                                msg.payload = "Communicated " + msg.payload.transport.control + " to your roon core successfully.";
                                node.send([null, msg]);
                            })
                        };
                        if (msg.payload.transport.volume) {
                            transport.change_volume(msg.payload.transport.output, 'absolute', msg.payload.transport.volume, (res) => {
                                msg.payload = "Output: " + msg.payload.transport.output.display_name + " - Changed volume to " + msg.payload.transport.volume;
                                node.send([null, msg])
                            })
                        }; 
                        if (msg.payload.transport.seek) {
                            transport.seek(msg.payload.transport.zone, 'absolute', msg.payload.transport.seek, (res) => {
                                msg.payload = "Seek successfull";
                                node.send([null, msg])
                            })
                        } 
                    }
                    else if (msg.payload.image_key) {
                        image.get_image(msg.payload.image_key, {"scale": "fill", "width":200, "height":200, "format": "image/jpeg"}, (err, content_type, content)=>{
                            if (!err) {
                                msg.payload = content;
                                node.send([null, null, msg])
                            }
                            else {
                                msg.payload = err;
                                node.send([null, msg])
                            }
                        });
                    }  
                    else if (msg.payload.browse) {
                        let browseResult = JSON.parse(msg.payload.browse);
                        browse.browse(browseResult,(res)=>{
                            msg.payload = res;
                            node.send([null, msg])
                            browse.load(browseResult, (err, content)=>{
                                if (!err) {
                                    msg.payload = content;
                                    node.send([null, null, null, msg])
                                }
                                else {
                                    msg.payload = err;
                                    node.send([null, msg])
                                }
                            });
                        })
                    } 
                    else {
                        msg.payload = "Invalid input";
                        node.send([null, msg])   
                    } 
                });
             },
            core_unpaired: function() {
                theCore = undefined;
               // node.send({'coreId':core.core_id, 'coreName':core.display_name, 'coreVersion':core.display_name});                                      
            }
        });
        var svc_status = new RoonApiStatus(roon);
       
        roon.init_services({
            required_services: [ RoonApiTransport, RoonApiImage, RoonApiBrowse ],
            provided_services: [ svc_status ]
        });
        
        svc_status.set_status("node-red-roon extension is connected.", false);
        roon.start_discovery()
        

    }
    RED.nodes.registerType("roon-core",roonCore);
}

