# BizCards - Business Card Management Platform

![BizCards Logo](public/bizCardsLogo_full.svg)

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [User Guide](#user-guide)
- [User Roles & Permissions](#user-roles--permissions)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Design & Responsiveness](#design--responsiveness)
- [Contact](#contact)

---

## 🎯 About

**BizCards** is a comprehensive web application for creating, managing, and discovering business cards. The platform enables businesses to showcase their services through digital business cards while allowing users to browse, search, and save their favorite cards.

Built with React and TypeScript, BizCards provides a modern, responsive interface with full CRUD (Create, Read, Update, Delete) functionality, user authentication, and role-based access control.

### Project Goals
This project demonstrates:
- Building a full-stack web application with React and REST API integration
- Implementing secure authentication with JWT tokens
- Managing complex form validations
- Creating responsive, accessible user interfaces
- Following modern development best practices

---

## ✨ Features

- 🔍 **Browse & Search** - View all business cards and search by title, subtitle, description, city, or country
- 🌓 **Dark/Light Mode** - Toggle between dark and light themes for comfortable viewing
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- 🗺️ **Interactive Maps** - View business locations with integrated OpenStreetMap via Leaflet

### For Registered Users
- ❤️ **Favorites** - Save and manage your favorite business cards
- 👤 **User Profile** - View and edit your personal information
- 🔐 **Secure Authentication** - JWT-based authentication with localStorage persistence

### For Business Users
All registered user features, plus:
- ➕ **Create Cards** - Add new business cards with complete information
- ✏️ **Edit Cards** - Update your existing business cards
- 🗑️ **Delete Cards** - Remove cards you no longer need
- 📊 **My Cards** - Dedicated page to manage all your business cards

### For Admin Users
All registered user features, plus:
- 🗑️ **Delete Users** - Remove users from the system (except other admins)
- 🛡️ **Full Control** - Edit and delete any business card in the system

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **React Router DOM** - Client-side routing
- **Formik** - Form management
- **Yup** - Form validation
- **Axios** - HTTP client for API requests
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **SweetAlert2** - Beautiful alert modals
- **Leaflet** - Interactive maps
- **jwt-decode** - JWT token decoding

### Backend Integration
- RESTful API communication
- JWT authentication
- Environment variable configuration

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Access to the BizCards API server

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitkrivine/bizcards.git
   cd bizcards
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API=your_api_base_url
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`
   
   ---

## 📖 User Guide

### Getting Started

#### 1. **Registration**
- Navigate to the **Sign Up** page from the navigation bar
- Fill in all required fields (marked with *)
- **Password Requirements:**
  - Minimum 8 characters
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least four digits (0-9)
  - At least one special character (!@#$%^&*-_)
- Check "Signup as business" if you want to create business cards
- Submit the form to create your account

#### 2. **Login**
- Click **Login** in the navigation bar
- Enter your registered email and password
- Upon successful login, you'll be redirected to the home page
- Your authentication token is securely stored in localStorage

#### 3. **Browsing Cards**
- The home page displays all available business cards
- Use the **search bar** in the navigation to filter cards by:
  - Business name (title)
  - Subtitle
  - Description
  - City
  - Country
- Click on any card to view full details including an interactive map

#### 4. **Managing Favorites**
- Click the **heart icon** on any card to add/remove it from favorites
- Access your favorites from the **Favorites** link in the navigation
- Remove favorites by clicking the heart icon again

#### 5. **Creating Business Cards** (Business Users Only)
- Navigate to **My Cards**
- Click the **+ Add** button
- Fill in all required information:
  - Title, subtitle, description
  - Contact details (phone, email, website)
  - Address information
  - Image URL and alt text (optional)
- Submit to create your card

#### 6. **Editing Your Profile**
- Click your **profile icon** in the top right
- Select **Profile** from the dropdown
- Click **Edit** to modify your information
- Update your details and click **Update** to save changes

#### 7. **Logout**
- Click your profile icon
- Select **Log Out**
- Confirm in the popup dialog

---

## 🔌 API Integration

### Base URL
The API base URL is configured via the `REACT_APP_API` environment variable.

### Authentication
- All authenticated requests include the JWT token in headers:
  ```javascript
  headers: {
    "x-auth-token": "your_jwt_token_here"
  }
  ```

### Endpoints Used

#### User Endpoints
- `POST /users` - Register new user
- `POST /users/login` - User login
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user

#### Card Endpoints
- `GET /cards` - Get all cards
- `GET /cards/:id` - Get card by ID
- `POST /cards` - Create new card (business/admin)
- `PUT /cards/:id` - Update card (owner/admin)
- `PATCH /cards/:id` - Toggle favorite
- `DELETE /cards/:id` - Delete card (owner/admin)

---

## 📁 Project Structure

```
bizcards/
├── public/
│   ├── index.html          # Main HTML file (title & favicon)
│   └── bizCardsLogo_full.svg
├── src/
│   ├── components/         # React components
│   │   ├── About.tsx
│   │   ├── AddCard.tsx
│   │   ├── EditCard.tsx
│   │   ├── EditUser.tsx
│   │   ├── Footer.tsx
│   │   ├── Home.tsx
│   │   ├── LikedCards.tsx
│   │   ├── Login.tsx
│   │   ├── MyCards.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageNotFound.tsx
│   │   ├── Register.tsx
│   │   ├── Sandbox.tsx      # CRM page
│   │   ├── UserProfile.tsx
│   │   ├── ViewCard.tsx
│   │   └── ViewEditModal.tsx
│   ├── interfaces/         # TypeScript interfaces
│   │   ├── Card.ts
│   │   ├── Token.ts
│   │   └── User.ts
│   ├── services/           # API service functions
│   │   ├── CardService.ts
│   │   └── UserService.ts
│   ├── App.tsx             # Main app component with routing
│   ├── App.css             # Global styles
│   └── index.tsx           # Entry point
├── .env                    # Environment variables (not in repo)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 Design & Responsiveness

### Dark/Light Mode
- Toggle between themes using the sun/moon icon in the navigation bar
- Theme preference is maintained throughout the session
- All components adapt to the selected theme

### Responsive Breakpoints
- **Mobile:** < 768px (1 card per row)
- **Tablet:** 768px - 991px (3 cards per row)
- **Desktop:** ≥ 992px (4 cards per row)

### Accessibility Features
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- ARIA labels where appropriate
- Clear visual feedback for form validation

### Form Validation
- Real-time validation feedback
- Visual indicators (red border for errors)
- Error messages below each field
- Submit button disabled until form is valid
- Success/error alerts after submission

---

## 👨‍💻 Contact

**Developer:** Amit Krivine  
**Role:** Full-Stack Development Student  
**Email:** amitkrivine@gmail.com  
**GitHub:** [amitkrivine/bizcards](https://github.com/amitkrivine/bizcards)

---

## 📝 License

This project was created as part of a HackerU full-stack development course and is intended for educational purposes.

---

## 🙏 Acknowledgments

- Course instructors and mentors
- Leaflet and OpenStreetMap for map data
- Font Awesome for icons
- All open-source libraries used in this project

---

**Made with ❤️ by Amit Krivine**