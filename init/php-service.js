var reg = require("cla/reg");

reg.register('service.php.run', {
    name: _('Run PHP Code'),
    icon: '/plugin/cla-php-plugin/icon/php.svg',
    form: '/plugin/cla-php-plugin/form/php-form.js',
    rulebook: {
        moniker: 'php_script',
        description: _('Executes a PHP script'),
        required: ['server', 'code', 'php_path'],
        allow: ['server', 'php_path', 'php_args', 'user', 'code', 'remote_temp_path', 'errors' ],
        mapper: {
            'php_path':'phpPath',
            'php_args':'phpArgs',
            'remote_temp_path':'remoteTempPath',
        },
        examples: [{
            php_script: {
                server: 'php_script',
                user: 'clarive_user',
                remote_temp_path: "/tmp/scripts/",
                php_path: "/usr/bin/php",
                php_args: ['-f'],
                code: `<?php
                    echo 'hello world';
                        ?>`,
                errors: "fail"
            }
        }]
    },
    handler: function(ctx, config) {

        var ci = require("cla/ci");
        var log = require("cla/log");
        var fs = require("cla/fs");
        var path = require('cla/path');
        var reg = require('cla/reg');
        var proc = require("cla/process");
        var myUtils = require("myutils");
        var CLARIVE_BASE = proc.env('CLARIVE_BASE');
        var CLARIVE_TEMP = proc.env('TMPDIR');
        var filePath;
        var errors = config.errors;
        var server = config.server;
        var response;
        var remoteTempPath = config.remoteTempPath;
        var isJob = ctx.stash("job_dir");
        var phpPath = config.phpPath;
        var fileName = "clarive-php-code-" + Date.now() + ".php";
        var user = config.user || "";

        if (isJob) {
            filePath = path.join(isJob, fileName);
            fs.createFile(filePath, config.code);
        } else {
            filePath = path.join(CLARIVE_TEMP, fileName);
            fs.createFile(filePath, config.code);
        }

        var phpArgs = config.phpArgs || [];
        var phpParams = phpArgs.join(" ");
        var phpCommand;
        if (phpPath == '') {
            phpCommand = "php ";
        } else {
            phpCommand = phpPath + " ";
        }

        myUtils.shipFiles(server, filePath, remoteTempPath, user);
        var remoteFilePath = path.join(remoteTempPath, fileName);
        var phpRemoteCommand = phpCommand + phpParams + " " + remoteFilePath;

        log.info(_("Executing PHP code"));
        response = myUtils.remoteCommand(config, phpRemoteCommand, server, errors, user);
        var commandRemove = "rm " + remoteFilePath;
        myUtils.remoteCommand(config, commandRemove, server, errors, user);

        log.info(_("PHP code executed: "), response.output);
        fs.deleteFile(filePath);

        return response.output;
    }
});
