# Chess Tournament Platform - User Guide

Welcome to the Chess Tournament Platform! This guide will help you navigate and use all the features of the platform.

## Table of Contents

1. [Installation Guide](#installation-guide)
2. [Getting Started](#getting-started)
3. [Creating an Account](#creating-an-account)
4. [Browsing Tournaments](#browsing-tournaments)
5. [Creating a Tournament](#creating-a-tournament)
6. [Joining Tournaments](#joining-tournaments)
7. [Spectating Tournaments](#spectating-tournaments)
8. [Managing Your Tournaments](#managing-your-tournaments)
9. [Direct Messaging](#direct-messaging)
10. [Account Settings](#account-settings)
11. [Tournament Formats and Time Controls](#tournament-formats-and-time-controls)

---

## Instalation Guide

To install the Chess Tournament Mangement system you have to do an npm install to download node modules. Then install Docker Desktop and MongoDB for your database. Then make sure Docker is open and mongoDB is running then do a npm run dev on both the backend and the main file.

## Getting Started

The Chess Tournament Platform is a community hub for organizing and participating in competitive chess tournaments. Whether you want to organize your own tournament or join exciting competitions, this platform has everything you need.

### Main Features

- Browse and join chess tournaments
- Create and organize your own tournaments
- Join as a spectator to watch tournaments
- Direct messaging with other players
- Filter and sort tournaments
- Real-time countdown to tournament starts
- Track your registrations and organized tournaments

---

## Creating an Account

### Signup Process

1. Click the **Signup** link in the navigation header
2. Enter your desired username
3. Create a secure password
4. Confirm your password
5. Click **Sign Up** to create your account

### Logging In

1. Click the **Login** link in the navigation header
2. Enter your username
3. Enter your password
4. Click **Log In**

You'll be automatically redirected to the tournaments page once logged in.

---

## Browsing Tournaments

The home page displays all available chess tournaments.

### Viewing Tournaments

Each tournament card shows:
- Tournament name
- Organizer
- Start time and countdown
- Status (Registration Open, Upcoming, Ongoing, Completed, Cancelled)
- Number of participants and available slots
- Format and time control
- Location and venue (if specified)

### Filtering Tournaments

Use the **Filter by Organizer** field to view tournaments organized by a specific user:
1. Enter the username of the organizer
2. The list will automatically update to show only their tournaments

### Sorting Tournaments

You can sort tournaments by:
- **Start Time** - When the tournament begins
- **Name** - Alphabetically by tournament name
- **Created At** - When the tournament was posted

Toggle between **Ascending** and **Descending** order using the arrow button.

---

## Creating a Tournament

To create a tournament, you must be logged in.

### Tournament Creation Form

1. Scroll to the **Create Tournament** section on the home page
2. Fill in the required fields:

#### Required Fields
- **Tournament Name** - Give your tournament a descriptive name
- **Tournament Start** - Date and time when the tournament begins

#### Optional Fields
- **Tournament Description** - Describe what makes your tournament special
- **Rules & Regulations** - Specify any special rules or requirements
- **Tournament Format** - Choose from:
  - Swiss
  - Round Robin
  - Knockout
  - Double Elimination
- **Time Control** - Select the time format:
  - Bullet
  - Blitz (default)
  - Rapid
  - Classical
  - Correspondence
- **Location** - City, State where the tournament is held
- **Venue** - Specific venue name or address
- **Max Participants** - Maximum number of players (default: 32)
- **Number of Rounds** - How many rounds will be played (default: 5)
- **Registration Deadline** - Last date/time to register (must be before start time)
- **Tournament End** - When the tournament is expected to finish

3. Click **Create Tournament** to publish your tournament

### Tournament Validation

- End time must be after start time
- Registration deadline must be before start time
- Maximum participants must be at least 2
- Number of rounds must be at least 1

---

## Joining Tournaments

### Viewing Tournament Details

Click on any tournament card to view full details including:
- Complete tournament information
- List of registered participants with registration times
- List of spectators
- Organizer contact information
- Countdown timer to tournament start

### Registering for a Tournament

To register as a participant:

1. Click on a tournament to view its details
2. Ensure you're logged in
3. Check that registration is still open
4. Verify there are available slots
5. Click the **Register for Tournament** button

#### Registration Requirements

- You must be logged in
- Tournament status must be "Registration Open"
- Registration deadline must not have passed
- Tournament must not be full
- You cannot be already registered

### Withdrawing from a Tournament

If you need to withdraw:

1. Go to the tournament detail page
2. Click the **Withdraw** button
3. Confirm your withdrawal

**Note:** You cannot withdraw from ongoing or completed tournaments.

### Managing Your Registrations

View all tournaments you've registered for:
1. Click **My Registrations** in the navigation header
2. See a complete list of tournaments you're participating in
3. Click any tournament to view details or withdraw

---

## Spectating Tournaments

Want to watch a tournament without participating? Join as a spectator!

### Joining as a Spectator

1. Navigate to any tournament detail page
2. Click the **Join as Spectator** button (gray button below the registration button)
3. You'll be added to the spectators list

### Spectator Benefits

- Watch the tournament without taking a participant slot
- Join even when the tournament is full
- Stay updated on tournament progress
- Connect with other spectators

### Leaving Spectators

1. Go to the tournament detail page
2. Click the **Leave Spectators** button
3. You'll be removed from the spectators list

### Spectator vs Participant

- Spectators don't compete in the tournament
- Spectators can join even when participant slots are full
- Participants cannot also be spectators (and vice versa)
- Spectators are listed separately from participants

---

## Managing Your Tournaments

### Viewing Your Organized Tournaments

1. Click **My Tournaments** in the navigation header
2. View all tournaments you've created
3. Click on any tournament to see details and manage it

### Tournament Status Types

- **REGISTRATION_OPEN** - Players can still register
- **UPCOMING** - Registration closed, waiting to start
- **ONGOING** - Tournament currently in progress
- **COMPLETED** - Tournament has finished
- **CANCELLED** - Tournament was cancelled

### Managing Participants

As an organizer, you can:
- View all registered participants
- See when each participant registered
- View all spectators and when they joined
- Contact participants via direct message

---

## Direct Messaging

### Starting a Conversation

1. Navigate to any tournament detail page
2. Click **Contact Organizer** to message the tournament organizer
3. Or click on any user's profile to message them directly

### Using the Inbox

Access your messages:
1. Click **Inbox** in the navigation header
2. View all your active conversations
3. Click on a conversation to open the chat
4. Type your message and send

### Messaging Features

- Real-time messaging with Socket.IO
- See message history
- Receive messages from other users
- Multiple conversations organized in one inbox

---

## Account Settings

### Accessing Settings

Click **Settings** in the navigation header to manage your account.

### Updating Your Credentials

To change your username or password:

1. Enter your **current password** (required for any changes)
2. Enter a new username (optional)
3. Enter a new password (optional)
4. Click **Save Changes**

### Deleting Your Account

**Warning:** This action cannot be undone!

To delete your account:
1. Scroll to the **Danger Zone** section
2. Click **Delete My Account**
3. Confirm the deletion

This will permanently:
- Delete your account
- Remove all your tournaments
- Delete all your posts
- Remove your registrations

---

## Tournament Formats and Time Controls

### Tournament Formats

**Swiss System**
- Players with similar scores are paired
- No elimination
- Everyone plays all rounds
- Best for large tournaments

**Round Robin**
- Every player plays every other player
- No elimination
- Best for smaller tournaments
- Determines clear rankings

**Knockout**
- Single elimination
- Lose once, you're out
- Fast-paced tournament
- Good for time-limited events

**Double Elimination**
- Lose twice to be eliminated
- Winners and losers brackets
- More forgiving than knockout
- Determines clear winner and runner-up

### Time Controls

**Bullet**
- Very fast games
- Typically under 3 minutes per player
- High-pressure, fast-thinking

**Blitz**
- Fast-paced games
- Usually 3-5 minutes per player
- Quick tactical play

**Rapid**
- Medium-speed games
- Typically 10-25 minutes per player
- Balance of speed and strategy

**Classical**
- Standard chess format
- 40+ minutes per player
- Deep strategic play
- Tournament standard

**Correspondence**
- Days per move
- Play by mail or online
- Deep analysis allowed
- Long-term tournaments

---

## Tips for Success

### For Tournament Organizers

1. **Be Clear** - Provide detailed descriptions and rules
2. **Set Reasonable Deadlines** - Give players time to register
3. **Choose the Right Format** - Match format to expected player count
4. **Specify Location Details** - Make it easy for players to find you
5. **Respond to Messages** - Be available for player questions

### For Participants

1. **Read the Rules** - Understand tournament requirements before registering
2. **Register Early** - Don't wait until the last minute
3. **Check the Time** - Note the start time and set reminders
4. **Respect Deadlines** - Withdraw early if you can't make it
5. **Contact Organizers** - Ask questions if anything is unclear

### For Spectators

1. **Join Early** - Get a spot before the tournament fills up
2. **Respect Players** - Remember, they're competing
3. **Engage with Community** - Connect with other chess enthusiasts
4. **Learn** - Watch and improve your own game

---

## Troubleshooting

### Can't Register for a Tournament?

Check if:
- You're logged in
- Registration is still open
- The tournament isn't full
- Registration deadline hasn't passed
- You're not already registered

### Tournament Not Showing?

Try:
- Clearing any filters
- Refreshing the page
- Checking your internet connection
- Making sure you're on the correct page

### Messages Not Sending?

- Check your internet connection
- Refresh the page
- Log out and log back in
- Try again in a few moments

### Account Issues?

- Ensure you're using the correct username and password
- Try resetting your password through settings
- Contact support if issues persist

---

## Need Help?

If you encounter any issues or have questions:
- Contact tournament organizers directly via direct message
- Check this guide for answers
- Reach out to the community for support

---

## Quick Reference

| Action | Navigation Path |
|--------|----------------|
| Browse tournaments | Home page (/) |
| Create tournament | Home page > Create Tournament section |
| View your organized tournaments | My Tournaments |
| View your registrations | My Registrations |
| Message someone | Tournament Detail > Contact Organizer |
| Check messages | Inbox |
| Update account | Settings |
| Join tournament | Tournament Detail > Register for Tournament |
| Spectate tournament | Tournament Detail > Join as Spectator |

---

**Happy Chess Playing!**

Join tournaments, compete with players worldwide, and enjoy the game of chess!
