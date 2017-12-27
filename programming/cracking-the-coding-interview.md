## Cracking the Coding Interview, Fourth Edition

- Code on paper.
- Know your resume.
- Don't memorize solutions.
- Talk out loud.
- Behind the scenes for MS, Amazon, Google, Apple--system design and memory limits.
- "Would I have a beer with this guy?" and "Will I mind working next to this guy for six months?"
  - Smell nice. Don't ask if there are hot chicks.

### Before the Interview: Resume Advice

- Strong bullets:
  - "Accomplished X by implementing Y which led to Z."
- Projects.
- Programming Languages and Software. Languages: Ruby, prior experience with JavaScript, PHP. Currently studying Elixir.
- No personal information.
- Questions to ask the interviewer:
  - Genuine questions. Ex: 'How much of your day do you spend coding?', 'How many meetings do you have every week?', 'What is the ratio of testers to developers to product managers?' and 'How does project planning happen on the team?'
  - Insightful questions: Demonstrate your deep knowledge of programming or technologies.
  - Passion questions: 'I'm interested in scalability. How did you learn this?' and "I'm not familiar with technology X, but it sounds like a very interesting solution. Could you tell me about how it works?"

### Before the Interview: Technical Preparations

- Data structures: Linked lists, binary trees, tries, stacks, queues, vectors/`ArrayLists`, Hash tables.
- Algorithms: Breadth first search, depth first search, binary search, merge sort, quick sort, tree insert/find/etc.
- Concepts: Bit manipulation, singleton, factory design pattern, memory (stack vs heap), recursion, Big-O time.

### At the Interview: Handling Technical Questions.

- Ask your interviewer questions to resolve ambiguity.
  - Ex: sorting a list, what kind of list (array or linked list), what does it hold (numbers), are those numbers integers, are they positive always, how many need to be sorted?
- Design an algorithm.
  - Space and time complexities, what happens if there is a lot of data.
- Write pseudocode first, but make sure to tell your interviewer that you're writing pseudocode.
- Write your code, not too slow and not too fast.
- Test your code and carefully fix any mistakes.
  - 0, negative, null, maximums, general case

### At the Interview: Top Ten Mistakes Candidate Make

- **Practicing on a computer.** No computers, get out the old pen and paper.
- **Not rehearsing behavioral questions.** Behavioral questions are also asked too.
- **Not doing a mock interview.**
- **Trying to memorize solutions.**
- **Talking too much.** "What was the hardest bug?" Situation, action, response. Issue 1, issue 2, issue 3.
- **Talking too little.**
- **Rushing.**
- **Not debugging.**
- **Sloppy coding.** Imagine that you're writing for real-world maintainability.
- **Giving up.** You'll always be given a hard problem.

### At the Interview: Frequently Asked Questions

- You don't have to get every questions right, they want you to struggle with a hard problem.
- Tell the interview if you know the question--this demonstrates integrity.
- Dressing: one step above the nicest dressed employees in their position.
- Reapplying: after 6 months-1 year.

### Data Structures

- Hash tables.
- ArrayList (dynamically resizing array). When a vector is full, the array doubles in size.


1.1 Iterate over the array, storing the result of an iteration in an array. O(n) space and O(n) time.
1.2. Reversing a C-Style string: You can do the `.reverse`, but you can also iterate over the array then create a new array where you add at the start.
- Removing duplicate characters in a string:

```
abc
def
ghi

cba
def
ghi

cfa
deb
ghi

ifa
deb
ghc

gda
heb
ifc

```
