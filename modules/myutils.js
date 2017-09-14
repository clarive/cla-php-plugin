var reg = require('cla/reg');

exports.remoteCommand = function(params, command, server, errors) {

    var output = reg.launch('service.scripting.remote', {
        name: _('PHP execute code'),
        config: {
            errors: errors,
            server: server,
            path: command,
            output_error: params.output_error,
            output_warn: params.output_warn,
            output_capture: params.output_capture,
            output_ok: params.output_ok,
            meta: params.meta,
            rc_ok: params.rcOk,
            rc_error: params.rcError,
            rc_warn: params.rcWarn
        }
    });
    return output;
};

exports.shipFiles = function(server, filePath, remoteTempPath) {

    reg.launch('service.fileman.ship', {
        name: _('PHP ship file'),
        config: {
            server: server,
            local_path: filePath,
            remote_path: remoteTempPath
        }
    });
};
