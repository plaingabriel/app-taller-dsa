# GoalFlow - Tournament Management System

GoalFlow is a comprehensive platform for organizing and tracking football tournaments. It manages everything from tournament creation to complete results tracking and statistics.

## 🚀 Key Features

### Complete Tournament Management

- **Tournament Creation**: Complete system to create and configure tournaments with multiple categories
- **Competition Formats**: Support for group tournaments, direct elimination, or mixed format (groups + elimination)
- **Team and Player Management**: Bulk upload of teams and players via Excel files
- **Automatic Fixture Generation**: Smart algorithms to generate match calendars

### Role-Based Permission System

- **Administrator**: Full system control, user and tournament management
- **Editor**: Calendar management and match date/time assignment
- **Operator**: Match results loading and scorer management

### Advanced Features

- **Data Validation**: Robust validation system for teams and players
- **Real-time Tracking**: Visualization of results, standings tables, and statistics
- **Public View**: Public interface for fans to follow tournaments
- **Scorer Management**: Automatic tracking of goals per player

## 🏗️ System Architecture

### Core Sections

#### 1. **Authentication and User Management**

- Login system with differentiated roles
- User management by administrator

#### 2. **Administration Panel**

- Complete tournament management
- System user administration
- Category and competition format configuration

#### 3. **Editor Panel**

- **Calendar Management**: Assignment of dates and times to matches
- **Results Management**: Supervision of results loading process

#### 4. **Operator Panel**

- Match results loading
- Scorer information management
- Match data validation

#### 5. **Public View**

- Active tournament visualization
- Fixture and results consultation
- Standings tables and statistics
- Historical information and documentation

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Static typing for greater robustness
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern and accessible UI components
- **Lucide React** - Consistent iconography

### Data Management

- **SQLite** - Relational database easy to set up
- **Drizzle ORM** - Make db queries with typescript

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Automatic code formatting

## 📋 Supported Competition Formats

### 1. **Groups (GRUPOS)**

- League system where everyone plays against everyone
- Classification by points, goal difference, and goals scored

### 2. **Direct Elimination (ELIMINATORIA)**

- Direct elimination system
- Support for round of 16, quarterfinals, semifinals, and final

### 3. **Groups + Elimination (GRUPOS+ELIMINATORIA)**

- Initial group phase followed by elimination rounds
- Flexible configurations based on number of teams
- Smart cross-group matchups

## 🚀 Available Scripts

### Development

```bash
pnpm dev
# Starts the development server at http://localhost:3000
```

### Build

```bash
pnpm build
# Builds the application for production
```

### Production Start

```bash
pnpm start
# Starts the application in production mode
```

### Linting

```bash
pnpm lint
# Runs ESLint to check code quality
```

## 🎯 Main Use Cases

### For Administrators

1. **Create Tournaments**: Configure new tournaments with multiple categories
2. **Manage Users**: Create and administer editor and operator accounts
3. **Load Teams**: Import teams and players from Excel files
4. **Generate Fixtures**: Create match calendars automatically

### For Editors

1. **Assign Calendars**: Set dates and times for matches
2. **Supervise Results**: Monitor the results loading process

### For Operators

1. **Load Results**: Enter match results and scorers
2. **Validate Data**: Ensure accuracy of entered information

### For the Public

1. **Check Tournaments**: View active tournament information
2. **Follow Results**: Check fixtures, results, and tables
3. **View Statistics**: Access scorer and team information

## 🔧 Setup and Installation

### Prerequisites

- Node.js 18+
- pnpm

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/plaingabriel/app-taller-dsa.git
    cd app-taller-dsa
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure the Database:**

    - Create a folder called `db` in the root of the project

    - Pull the database:
      ```bash
      pnpm drizzle-kit push
      ```
    - The app requires an admin, so you need to create one:

      1. Open the database
         ```bash
         pnpm drizzle-studio
         ```
      2. Open https://local.drizzle.studio
      3. Go to "Users" table and add a new user. Make sure to:
         - The password is a 8 length string
         - The role is admin

4.  **Add environment variable:**

    To use the login feature, you need to set a environment variable that will be the session secret. Here is an example:

    ```env
    SESSION_SECRET=whatever-string-you-want
    ```

    The value can be any string, but the variable must be `SESSION_SECRET`

5.  **Run the app:**

    Run:

    ```bash
    pnpm dev
    ```
