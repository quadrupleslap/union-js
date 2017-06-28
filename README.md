# union

Tagged unions, **in vanilla JavaScript**.

## What's a tagged union?

Tagged unions are the idea that a thing can be one of many things, but you want to keep track of which of those things the thing is. They're simple and *really* useful.

## I definitely understood all of that. So, how does it work?

Well, let's go through an example with some variables that can hold either `Good` or `Bad` people, where:

- Good people have chocolate.
- Bad people have toast with a vegetable (one vegetable! :frowning:)

```javascript
// Define the things that a person can be.

let Person = new Union(['Good', 'Bad']);

// Make some people!

let alice = Person.Bad('burnt', 'broccoli');
let bob = Person.Good('lindt');

console.log(alice.toString()); // => Bad(burnt, broccoli)

// Good people go to heaven, bad people go to hell.

function afterlife(person) {
  // Note that match clauses can, but don't have to, return a value.
  
  return person.match({
    Good(chocolate) {
      return 'heaven';
    },
    Bad(toast, vegetable) {
      return 'hell';
    },
    _() {
      // A function named '_' catches every kind without its own clause,
      // which in this case is none of them.
      throw new Error('We can\'t get here!');
    }
  });
}

console.log(afterlife(alice)); // => hell
console.log(afterlife(bob)); // => heaven

// Oh, and did I mention that they can be serialized?

let bobInABox = JSON.stringify(bob);
let bobClone = Union.fromJSON(JSON.parse(bobInABox));

console.log(bobClone.toString()); // => Good(lindt)
```

## That's cool and all, but why's it useful again?

A result can either be successful or an error, trees are made of nodes and leaves, there are only half a dozen ways you can pay for something online. The (programming) world is full of discriminated unions! Without the proper abstraction, you end up with manually tagged unions, which are the worst kind, because you have to manually track what's actually in the object. Here, you can just `match` on it, and it's all rainbows and sunshine.

:rainbow: and :sunny:.
