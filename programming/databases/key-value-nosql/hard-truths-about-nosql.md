# 7 hard truths about the NoSQL revolution
[Reference](https://www.infoworld.com/article/2617405/nosql/7-hard-truths-about-the-nosql-revolution.html)

- Summary:
  - NoSQL tosses away functionality for speed.

- ***JOINS mean consistency.***
  - Once you start storing cx addresses, you often end up with multiple copies of those addresses.
- ***Tricky transactions.***
  - It's hard to keep the various entries consistent.
- ***SQL devs have a lot of experience doing JOINs.***
  - SQL is a much more mature query language than those found in NoSQL.
- ***Too many access models.***
  - No easy ways to switch between data stores and you're often left writing glue code.
- ***Schema flexibility is trouble waiting to happen.***
  - Little things like what to name the key, different devs might choose different keys.
- ***All extras.***
  - You get all the data always. If you want to do anything but store and retrieve data, you're probably going to do it yourself.
- ***Fewer tools.***
