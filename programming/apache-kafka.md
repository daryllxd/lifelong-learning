# Understanding Apache Kafka
[Reference](https://www.youtube.com/watch?v=k-7lz6Ex354)

- Moving your data into your cluster: processing historical data, processing done in real time as it comes in.
- General publish/subscribe messaging system: they store messages from publishers, publish them to a stream of data (topic), and consumers subscribe to one or more topics, and receive data as it's published. Because it has different consumers, each consumer can pick up when it needs to.
- Ex of producers: apps that generate data/stuff that pushes data into your Kafka cluster.
- Ex of consumers: need to be able to read the data that is coming into the cluster.
- Database can also send stuff to Kafka when a row changes, or it can accept stuff from the cluster.
- Stream processors: transform data as it comes in, ex: raw log lines go in, extract that, and republish this into Kafka.
- This is a hard problem!
- How it scales: Multiple servers with multiple processes, and consumers can have messages distributed amongst them.
