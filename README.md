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
legal-search-portal/
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
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── ResultsList.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── start.sh
├── start.bat
└── README.md
```

## Prerequisites

### Option 1: Local Development
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Option 2: Docker
- Docker
- Docker Compose

## Installation & Setup

### Option 1: Local Development

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd legal-search-portal
```

#### Step 2: Install MongoDB
**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

#### Step 3: Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/legal_search
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
npm start
```

The application will open at `http://localhost:3000`

### Option 2: Using Docker

#### Step 1: Build and Run
```bash
docker-compose up --build
```

#### Step 2: Seed Database
In a new terminal:
```bash
docker exec -it legal_search_backend npm run seed
```

#### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Option 3: Using Startup Scripts

**For Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**For Windows:**
```bash
start.bat
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Search Documents
**POST** `/generate`

**Request Body:**
```json
{
  "query": "employment contract"
}
```

**Response:**
```json
{
  "success": true,
  "query": "employment contract",
  "results": [
    {
      "docId": "DOC001",
      "title": "Employment Contract Agreement - Tech Startup",
      "category": "Employment Law",
      "excerpt": "This Employment Agreement is entered into between TechCorp Inc...",
      "relevance": 0.85
    }
  ],
  "summary": "Found 1 document matching your query...",
  "processingTime": 0.023,
  "totalResults": 1
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Usage Guide

### Searching Documents

1. Enter search terms in the search bar (e.g., "lease agreement", "partnership")
2. Click the "Search" button or press Enter
3. View results with relevance scores and excerpts
4. Results are ranked by relevance (High, Medium, Low)

### Understanding Results

- **Relevance Score**: Percentage indicating how well the document matches your query
- **Category**: Type of legal document (Employment Law, Real Estate Law, Business Law)
- **Excerpt**: Most relevant section of the document based on your search
- **Processing Time**: How long the search took to complete

## Sample Documents

The system includes 3 pre-loaded legal documents:

1. **Employment Contract Agreement** - Tech startup employment terms
2. **Residential Lease Agreement** - California rental property lease
3. **Business Partnership Agreement** - Restaurant venture partnership

## Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Code Style
The project follows standard JavaScript/React conventions:
- ESLint for code linting
- Prettier for code formatting
- Functional components with hooks in React
- Async/await for asynchronous operations

### Adding New Documents

Edit `backend/seedDatabase.js` and add new documents to the `legalDocuments` array, then run:
```bash
npm run seed
```

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running: `sudo systemctl status mongodb`
- Check MongoDB URI in `.env` file
- Verify MongoDB is accessible on port 27017

**Port Already in Use:**
- Change PORT in `.env` file
- Kill process using port: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

### Frontend Issues

**API Connection Error:**
- Verify backend is running on port 5000
- Check CORS configuration in `backend/server.js`
- Ensure `REACT_APP_API_URL` is set correctly

**Build Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Docker Issues

**Container Won't Start:**
```bash
docker-compose down
docker-compose up --build
```

**Database Not Seeding:**
```bash
docker exec -it legal_search_backend npm run seed
```

## Performance Optimization

- Search operations are optimized with MongoDB text indexes
- Results are limited to top 3 most relevant documents
- Frontend implements debouncing for search input
- API responses include processing time metrics

## Security Considerations

- CORS is configured for localhost development
- Input validation on all API endpoints
- MongoDB injection prevention with Mongoose
- Error messages don't expose sensitive information

## Future Enhancements

- User authentication and authorization
- Document upload functionality
- Advanced filtering and sorting options
- Export search results to PDF
- Search history and saved searches
- Multi-language support
- Full-text highlighting in results

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review troubleshooting section

## Author

Created as a demonstration of modern full-stack development practices.

---

**Note**: This is a demonstration project with mock data. For production use, implement proper authentication, authorization, and data validation.