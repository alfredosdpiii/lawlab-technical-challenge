# Lawlab Technical Challenge

## Requirements:

- [x] Next.js ( App Router ) with TS
- [x] Mantine UI
- [x] API integration
- [x] CRUD
- [x] Filter tasks in RSC belonging to 1 user
- [x] Testing
- [x] Authentication
- [x] Reusable component: TaskItem
- [x] Reusable component: TaskList
- [x] use git & private repo
- [x] make readme
- [x] ai integration

## Project structure:

- app/
  - \_actions - where we put server functions
  - \_components - where we put components by component name
    - \_components/componentName - this is where we put individual pieces that make up the component
  - \_providers - where we put providers like `react-query provider`
  - \_services - where we put service files
  - \_types - where we put types

### why prefix with \_ ?

- [source](https://nextjs.org/docs/app/building-your-application/routing/colocation)

## running the project:

- install dependencies with `yarn install` or just `yarn`

- run project:

```
yarn run dev
```

## Personal goals:

- I definitely want to overengineer this and use react-query to show optimistic updates
- "This feature could be a button that, when clicked, fetches a suggested task title." - this is too easy
  I want to use the new `toolCalling` feature [source](https://youtu.be/zsHYbiPQR98?si=wMGEAEO1yv-MS6cn)

## Assumptions

- Since the api does not accept data and just acts as if it's a real api:
- I can either store everything in `localStorage` and manipulate it there
- I'm going with the react-query route. I want to do optimistic updates. and
  use mutations with server functions
- Mantine ui - has "use client" on top of every file this means mantine will be hard to use
  in a pure server component for example: I was having a hard time with the `navbar` because
  it needed to be inside the `MantineProvider`

## AI tools used:

- Claude

### used for:

- Creating the Chat ui for `helpdesk` page
- I fed it mantine ui documentation and ask it regularly for help
- jest config
