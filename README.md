# Chess AI Game

## Overview
This project is a chess game that features an AI opponent. The game allows users to play chess against a computer, utilizing an AI that calculates optimal moves based on the current game state.

## Project Structure
```
chess-ai-game
├── src
│   ├── ai
│   │   └── ai.ts          # AI logic for the opponent
│   ├── game
│   │   └── chess.ts       # Game state management
│   ├── ui
│   │   └── board.ts       # User interface for the chessboard
│   └── index.ts           # Entry point of the application
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd chess-ai-game
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Compile the TypeScript files:
   ```
   npm run build
   ```
5. Start the game:
   ```
   npm start
   ```

## Gameplay
- The user plays as one side of the chessboard while the AI controls the other.
- The game follows standard chess rules.
- The AI opponent calculates its moves based on the current state of the game, providing a challenging experience.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.