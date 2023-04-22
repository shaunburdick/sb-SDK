# SDK Design

Here are some of the items I'm hoping to provide in this SDK:

-   TS support with complete types
-   Both Node and Browser support
-   ECMA Module Support

After reading through the [documentation](https://the-one-api.dev/documentation) I am leaning on making a layered SDK.

### Layer 0

This is a very low level of convenience. It wraps the Fetch library, providing some helper functionality to handle
authentication and put up rails around query parameters for pagination and such

### Layer 1

This layer is your more standard Object oriented layer. I plan to encapsulate movies as objects, providing
structure and more typings. This also provides room for growth with related objects. (Ex movie -> quote)

### Layer 2

This is the main layer of the SDK. It provides factories and static methods to perform actions on the API, returning
Layer 1 Objects

## To-do/Notes

I spent a lot of time on this as I haven't created a new project from scratch in a while.
I wanted to try new things and used this exercise as an excuse to do so.

-   [tsup](https://tsup.egoist.dev/) - Not sure if I like this or not. I like that it bundles things well but I'm concerned about any consumer that relies on tree shaking to remove un-needed dependencies. Though my "barrel" design doesn't really lead to that either...
-   [typedoc](https://github.com/TypeStrong/TypeDoc) - This was nice but "looks" very much like auto-generated documentation. It's probably good enough to meet the bare minimum documentation expectations but I could do better if I wanted to spend more time
-   [Prettier](https://prettier.io/)/[ESLint](https://eslint.org/) - Why can't these two get along?! Configuring them is still annoying them after all this time. I had stopped using prettier but I missed it. This project cured me of that a little :-p I might try [dprint](https://dprint.dev/) some day.
-   Node is still annoying to try and support CJS and ESM. Lots of projects jumped to ESM to try and push it forward but I think that puts older projects in a weird spot.

Overall for a quick project I think it works well. I can see adding the rest of the endpoints easily and the overall "consumer" interface is clear. I still need to add support for the filtering the API provides but I've already spent plenty of time so I will leave that (for now ;-)
