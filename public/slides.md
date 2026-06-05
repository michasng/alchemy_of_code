<!-- .slide: data-background-image="./title.png" data-background-opacity="0.3" -->

## The Alchemy of Code

### Turning Spaghetti into Gold

[Micha Sengotta](https://github.com/michasng)

---

<!-- .slide: data-background-image="https://static01.nyt.com/images/2023/10/25/multimedia/25nightmare-anniv-01-tfvj/25nightmare-anniv-01-tfvj-videoSixteenByNineJumbo1600.jpg" data-background-opacity="0.3" -->

## What's this?

## What's this?

Note:

- What <strong>is</strong> or <strong>isn't</strong> this talk about?
- take you along on my personal learning journey about how to write high quality software
- used to memorize software design patterns
- underlying principles are more important
- explain the most common and important principles in enough depth to apply them
- this isn't an exhaustive list
- not a talk about security principles or testing techniques
- I won't go into the obvious ones (DRY, KISS)
- focus on software development and OOP

---

## Paradigms

Note:

- What is a paradigm?

--

declarative\
imperative\
procedural\
functional\
object oriented\
event driven\
reactive\
meta\
generic\
...

--

## Declarative vs. Imperative

Good vs. bad?

Note:

- people talk about this a lot
- the common advice is to favor "declarative code over imperative code"
- people tend to use "declarative" as a synonym for "good"
- but is it really black-and-white?
- how do these paradigms relate to other paradigms?

--

### Grammatical moods

declarative / indicative facts

> It _is_ warm.

imperative commands

> _Do_ turn up the heat!

Note:

- Grammatical mood
  - DE: Modus
  - A feature of verbs to express "modality" / the attitude of the speaker toward what they are saying
- Declarative mood
  - DE: Indikativ, Wirklichkeitsform
  - to describe reality
  - neutral statements of fact
- Imperative mood
  - DE: Imperativ, Befehlsform
  - to give commands

--

### Declarative

```sql
SELECT name
FROM   people
WHERE  LENGTH(name) < 6;
```

### Imperative

```typescript
const shortNames: string[] = [];
for (let i = 0; i < people.length; i++) {
  if (people[i].name.length < 6) {
    shortNames.push(people[i].name);
  }
}
```

Note:

- so, in both cases we "declare" something
- declarative
  - declare the desired result, the data source and some constraints
  - we don't declare how it is computed
  - we don't care about control flow or state changes
- imperative
  - declare the specific control flow and state changes
  - we are aware that statements will be executed in a specific order every time
- this is what people mean, when they say
  - declarative describes "what"
  - imperative describes "how"

--

### 🥸 Man vs. Machine 🤖

Machine code / assembly is imperative:

> Move this data here.\
> Then add these values.

Humans can do both, but steps are often implied:

> I need coffee.\
> (boil water, grid beans, ...)

Note:

- Imperative is closer to machine language
  - so it's easier to debug the specific steps
  - and it allows for fine-grained optimizations
- Declarative has a higher level of abstraction
  - implementation details are hides,
  - making it more readable and maintainable, because there is less to worry about
- So it's definitely a trade-off, but in many use-cases, the benefits of declarative code outweigh the downsides.

--

<h2 class="fragment custom blur">Procedural (Imperative)</h2>

```typescript
function findShortNames(people: Person[]) {
  const shortNames: string[] = [];
  for (const person of people) {
    if (isShort(person.name)) {
      shortNames.push(person.name);
    }
  }
  return shortNames;
}
```

Note:

- What paradigm would it be, if I put imperative code in a function?
  - It's procedural programming
- Despite the "function" keyword, it's called procedural programming, not necessarily functional
- Sometimes they're called "procedures", other times "functions" or "subroutines"
- the essence is re-usable code that calls other re-usable code
  - at runtime, this is typically represented by a call stack
  - an entire program could be represented by a call tree
- a person in this example is a "record"
  - that's a combound data type, made up of a fixed set of fields
  - that's the procedural term for an object
  - so you don't necessarily need OOP in order to have something like an object, more on that later

--

## Functional (Declarative)

<!-- prettier-ignore -->
```typescript [|1,5|]
const isShort = (name: string) => name.length < 6;

const shortNames = people
  .map(person => person.name)
  .filter(isShort);
```

Note:

- Functional programming is similar to procedural programming, but without the imperative elements
- the program still forms a call tree
- there is no mutable state
- functions are "first-class citizens"
  - they can be assigned to variables, passed around as arguments and be returned by other functions
- relies on pure functions (also called "purely functional programming")
  - deterministic
    <!-- - the same arguments always leads to the same return value -->
  - no side-effects
    <!-- - the only thing it does is to determine the return value based on the arguments -->
    <!-- - it doesn't modify non-local variables or perform I/O operations -->
  - "same thing in, same thing out" and that's all it does
- functional programming eliminates the possibility of some **bugs**
and having no state makes it arguably easier to **debug** and **test** and
<!-- - roots in academia, comes from "lambda calculus", a system of computation based only on functions -->
- It's declarative in the sense that we don't explicitly state when and how the runtime iterates and when a condition executes.
- Of course, the runtime still has to these things.
- So, in the case of JavaScript, these array functions are not lazily evaluated.
  - `map` returns another array
  - So from a performance standpoint, it's not ideal that we `filter` after the entire array is mapped.
  - Ideally, the API would evaluate lazily and then the order of our declarations would make less of a difference.
  - because that's the point of declarative programming: To not have to think about the concrete steps

--

## Object Oriented (Mixed)

```typescript
class Group {
  constructor(private members: Person[]) {}

  getShortNames(): string[] {
    return this.members
      .filter((person) => person.hasShortName())
      .map((person) => person.name);
  }
}
```

Note:

- Object orientation divides a program into objects
- Objects expose data and behavior through defined interfaces
  - We call them "members"
  - The data is also called "fields", "attributes" or "properties"
  - And the behavior or functions are now called "methods"
- The difference to procedural programming is that data and behavior are no longer separate -> they are bundled in objects

---

<!-- .slide: data-background-image="https://static.vecteezy.com/system/resources/previews/056/884/821/non_2x/3d-ancient-greek-temple-with-columns-on-transparent-background-free-png.png" data-background-opacity="0.3" -->

## Four Pillars of OOP

Note:

- Every skyscraper starts with a solid base
- In software, we often build on sand and wonder why the roof leaks.
- In Germany we say: "Kranplätze müssen verdichtet sein!"
- So, when the object oriented paradigm emerged, people came up with features or "pillars" that a system should follow in order to call itself "object oriented".
- This is less about <strong>you</strong> than it is about the <strong>system</strong>.
- However, it's still important to understand how the system works in order for you to know how you should use it.

--

<!-- .slide: data-background-image="https://static.vecteezy.com/system/resources/previews/056/884/821/non_2x/3d-ancient-greek-temple-with-columns-on-transparent-background-free-png.png" data-background-opacity="0.1" -->

Encapsulation\
Abstraction\
Inheritance\
Polymorphism

Note:

In no particular order, these pillars are: ...
I'm sure you've heard of these before, but what do they actually mean?

--

<!-- .slide: data-background-image="https://static.vecteezy.com/system/resources/previews/056/884/821/non_2x/3d-ancient-greek-temple-with-columns-on-transparent-background-free-png.png" data-background-opacity="0.1" -->

### Encapsulation

#### Information hiding

⬆️ Cohesion ⬆️

⬇️ Coupling ⬇️

Note:

- "Encapsulation" or sometimes "Information Hiding"
- Several related concepts with fuzzy borders
- Idea:
  - Bundling related members in one unit (object),
    - Benefit of high cohesion: Things that belong together are in the same place
  - Restricting access to members through defined interfaces
    - Benefit of low coupling: Fewer interdependencies between modules
    - Theoretically unable to reach incorrect or inconsistent states at runtime

--

### Abstraction

abstrahere: to remove

```typescript
abstract class Animal {
  abstract speak(): string;
}
```

Note:

- The term abstraction comes from latin and apparently means "to draw away"
- It's typically used as viewing a concept or idea detached from specific instances or physical objects
- The real world is complex, but not all of this complexity is relevant to the goal of the software.
- Abstraction simplifies complexity by modeling only the essentials.
- Unnecessary details are disregarded.
- Thinking back to "declarative" and "imperative" paradigms:
  - Abstraction separates what something does from how it is implemented
  - A good example of that is an abstract class or an interface

--

### Inheritance

hierarchical reuse of code

Note:

- Hierarchical tree-structures that enable implementation sharing / code reuse
- Can be implemented via prototypes or classes
- Prototypes
  - Inheritance on the level of objects
  - An object can be linked to another object, called parent or prototype
  - Up to the "base" object, which has no prototype
    <!-- - Every object -->
      <!-- - Inherits the properties of it's prototype -->
      <!-- - Can define additional properties -->
    <!-- - Optional -->
      <!-- - Multiple inheritance allows having multiple prototypes -->
- Classes
  - Most common approach
  - Inheritance on the level of classes
  - Classes are templates / blueprints
  - Class instance = object
  - I'm sure you know the rest of it
    <!-- - Class member = attribute or method -->
    <!-- - (sub / child) classes can inherit / be derived from) other (super / parent / base) classes -->
    <!-- - An instance of a subclass is also a member of every super-class, sharing the same attributes and methods -->
    <!-- - Optional -->
      <!-- - Subclass members can override super-class members -->
      <!-- - Static members are class-specific instead of instance-specific -->
      <!-- - Multiple inheritance allows having multiple direct super-classes -->
      <!-- - Additional constructs like mixins, traits or interfaces -->
- What I want you to take away is that classes are not strictly necessary for inheritance, as long as hierarchical reuse of code is possible in some way

--

### Polymorphism

subtype\
ad hoc\
parametric\
coercion

Note:

- Polymorphism can mean many things
- People often get them confused
  - I often participate in our TNG interviews
  - Barely anyone really understands this
- In the context of OOP, we typically mean "subtype polymorphism"

--

### Subtype Polymorphism

```typescript
abstract class Animal {
  abstract speak(): string
}

class Dog extends Animal {
  override speak(): string {
    return "Woof!";
  }
}

class Cat extends Animal {
  ...
```

Note:

- AKA "inclusion polymorphism" or "method overriding"
- Using inheritance OR interfaces
- A reference to a super-type can refer to any derived type
- A subtype can provide a specific implementation for a method defined by its super-type
- Control flow is determined at runtime (AKA dynamic / late binding)
  - Based on the actual type of the object whose member is called (the type of "this" / "self")
  - The parameter and return types don't matter!
- Remember to apply the Liskov Substitution Principle (LSP)! (presented later)

--

### Other Polymorphism

#### Ad hoc (Overloading)

```typescript
class Dog {
  speak(): string;
  speak(times: number): string;
  speak(times?: number): string {
    if (times) return "Woof! ".repeat(times).trim();
    return "Woof!";
  }
}
```

#### Parametric (Generics)

```typescript
interface Factory<T> {
    T create()
}
```

#### Coercion (Weak Typing)

```javascript
"a" + 1; // "a1"
```

Note:

- Ad hoc polymorphism
  - A function can have multiple implementations with different signatures, specifically parameter types
  - AKA function or operator overloading
  - Control flow is typically determined at compile time (AKA static / early binding)
    - There are exceptions (interpreted languages, Julia, Common Lisp) where control flow is determined at runtime, based on the actual parameter types
  - TypeScript is forced to implement this in a weird way, because here you can overload signatures, but all of them share a single implementation
    - Other languages like Java allow you to have different signatures for the same method name
- Parametric polymorphism
  - Declarations using "generic" instead of "concrete" types
  - Abstract symbols that can substitute for any type
  - Generic programming (AKA "templates" in C++)
  - Typically checked at compile time
  - Different approaches, depending on the language
    - Monomorphization - compilation generates type-specific code (e.g. Rust, C++, C# at runtime for value types)
    - Type erasure - compilation discards type information or the runtime uses dynamic typing (e.g. Java using "Boxing" for value types, C# for reference types, TypeScript, Python)
- Coercion polymorphism
  - This happens when a language automatically converts a value from one type to another to match a function's requirements
  - AKA implicit type conversion or "weak" typing
  - Other example: Passing an int to a function expecting a float

---

## SOLID Principles

- Single Responsibility Principle (SRP)
- Open/Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)

---

## Design Principles

- Inversion of Control (IoC)
- Separation of Concerns (SoC)
- Law of Demeter (LoD) ?
  - principle of least knowledge
  - don't talk to strangers
- Command-Query Separation (CQS)
- Minimize Cyclomatic Complexity
  - less branching

---

## Noteworthy Mentions

--

## Testing

- "Testen Nicht Glauben" (TNG obviously)
- Shift Left: Early testing and security
- F.I.R.S.T. principles
  - Fast
  - Independent
  - Repeatable (deterministic)
  - Self-Validating (obvious success or failure)
  - Timely (e.g. Test Driven Development)

--

## Be Lazy

- You Aren't Gonna Need It (YAGNI)
- Don't reinvent the wheel
- Keep It Simple, Stupid (KISS)
- Make the change easy, then make the easy change

--

### Coding

- Principle of Least Astonishment (POLA)
- Don't Repeat Yourself (DRY)
- Write self-documenting code
- Boy Scout Rule: Leave the code cleaner
- Atomic changes (commits / pull requests)

---

## Sources

- _Clean Code_ - Robert C. Martin
- _Design Patterns_ - Erich Gamma et al.
- _Refactoring_ - Martin Fowler

```

```
