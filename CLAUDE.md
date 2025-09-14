# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` or `expo start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version
- `npm test` - Run Jest tests with watch mode
- `npm run lint` - Run Expo linting
- `npm run reset-project` - Reset to blank project template

### Testing
- Uses Jest with `jest-expo` preset
- Run `npm test` for watch mode testing
- Test files should follow Jest conventions

## Project Architecture

### Tech Stack
- **Framework**: React Native with Expo SDK 52
- **Routing**: Expo Router with file-based routing and typed routes
- **Authentication**: Firebase Auth with Google Sign-In
- **Database**: Firebase Firestore
- **AI Integration**: Google Gemini 2.0 Flash via `@google/generative-ai`
- **State Management**: React Context (AuthContext, CreateTripContext)
- **Maps**: Google Maps integration via React Native Google Places Autocomplete

### Project Structure
```
app/                    # File-based routing (Expo Router)
├── (tabs)/            # Tab navigation layout
│   ├── Discover.tsx   # Discover tab screen
│   ├── MyTrip.tsx     # My trips screen
│   └── Profile.tsx    # User profile screen
├── auth/              # Authentication screens
├── create-trip/       # Trip creation flow
├── trip-details/      # Trip details screens
├── _layout.tsx        # Root layout with context providers
└── index.tsx          # Entry point

components/            # Reusable UI components
├── CreateTrip/        # Trip creation specific components
├── MyTrips/          # Trip management components
├── TripDetails/      # Trip detail components
└── Login.tsx         # Login component

configs/              # Configuration files
├── AiModel.ts        # Gemini AI model configuration
├── AuthContext.tsx   # Firebase Auth context provider
└── FirebaseConfig.ts # Firebase configuration

context/              # React contexts
└── CreateTripContext.ts # Trip creation state management

constants/            # App constants
├── Colors.ts         # Color definitions
└── Options.ts        # App-wide options and configurations
```

### Key Architecture Patterns

#### Context-Based State Management
- `AuthProvider` wraps the entire app for authentication state
- `CreateTripContext` manages trip creation flow state
- State flows from root layout through component tree

#### AI-Powered Trip Planning
- Gemini AI generates comprehensive travel plans in JSON format
- Pre-configured with example prompts for consistent responses
- Includes flights, hotels, attractions, and detailed itineraries

#### Firebase Integration
- Authentication with Google Sign-In provider
- Firestore for data persistence
- React Native persistence with AsyncStorage

#### File-Based Routing
- Expo Router with TypeScript support (`typedRoutes: true`)
- Tab-based navigation for main screens
- Stack navigation for detailed flows

### Environment Configuration
- Uses `.env.development` for environment variables
- Copy `.env.example` to `.env.development` and fill in your values
- Required environment variables:
  - `EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY` - Gemini AI API key
  - `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key

**Security Note:** Never commit `.env.*` files or `google-services.json` to version control!

### Build Configuration
- EAS Build configured for development, preview, and production
- Google Services configuration for Android (`google-services.json`)
- Custom fonts (Outfit family) loaded in root layout

### Development Notes
- TypeScript strict mode enabled
- Uses `@/*` path aliases for imports
- Expo new architecture enabled (`newArchEnabled: true`)
- Custom package manager: Yarn 1.22.22