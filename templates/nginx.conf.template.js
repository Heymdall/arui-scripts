const configs = require('../configs/app-configs');

module.exports = `client_max_body_size 20m;

server {
    listen ${configs.clientServerPort};

    location / {
        proxy_pass http://localhost:${configs.serverPort};
    }

    location /${configs.publicPath} {
        expires max;
        add_header Cache-Control public;
        root ${configs.nginxRootPath}/${configs.buildPath};
    }

    location ~ /${configs.publicPath}.*\\.js$ {
        expires max;
        add_header Cache-Control public;
        root ${configs.nginxRootPath}/${configs.buildPath};
        types {
            text/javascript  js;
        }
    }
}`;
