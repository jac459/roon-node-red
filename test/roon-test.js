var RoonApi = require("node-roon-api"),
    RoonApiStatus = require("node-roon-api-status");

        var roon = new RoonApi({
            extension_id:        'com.elvis.test',
            display_name:        "Elvis's First Roon API Test",
            display_version:     "1.0.0",
            publisher:           'Elvis Presley',
            email:               'elvis@presley.com',
            website:             'https://github.com/elvispresley/roon-extension-test',
            core_paired: function(core) {
              console.log(core);
            },
        
            core_unpaired: function(core) {
                           console.log(core);
                       }
        });
        var svc_status = new RoonApiStatus(roon);
        roon.init_services({
          provided_services: [ svc_status ]
      });
      
      svc_status.set_status("test is ok", false);
