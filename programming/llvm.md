## What exactly is LLVM?
[Reference](https://stackoverflow.com/questions/2354725/what-exactly-is-llvm)

- LLVM is a library that is used to construct, optimize and produce intermediate and/or binary machine code.
- LLVM can be used as a compiler framework, where you provide the "front end" (parser and lexer) and the "back end" (code that converts LLVM's representation to actual machine code).
- LLVM can also act as a JIT compiler - it has support for x86/x86_64 and PPC/PPC64 assembly generation with fast code optimizations aimed for compilation speed.

- The LLVM project/infrastructure: This is an umbrella for several projects that, together, form a complete compiler: frontends, backends, optimizers, assemblers, linkers, libc++, compiler-rt, and a JIT engine. The word "LLVM" has this meaning, for example, in the following sentence: "LLVM is comprised of several projects".
- An LLVM-based compiler: This is a compiler built partially or completely with the LLVM infrastructure. For example, a compiler might use LLVM for the frontend and backend but use GCC and GNU system libraries to perform the final link. LLVM has this meaning in the following sentence, for example: "I used LLVM to compile C programs to a MIPS platform".
- LLVM libraries: This is the reusable code portion of the LLVM infrastructure. For example, LLVM has this meaning in the sentence: "My project uses LLVM to generate code through its Just-in-Time compilation framework".
- LLVM core: The optimizations that happen at the intermediate language level and the backend algorithms form the LLVM core where the project started. LLVM has this meaning in the following sentence: "LLVM and Clang are two different projects".
-require_relative The LLVM IR: This is the LLVM compiler intermediate representation. LLVM has this meaning when used in sentences such as "I built a frontend that translates my own language to LLVM".

- The Low Level Virtual Machine (LLVM) is a compiler infrastructure, written in C++, which is designed for compile-time, link-time, run-time, and "idle-time" optimization of programs written in arbitrary programming languages. Originally implemented for C/C++, the language-independent design (and the success) of LLVM has since spawned a wide variety of front-ends, including Objective C, Fortran, Ada, Haskell, Java bytecode, Python, Ruby, ActionScript, GLSL, and others.
