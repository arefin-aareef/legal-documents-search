# Legal Document Search Portal

A modern web application for searching and analyzing legal documents with intelligent relevance scoring and summarization.

## Features

- **Intelligent Search**: Advanced search algorithm with relevance scoring
- **Document Summarization**: Automatic generation of search summaries
- **Responsive Design**: Fully responsive UI built with React and Tailwind CSS
- **Real-time Results**: Fast document retrieval and analysis
- **Clean Architecture**: Modular, maintainable code structure
- **RESTful API**: Well-structured backend with Express.js and MongoDB

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios for API calls
- Modern ES6+ JavaScript

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture

### Database
- MongoDB (3 hardcoded legal documents for demonstration)

## Project Structure

```
legal-documents-search/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── searchController.js
│   ├── models/
│   │   └── Document.js
│   ├── routes/
│   │   └── searchRoutes.js
│   ├── .env
│   ├── server.js
│   ├── seedDatabase.js
│   ├── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AutocompleteDropdown.jsx
│   │   │   ├── ClearButton.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── ResultsList.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   │   └── reportWebVitals.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
├── .gitignore
└── README.md
```

## Installation & Setup

### Option 1: Local Development

#### Step 1: Clone the Repository
```bash
git clone https://github.com/arefin-aareef/legal-documents-search.git
cd legal-documents-search
```

#### Step 2: Install MongoDB

Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

#### Step 3: Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://fineeforg_db_user:LzsdxFge6KzTBakd@cluster0.lqov6a2.mongodb.net/
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start backend server:
```bash
npm run dev
```

#### Step 4: Setup Frontend
```bash
cd ../frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
#REACT_APP_API_URL=https://legal-documents-search.onrender.com/api
```

Start frontend server:
```bash
npm start
```

The application will open at `http://localhost:3000`

#### Access the Application
- Frontend:
  http://localhost:3000
  https://legal-documents-search.vercel.app/
- Backend API:
  http://localhost:5000/api
  https://legal-documents-search.onrender.com/api

## API Documentation

### Base URL
```
http://localhost:5000/api
```

## Usage Guide

### Searching Documents

1. Enter search terms in the search bar (e.g., "lease agreement", "partnership")
2. Click the "Search" button or press Enter
3. View results with relevance scores and excerpts
4. Results are ranked by relevance (High, Medium, Low)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review troubleshooting section

## Author

https://www.linkedin.com/in/arefin-aareef
