# Programmers are Hipster Librarians
[link](http://omniref.com/blog/blog/2014/09/19/programmers-are-hipster-librarians/)

    while coding do
      next unless Problem.unsolved?
      frustration = 1
      question = Question.formulate(Problem)

      while frustration < MAX_FRUSTRATION
        answer = PersonalExperience.search(question) || InterTubes.search(question)
        break unless answer.nil?
        question.rephrase!
        frustration += 1
      end

      Problem.solve!(answer) || raise IGiveUp("I'm moving to the wilderness and raising goats.")
    end

For programmers, the thing that separates a novice from a pro is the ability to get answers quickly. If you have a limited personal knowledge base, the act of formulating a good question is critically difficult. As an experienced programmer, you've spent years building up a highly specialized mental index that gives you quick access to a lot of programming information.

*In short, you’re a not an expert programmer; you’re a librarian in an ironic t-shirt.*

When it comes to answering programming questions, we're still running an inefficient algorithm: the prerequisite of getting an answer is knowing how to ask the right question. And that takes experience.

But why? What's the one thing you usually know when you have a problem with code? You know where you are in the code. You know the package, the class, the method, you know the specific lines that are causing you trouble. Why don't we organize our programming knowledge that way?

Our goal is to build a code-based reference, by and for the programming community. We want to make a place where you can find anything: blogs, books, questions, bugs, etc. simply by looking for the code you care about.
