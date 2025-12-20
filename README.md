# AI Resume Optimizer Frontend

This is the frontend for the AI Resume Optimizer application built with React, Vite, and shadcn UI.

## Features

- Modern, responsive UI with shadcn UI components
- Resume upload functionality
- Job description input
- Detailed analysis display with:
  - ATS score visualization
  - Suitability percentage
  - Identified mistakes
  - Suggested improvements
  - Missing skills
  - Important keywords
- Print-friendly report generation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn UI components
├── lib/                # Utility functions
├── pages/              # Page components
├── services/           # API service functions
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── theme.js            # Theme constants
```

## Available Components

- Button
- Card
- Textarea
- Label
- Alert
- Badge
- Progress

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Dependencies

- React 18
- React Router DOM
- shadcn UI
- Tailwind CSS
- Lucide React (icons)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Routing

- `/` - Home page with resume upload form
- `/analysis/:id` - Detailed analysis results page

## Styling

This project uses Tailwind CSS with a custom color palette defined in `src/index.css`. The design follows a clean, minimalist aesthetic with appropriate spacing and typography.