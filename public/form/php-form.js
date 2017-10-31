(function(params) {
    var data = params.data;

    var serverComboBox = Cla.ui.ciCombo({
        name: 'server',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.server || '',
        allowBlank: false,
        width: 400,
        with_vars: 1
    });

    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: data.user || '',
        allowBlank: true
    });
    
    var phpPathTextField = Cla.ui.textField({
        n    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: data.user || '',
        allowBlank: true
    });ame: 'phpPath',
        fieldLabel: _('PHP path'),
        value: params.data.phpPath || '',
    });

    var argumentsTextField = Cla.ui.arrayGrid({
        name: 'phpArgs',
        fieldLabel: _('PHP parameters'),
        value: params.data.phpArgs,
        description: _('PHP parameters'),
        default_value: '.',
    });

    var phpCodeEditor = Cla.ui.codeEditor({
        name: 'code',
        fieldLabel: _('Code Editor'),
        value: params.data.code || '',
        mode: 'php',
        height: 500,
        anchor: '100%'
    });

    var remoteTempPathTextField = Cla.ui.textField({
        name: 'remoteTempPath',
        fieldLabel: _('Remote temp path'),
        value: params.data.remoteTempPath || '/tmp',
        allowBlank: false
    });

    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: params.data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: params.data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: params.data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: params.data.rcError,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverComboBox,
            userTextField,
            phpPathTextField,
            argumentsTextField,
            remoteTempPathTextField,
            phpCodeEditor,
            errorBox
        ]
    });


    return panel;
})