## 8 - 1 - Dynamic Connectivity (10_22)

#### Steps to developing a usable algorithm
- Model the problem.
- Find an algorithm to solve it.
- Fast enough? Fits in memory?
- If not, figure out why.
- Find a way to address the problem.
- Iterate until satisfied.

This is the scientific approach. Mathematically, we model shit.

#### Dynamic connectivity
- Given a set of N objects.
- `Union` command to connect two objects.
- `Find`/`connected` query: Is there a path connecting the two objects?

      union(4, 3) # connect them
      connected(8, 9) # asks if they are connected

- We do not have the path. We just want to know if they are connected.

#### Modelling connections: We asssume is connected to is an equivalence.
- Reflexive
- Symmetric
- Transitive

Connected components: Maximal set of objects that are mutually connected.

#### Implementation
- Find query: Check if two objects are in the same component.
- Union: Replace components containing two objects with their union.

#### Union-find data type (API)
- Number of objects N can be huge.
- Number of operations M can be huge.
- Find queries and union commands may be intermixed.

Goal = design efficient data structure for union-find.

*`public class UF`*

`UF(int N)`: Initialize union-find data structure with N objects (0 to N - 1 ).

`void union(int p, int q)`: Add connection between p and q.

`boolean connected(int p, int q)`: Are p and q in the same component?

`int find(int p)`: Component identifier for p (0 to N - 1 ).

`int count()`: Number of components.

#### Dynamic-connectivity client
- Read in number of objects N from standard input.
- If they are not yet connected, connect them and print out pair.

## 14 - 1 - Quick Find (10_18)

Quick-find [eage approach]

- Data structure: Integer array id[] of size N.
- Interpretation: p and q are connected iff they have the same id.

Find: If they have the same id, they are connected.

Union: To merge components containing p and q, change all entries from `id[p]` tp `id[q]` (this is arbitrary.)

#### Java Implementation

    public class QuickFindUF{

> Data structure to store the ids in.

      private int[] id;

> Constructor: Initialize the array with values of the index.

      public QuickFindUF(int N){
         id = new int[N];
         for (int i = 0; i < N; i++){
            id[i] = i; 
         }

      }

> Check if they are connected or not.

      public boolean connected(int p, int q){ 
          return id[p] == id[q]; 
      }

> Find the id of the first (p), find the id of the second, go through the whole array and change every element with p to hold the value in q.

      public void union(int p, int q){
         int pid = id[p];
         int qid = id[q];

         for (int i = 0; i < id.length; i++){
            if (id[i] == pid) {
             id[i] = qid;
             } 
         }
         
      }
    }

#### Quick find is too slow.
- To find something, it takes just 1 operation. But to actaully union something, it takes N^2 time which is too slow.
- Quadratic algorithms do not scale, if you have a computer 

## 30 - 1 - Quick Union (7_50)

#### Quick Union (Lazy approach). We try not to do work unless we have to.

- Same data structure as q-f.
- *id[i] is parent of i.* If id[5] = 9, then the parent of 5 is 9.
- The root is the element that points to itself.

Find: Check if they have the same root.

Union: Set the id of p's root to the id of q's root, just change 1. *Remember that you become a child of the parent of the super super root*

    public class QuickUnionUF{
        private int[] id;

> Same constructor

        public QuickUnionUF(int N){
            id = new int[N];
            for (int i = 0; i < N; i++) {
                id[i] = i;
            }
        }

> Chase parent pointers until `i = id[i]`

        private int root(int i){
            while (i != id[i]){
                i = id[i];
              } 
            return i;
        }

> Check if roots are equal.

        public boolean connected(int p, int q){
            return root(p) == root(q);
        }
        
        public void union(int p, int q){
            int i = root(p);
            int j = root(q);
            id[i] = j;
        }
    }

No for loops :)

#### Q-U is also too slow...
- Q-F was too expensive to do a union.
- The worst case is the `find` because you can take N accesses (trees get too tall).

## 37 - 1 - Quick-Union Improvements (13_02)

#### Improvement 1: Weighting
- Modify quick-union to avoid tall trees. Keep track of the size of each tree.
- *Balance by linking the root of the samller tree to the root of the larger tree.*
- Arbitrary is the second merges to the first.

#### Java Implementation

Same data structure but we need an extra array (`sz[i]`) to count the number of objects in the tree rooted at i.

In union, we modify Q-U to link the root of the smaller tree to the root of the larger tree, and update the `sz` array.

    int i = root(p);
    int j = root(q);
    if (i == j) return;

    if (sz[i] < sz[j]) { 
        id[i] = j; sz[j] += sz[i]; 
    } else {
        id[j] = i; sz[i] += sz[j]; 
    } 

So both the `union` and the `connected` become log N.

#### Path compression

We make every node point to its grandparent, so that we make a conscious effort to make the tree as flat as possible.

    private int root(int i){
        while (i != id[i]){
            id[i] = id[id[i]]; #!!!!!
            i = id[i];
        }

        return i;
    }

The running time of weighted quick-union with path compression is linear in the real world. This is so close to being linear, in theory it is not, but in practice it sort of is.

#### Summary
 
Weighted quick union with path compression makes it possible to solve problems that could not otherwise be addressed.

Faster algorithm design, not computers, make solving things faster.

## Union-Find Applications

Percolation, Games (Go, Hex), Least common ancestor, equivalence of finite state automata...

#### Percolation
- N-by-N grid of sites.
- Each site is open with a probability p (or blocked with prob 1 - p).
- The system percolates iff top and bottom are connected by open sites.

Models: Electricity, fluid flow, social interactions.

The phase transition is around *0.593*. Below 0.593, it is almost sure to not percolate, above, it is almost sure to perculate.

We don't know the solution mathematically, we only know this computationally. This is why we need the quick-union, because this is the only way we can solve it.

#### How to check
- Create a virtual top and bottom site to not have N^2 comparisons.
- Opening a site means opening up different sites.
