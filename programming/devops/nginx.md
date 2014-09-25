# Beginner's Guide
[link](http://nginx.org/en/docs/beginners_guide.html)

`nginx` has one master process and several worker processes. The main purpose of the master process is to read and evaluate configuration, and maintain worker processes. Worker processes do actual processing of requests. `nginx` employs event-based model and OS-dependent mechanisms to efficiently distribute requests among worker processes. The number of worker processes is defined in the configuration file and may be fixed for a given configuration or automatically adjusted to the number of available CPU cores.

Configuration file: `nginx.conf` and placed in the directory `/usr/local/nginx/conf`.

To start: run the executable.

Once it is started, it can be controlled by invoking the executable with the `-s` parameter.

    $ nginx -s stop   # fast shutdown
    $ nginx -s quit   # graceful shutdown (stop nginx processes with waiting for the worker processes to finish serving current requests
    $ nginx -s reload # reloading the configuration file
    $ nginx -s reopen # reopening the log files

Killing via the Unix tools:

    $ kill -s QUIT 1628 # The process ID of the nginx master process is written, by default, to the nginx.pid in the directory /usr/local/nginx/logs or /var/run.

    $ kill -s QUIT 1628   # Assuming the master process ID is 1628, use this to send the QUIT signal.
    $ ps -ax | grep nginx # To get the list of all running nginx processes.

## Configuration files' structure.

`nginx` consists of modules which are controlled by directives specified in the configuration file.

- Simple directive: consists of the name and parameters separated by spaces and ends with a semicolon.
- Block directive: same structure as a simple directive, but instead of the semicolon , it ends with a set of additional instructions surrounded by braces.
- Context: Has other directives inside braces.





