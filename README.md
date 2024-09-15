## Reservation Scheduler 🍉🍈

A web application where users can search for and book reservations for melon tastings.

#### User flow:

A user logs in, picks a date, chooses a date and time range (optional), be shown all the available reservations that meet the criteria, then book an appointment of their choice. If there are no reservations available, a message will be displayed indicating that. There is a page showing all reservations for a given user.

#### Restrictions:

- all reservations must start and end on the hour or half hour
- all reservations are exactly 30 minutes long
- a user can only have 1 reservation on a calendar date (#tooMuchMelon)
  - If these conditions cannot be met (for example the user has already booked an appointment on the chosen date), there will be an error message indicating that

#### Wireframe
![wireframe](https://github.com/user-attachments/assets/775e5f23-43ad-438c-bb44-a789d31154af)
#### Data Model
![melon-tastings](https://github.com/user-attachments/assets/09dbdbf6-c35c-4835-96d0-5389cb365f9c)
