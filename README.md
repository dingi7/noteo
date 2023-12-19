# App.tsx

This is the main App component that renders the different pages and routes using React Router.

**Key Components**:
- `BrowserRouter` - Provides the routing functionality
- `Routes` - Defines the routes and their corresponding page components
- `Route` - Each route renders a specific page component 

**Pages**:
- `HomePage` - The home page layout component
- `Login` - Login page 
- `Register` - Registration page
- `ProfilePage` - User profile page
- `CoursesCatalogPage` - Page listing all available courses
- `CoursePage` - Displays details of a specific course
- `PrivacyPolicyPage` - Privacy policy page
- `TermsOfServicePage` - Terms of service page

# HomePage.tsx

Defines the UI design for the home page.

**Components**:
- `HomePageDesign` - Renders the content of the home page
  - Title, description, call to action button
- `Footer` - Common footer component
- `Navbar` - Common navbar component  

# Course.tsx

Displays the details of a specific course.

**Features**:

- Gets course data from URL parameters 
- Fetches course details from hardcoded data file
- Displays course title, image, description etc
- Renders exam information
- Handles enroll button click

**Reused Components**:

- `Navbar` 
- `Footer`

# CourseCatalog.tsx

Displays a grid of available courses. 

**Features**:

- Fetches all courses data
- Search filtering of courses
- Displays course title, image, description etc
- Links each course to its details page

**Reused Components**:

- `Navbar`
- `Footer` 

# Profile.tsx

Shows details of logged in user.

**Features**:

- Displays user profile picture, name, bio
- Social media links
- Course progress stats
- Logout button

**Reused Components**:

- `Navbar` 
- `Footer`

# PrivacyPolicy.tsx 

Static page that displays privacy policy content.

**Reused Components**:

- `Navbar`
- `Footer`

# TermsOfService.tsx

Static page that displays terms of service content.

**Reused Components**:  

- `Navbar` 
- `Footer`

# layout.tsx

Root HomePage component that sets up the page layout

**Components**:  

- `HomePageDesign` - Renders actual home page content 
- `Navbar`  
- `Footer`

# footer.tsx

Common Footer component displayed across pages

**Features**:

- Displays logo
- Navigation links for legal pages  

# navbar.tsx 

Common Navigation Bar component displayed across pages  

**Features**:

- Logo
- Links to Home, Courses, Profile pages
- Auth Links: Login, Register

Let me know if you need any clarification or have additional files to document!