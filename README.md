# InScripts React Spreadsheet Prototype

A static, front-end–only React app that mimics the InScripts intern assignment spreadsheet view.

## Tech Stack

- **React** (JavaScript)
- **Vite** (dev server & build)
- **Tailwind CSS** (utility-first styling)
- **Public JSON** (`/public/data.json`) for sample data

## Setup

1. **Clone the repo**
    - git clone https://github.com/your-username/inscripts-spreadsheet.git
    - cd inscripts-spreadsheet
2. **Install dependencies**
    - npm install
3. **Run locally**
    - npm run dev
    - Open http://localhost:5173 in your browser.

## Project Structure
    public/
      └─ data.json         # Sample spreadsheet data
    src/
      components/
        ├─ Toolbar.jsx     # Top action bar
        ├─ Tabs.jsx        # Bottom filter tabs
        ├─ Spinner.jsx     # Loading indicator
        └─ Spreadsheet.jsx # Main table with editing & navigation
      App.jsx              # Layout wrapper
      index.css            # Tailwind imports
      main.jsx             # React entry
    tailwind.config.js     # Custom colors & fonts

## Features
    Toolbar with “Hide fields”, “Sort”, “Filter”, “Cell view”, “Import”, “Export”, “Share”, “New Action”
    Editable cells: double‑click to edit, Enter or blur to save
    Keyboard navigation: arrow keys to move cell focus
    Status & Priority styling: color‑coded badges and text
    Filter tabs: “All Orders”, “Pending”, “Reviewed”, “Arrived”, “+”
    Responsive full‑window layout
    JSON data fetch with loading spinner

## Deployment
    We recommend deploying via Vercel:
    Push your repo to GitHub.
    Go to https://vercel.com/new, import the repo.
    Accept defaults and click Deploy.
    Share the live URL (e.g. https://inscripts-spreadsheet.vercel.app).
