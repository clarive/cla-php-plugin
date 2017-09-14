var reg = require("cla/reg");

reg.register('service.php.run', {
    name: _('Run PHP Code'),
    icon: '/plugin/cla-php-plugin/icon/php.svg',
    form: '/plugin/cla-php-plugin/form/php-form.js',
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

        if (isJob) {
            filePath = path.join(isJob, "php-code.php");
            fs.createFile(filePath, config.code);
        } else {
            filePath = path.join(CLARIVE_TEMP, "php-code.php");
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

        myUtils.shipFiles(server, filePath, remoteTempPath);
        var remoteFilePath = path.join(remoteTempPath, "php-code.php");
        var phpRemoteCommand = phpCommand + phpParams + " " + remoteFilePath;

        log.info(_("Executing PHP code"));
        response = myUtils.remoteCommand(config, phpRemoteCommand, server, errors);
        var commandRemove = "rm " + remoteFilePath;
        myUtils.remoteCommand(config, commandRemove, server, errors);

        log.info(_("PHP code executed: "), response.output);
        fs.deleteFile(filePath);

        return response.output;
    }
});
