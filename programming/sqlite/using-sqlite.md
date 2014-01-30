SQLite
* A public-domain software package that provides an RDBMS.
* Serverless: No separate server process or system to operate
* Zero configuration: No setup, can be put into mobile phones, handhelds, game consoles
* Cross-platform: Resides in a single file. Dtabases can be moved, modified, and shared with the same ease a word-processing document or spreadsheet file. No chance of database being corrupt or unavailable. 
* Transactional: ACID compliant
Features
* Dynamic-type system for tables, any value can be put into any column, regardless of type.
* Able to manipulate more than 1 db at a time
* Able  to create fully in-memory db (no backup)
* No license
* 10 million unit tests
* SQLite can work as a stand-in database for those situations when a more robust RDBMS would be the right choice, if it were available.
* No db admin concerns. The simple file format makes it easy to prepare cx-specific data sets or show off product features that significantly modify the database.
Not good for
* High transaction rates
* Extremely large datasets (less than a dozen gigabytes please)
* NO authentication or authorization data when connecting to it.
* One machine only, hard to lock shit up.
Building and Installing SQLite
* SQL is a declarative language: You state what you want the results to be and the language figures things out.
* Escape character: single quote(‘ ‘)
* 3VL: True, False, NULL
Column Types
NULL: Does not hold a value
Integer: 1, 2, 3, 4, 6, or 8 bytes in length
Float
Text: Variable-length string
BLOB: A length of raw bytes, hexadecimal string. BLOB meands Binary large OBject.
* Maximum size of a text is limited by a compile length directive.	
