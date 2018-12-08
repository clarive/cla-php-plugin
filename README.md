# PHP Plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-php-plugin/public/icon/php.svg" alt="PHP Plugin" title="PHP Plugin" width="120" height="120">

The PHP plugin will allow you to execute PHP code on the server of your choice in Clarive and to view its result.

## What is PHP

PHP is a widely-used open source general-purpose scripting language that is especially suited for web development and
can be embedded into HTML.

## Requirements

To be able to use the plugin correctly, you must have PHP installed on the server where you wish to execute the code.

## Installing

To install the plugin, place the `cla-php-plugin` folder inside `$CLARIVE_BASE/plugins` directory in the Clarive
instance.

## How to Use

Once the plugin is placed in its folder, you can start using it by going to your Clarive instance.

After restarting your Clarive instance, you will have a new palette service called 'Run PHP Code'.

### Parameters

The service creates a temp file with the inserted code, this file is sent and executed on the target server.

The parameters available for this service are:

- **Server (php_server)** - The GenericServer Resource where you wish to execute the code.
- **User (user)** - User which will be used to connect to the server.
- **PHP path (php_path)** - Full path for PHP launching script, including the file. If you leave it empty, the plugin will launch
  *php* as a system environment variable.
- **PHP parameters (php_args)** - Additional flags for the PHP command.
- **Remote temp path (remote_temp_path)** - Temporally path where the code will be stored and executed.
- **Code Editor (code)** - Contains the script to be executed.

**Only Clarive EE**

- **Errors and Output** - These two fields deal with managing control errors. The options are:
   - **Fail and Output Error** - Search for the configured error pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Warning and Output warning** - Search for configured warning pattern in script output. If found, an error message
     is displayed in the monitor showing the match.
   - **Custom** - If the Errors combo is set to custom, a new form is displayed to define the behavior with the
     following fields:
   - **Ok** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
   - **Warn** - Range of return code values to warn the user. A warning will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
     monitor.

### In Clarive EE

You can find this service in the Rule Designer palette.

Op Name: **Run PHP code**

Example:

```yaml
      Server: php_server
      user: clarive_user
      PHP path: /usr/bin/php
      PHP parameters: -f
      Remote temp path: /tmp
      Code Editor: <?php echo "Hello world"; ?>
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: PHP Demo
do:
    php_script:
       server: php_server # Required. Use the mid set to the resource you created
       php_path: '/usr/bin/php' # Required
       php_args: ["-f"]
       user: ${username}
       remote_temp_path: "/tmp"
       code: |                  # Required
            <?php
                echo 'hello world';
            ?>;
```

##### Outputs

###### Success

The plugin will return all the console output you set in the PHP code.

```yaml
rule: PHP Demo
do:
    - myvar = php_script:
       server: php_server
       php_path: '/usr/bin/php'
       php_args: ["-f"]
       user: 'clarive_user'
       remote_temp_path: "/tmp"
       code: |
            <?php
                echo 'hello world';
            ?>;
    - echo: ${myvar}
```

For this command the output will be similar to this one:

```yaml
hello world;
```

###### Possible configuration failures

**Code failed**

```yaml
Error running remote script
```

Make sure that the option is available and you code is correct to be executed in PHP.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "php_script": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Code` not available for op "php_script"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.