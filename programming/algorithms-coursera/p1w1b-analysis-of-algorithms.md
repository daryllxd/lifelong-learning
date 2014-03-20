## 3 - 1 - Analysis of Algorithms Introduction (8_14)

#### Cast of characters
- Programmer needs to develop a working solution.
- Client wants to solve the problem efficiently.
- Theoretician wants to understand.
- The blocking and tackling: this lecture.
- Student may play any or all of these roles someday.

#### Running time

_"As soon as an Analytic Engine exists, it will necessarily guide the future course of the science. Whenever any result is sought by its aid, the question will arise--By what course of calculation can these resultsbe arrived at by the machine in the shortest time?" - Charles Babbage, 1864_

Practical reason: Avoid performance bugs. We want some confidence that the job actually works.

*The challenge: Will my program be able to solve a large practical input?* The insight made by Knuth in the 1970s was that we can use the scientifc method to figure out shit.

## 15 - 1 - Observations (10_05)

3-Sum: Given N distinct integers, how many triples sum to exactly zero?

#### Brute-force

    public static int count(int[] a){
        int N = a.length;
        int count = 0;

        for (int i = 0; i < N; i++) 
            for (int j = i+1; j < N; j++)
                for (int k = j+1; k < N; k++)
                    if (a[i] + a[j] + a[k] == 0)
                        count++;

        return count;
    }

*Empyrical analysis:* To benchmark shit, you can time a program and exrapolate running time using multiple and crap.

Log-log plot: Plot this shit, and extrapolaterzz.

System independent effects: Algorithm, input data.

System dependent: Hardware, software, system.

## 27 - 1 - Mathematical Models (12_48)

*Total running time: Sum of cost x frequency for all operations.*

Cost of basic operations

- int add: 2.1 ns
- int multiple: 2.4 ns
- int divide: 5.4 ns
- floating-point add: 4.6 ns
- floating-point multiply: 4.2 ns
- floating-point divide: 13.5 ns
- sine: 91.3 ns
- arctan: 129.0 ns

In most cases, we just postulate with a constant:

- variable declaration: c1
- assignment: c2
- int compare: c3
- array allocation: c6 * N
- 2D array allocation: c7 * N^2
- string concat: c10 * N _# many novices assume this is constant when it is not_

#### Example: 2-Sum.

    int count = 0;

    for (int i = 0; i < N; i++)
        if (a[i] == 0)
            count++;

- Variable declaration: 2 (count, i).
- Assignment statement: 2 (count = 0, i = 0)
- Less than compare: N + 1 (add 1 to exit loop) 
- Equal to comapre: N.
- Array access: N.
- Increment: N to 2N.

#### 2-Sum more advancesd.
    
    int count = 0;
    
    for (int i = 0; i < N; i++)
        for (int j = i+1; j < N; j++)
            if (a[i] + a[j] == 0)
                count++;

- Variable declaration: N + 2 (Inner j = n times, then add 2 for i and count.)
- Assignment statement N + 2 (Inner j assigned n times as i+1, then add 2 for 2 and i and count).
- Less than compare: ½ (N + 1) (N + 2) (i compares n+1 to exit its loop, then multiply that by j times (n+2 to exit its loop), then divide by 2 since j is getting things from the midpoint.)
- Equal to compare ½ N (N − 1). First loop is N. Inner loop is (N - 1)/2 because of the midpoint thingie.
- Array access: N (N − 1). Double the previous number since you access both i and j per pass.
- Increment: ½ N (N − 1) to N (N − 1). Depends on how many satisfied the condition, but if all combinations are satisfied, then it should equal the "equal to compare" operation.

_Turing: It is convenient to have a measrue of the amount of work involved in a computing process, even though it is a crude one._ But instead of thinking of every detail, think of a proxy.

First simplification: Array accesses.

Second simplification: Tilde notation. Ignore the lower order terms, because either they are too irrelevant to affect, or they are too small to be cared.

- Ex 1. ⅙ N^3 + 20 N + 16  ⅙ N^3
- Ex 2. ⅙ N^3 + 100 N 4/3 + 56   ~ ⅙ N^3
- Ex 3. ⅙ N^3 - ½ N 2 + ⅓ N   ~ ⅙ N

*To estimate a discrete sum, either take a discrete maths course (lol) or replcae the sum with an integral, and use calculus.*

In principle, accurate mathematical models are available. In practice, formulas can be complicated and advanced mathematics might be required. Exact models are best left for experts.

## 35 - 1 - Order-of-Growth Classifications (14_39)

Just a few functions turn up:

1 , log N, N, N log N, N^2, N^3, 2^N. (We discard the leading coefficient, btw.)

For many algorithms, our first task is to just make sure we don't have a quadratic or cubic.

- Constant: Statement.
- Logarithmic: Divide in half. (Binary search). 
- Linear: Loop. (Find the maximum).
- N log N: Divide and conquer. (Mergesort).
- Quadratic: Double loop. (Check all pairs).
- Cubic: Triple loop. (Check all triples).
- Exponential: Exhaustive search. (Check all subsets).

#### Binary search demo/implementation

    public static int binarySearch(int[] a, int key){
        int lo = 0, hi = a.length-1;

        while (lo <= hi){
            int mid = lo + (hi - lo) / 2;

            if (key < a[mid]){
                hi = mid - 1;
            } 
            else if (key > a[mid]){
                lo = mid + 1;
            } 
            else{
                return mid; 
            }
        }

        return -1;
    }

#### Fixing 3-Sum by Sorting
- Sort the N distinct numbers.
- For each pair of numbers, binary serach for `-(a[i] + a[j])`.
- Instead of N^3, we get N^2 (N^2 for first 2 loops and binary search the 3rd term.)

## 45 - 1 - Theory of Algorithms (11_35).mp4

Best case: Lower bound on cost, determined by the "easiest" input (sorted array?).

Worst case: Upper bound on cost, determined by the "most difficult" input.

Average: "Expected" cost.

Approach 1: Design for the worst case. Approach 2: Randomize and depend on probabilistic guarantee.

#### Theory of Algos

Goals: Establish "difficulty" of a problem, then develop "optimal" algorithms.

Approach: Suppress details in analysis, and eliminate variability in input model by focusing on the worst case.

Optimal algorithm: We can guarantee within a constant factor for any input, and no algorithm can provide a faster guarantee.
