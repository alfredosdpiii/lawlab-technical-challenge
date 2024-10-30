# Lawlab Technical Challenge

## Requirements:
- [ ] Next.js ( App Router ) with TS
- [ ] Mantine UI
- [ ] API integration
- [ ] CRUD
- [ ] Filter tasks in RSC belonging to 1 user
- [ ] Testing
- [ ] Authentication
- [ ] Reusable component: TaskItem
- [ ] Reusable component: TaskList
- [ ] use git & private repo
- [ ] make readme
- [ ] ai integration

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
