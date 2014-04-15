# Try Redis.io

    SET server:Name "fido"      # Stores the thing
    GET server:name => "fido"   # Gets the thing
    SET connections 10
    SETNX server:name "thingie" # Set only if it key's value hasn't been set already.
    INCR connections => 11
    DEL connections
    INCR connections => 1
    

`INCR` is to make the operation atomic.
