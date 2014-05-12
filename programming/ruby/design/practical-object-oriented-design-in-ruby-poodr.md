# Practical Object-Oriented Design in Ruby

# Introduction

Those of us whose work is to write software are incredibly lucky. Building software is a guiltless pleasure because we get to use our creative energy to get things done. We have arranged our lives to have it both ways; we can enjoy the pure act of writing code in sure knowledge that the code we write has use. We produce things that matter. We are modern people, building structures that make up present-day reality, and no less than bricklayers or bridge builders, we take justifiable pride in our accomplishments.

We want to do our best work. We want our work to have meaning. We want to have fun along the way.

# 1: Object-Oriented Design

The world is procedural, and these activities can be modeled using procedural software.

The world is also object-oriented, and each object comes equipped with its own behavior. In a world of objects, new arrangements of behavior emerge naturally.

This book is about designing OOS, and it views the world as a series of spontaneous interactions between objects. *OOD requires that you shift from thinking of the world as a collection of predefined procedures to modeling the world as a series of messages that pass between objects.* Failures of OOD might look like failures of coding technique, but they are actually failures of perspective. The first requirement for learning how to do OOD is to immerse yourself in objects; once you acquire an OO perspective, the rest follows naturally.

If an application does not change, design does not matter. Unfortunately, something *will* change. It always does. Applications that are easy to change are a pleasure to write and a joy to extend. Few difficult-to-change applications are pleasant to work with.

Object-oriented applications are made up of parts that interact to produce the behavior of the whole. The parts are `objects`, interactions are embodied in the `messages` that pass between them.

Object-oriented design is about managing dependencies. It is a set of coding techniques that arrange dependencies such that objects can tolerate change. Without design, unmanaged dependencies wreak havoc because objects know too much about one another.

In a small application, poor design is survivable. The problem with poorly designed small applications is that if they become successful they grow up to be poorly designed big applications.

## Design: Every application is a collection of code; the code's arrangement is the design

Two isolated programmers, even when they share common ideas about design, can be relied upon to solve the same problem by arranging code in different ways. Design is an art, the art of arranging code.

*Part of the difficulty of design is that every problem has two components. You must not only write code for the feature you plan to deliver today, you must also create code that is amenable to being changed later.*

The purpose of design is to allow you to do design later and its primary goal is to reduce the cost of change.

## How Design Fails

The first way design fails is due to the lack of it. Programmers initially know little about design. This is true of any OO language but some languages are more susceptible than others and an approachable language like Ruby is especially vulnerable.

Agile believes that your customers can't define the software they want before seeing it, so it's best to show them sooner rather than later. Agile believes in collaborating with customers and building software one bit at a time.

If Agile is correct, then these are true: Big Up Front Design sucks, and no one can predict when an application will be done.

Agile processes guarantee change and your ability to make these changes depends on your application's design. If you cannot write well-designed code you'll have to rewrite your application during every iteration.

*Agile does not prohibit design, it requires it. Not only does it require design, it requires really good design. It needs your best work. Its success relies on simple, flexible, and malleable code.*

While SLOC may provide a yardstick by which to measure individual effort and application complexity, it says nothing about overall quality.
