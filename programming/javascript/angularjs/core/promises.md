# AngularJS–Part 11, Promises
[link](http://lostechies.com/gabrielschenker/2014/02/04/angularjspart-11-promises/)

While the easiest way to program is to write everything in sequence, but sometimes this is not the best way to code, specifically not in an application with a GUI. In Windows, we use multiple threads (one on graphics, others on the worker/background). *In JS, we can only have one thread available, and thus we have to find other means of how to achieve asynchrony.*

*Promise*

Using callback functions to achieve asynchrony in code becomes way too complicated when you have to compose multiple asynchronous calls and make decisions depending upon the outcome of this composition.

*A promse represents the eventual result of an asynchronous operation.* In layman's terms, a promise is an object with a *then* method. The *then* method has two (optional) parameters:

    promise.then(onSuccess, onFailure);

For each promise, only one of the functions can ever be called. The task either succeeds or it fails; no other outcome is possible.

*Samples:*

In Angular we have the `$q` service that provides deferred and promise implementations.

    var deferred = $q.defer();

Initially, this task is in the status pending. Eventually the task completes successfully or it fails. If it succeeds, the status is *resolved* and in the fail, the status is *rejected*.

To signal that the task has succeeded:

    deferred.resolve('Cool') # The parameter passed in is the data returned. The task has succeeded.
    deferred.reject('Sorry') # The parameter passed in is the data/signal that the task has failed.

The deferred object has a property promise which represents the promise of this task. With this promise, we can register an on success and an on failure function.

    var promise = deferred.promise;
    promise.then(function(result){
      alert('Success: ' + result); # This is what happens when the promise succeeds
    }, function(reason){
      alert('Error: ' + reason);   # This is what happens when it fails
    });

    if (fail)
      deferred.reject('sorry');    # Send a "fail" to the deferred object.
    else
      deferred.resolve('cool');    # Sedn a "success" to the deferred object.

[TODO]: CHANINING_PROMISES.
