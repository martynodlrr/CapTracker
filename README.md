# CapTracker - Production README

## Brief Explanation
CapTracker is a full-stack web application that I developed to leverage my newly acquired coding skills after completing the [App Academy bootcamp](https://www.appacademy.io/) . The inspiration for this project stemmed from an observed issue with the existing 'Progress Tracker' on the platform. Many users expressed dissatisfaction with it, so I set out to modernize and improve the concept.

The primary objective of CapTracker is to enhance the way users share their final projects, often referred to as Capstones. Unlike the existing system, CapTracker aims to foster a community where developers can openly share their work, receive constructive feedback, and collaborate without the pressure of star ratings or rankings that might discourage participation in the early development stages.

## Live Site
You can access the live version of CapTracker [here](https://captracker-t69u.onrender.com/).

## Technologies Used
- **Frontend:**
  - React
  - Redux
  - JavaScript
  - CSS
  - Material UI

- **Backend:**
  - Flask (Python)
  - SQLalchemy

- **Database:**
  - SQLite3 (for development)
  - PostgreSQL (for production)

- **Cloud Hosting:**
  - AWS

- **Auth:**
  - Auth0

## Technical Features

### Feature 1: Material UI Integration
I integrated Material UI into CapTracker's frontend to provide a visually appealing and user-friendly interface. This integration streamlined UI development and significantly improved the user experience.

### Feature 2: Redux State Management
I implemented Redux to efficiently manage application data, ensuring a responsive user interface and providing future developers with a clear and organized state management solution.

## Challenges Faced and Solutions
- **Challenge:** Complex Data Management
  - **Solution:** I opted for PostgreSQL as my database, which allowed me to structure and retrieve data efficiently, ensuring a seamless user experience and making future development more scalable.

## Local Installation

Follow the instructions below to set up and run this project locally on your machine.

### Cloning repo

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Martynodlrr/CapTracker.git && cd CapTracker/
    ```

### Backend Setup

1. **Set Up Virtual Environment with Pipenv:**

      If you don't have it already install pip and pipenv with these bash commands:
      ```bash
      sudo apt-get install python3-pip && pip install pipenv
      ```

      If you already have these installed, procced with the next set of bash commands:
      ```bash
      pipenv install
      ```

3. **Environment Configuration:**

   Create a `.env` file in the root directory. Add the following variables:
    ```
    SECRET_KEY=your_secret_key
    DATABASE_URL=sqlite:///dev.db
    SCHEMA=your_schema
    S3_BUCKET=your_s3_bucket_name
    S3_KEY=your_s3_key
    S3_SECRET=your_s3_secret
    ```

    > Note: Replace placeholders (`your_secret_key`, `your_schema`, etc.) with appropriate values.

3. **Set Up Virtual Environment with Pipenv:**
    ```bash
    pipenv install
    ```

4. **Database Migration:**

    Initialize and update the database schema:
    ```bash
    pipenv run flask db migrate
    pipenv run flask db upgrade
    ```

5. **Seed Database:**

    To get the seed data, run:
    ```bash
    pipenv run flask seed all
    ```

6. **Start the Backend Server:**

    ```bash
    pipenv run flask run
    ```

    Your backend server should be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory (frontend/):**
    ```bash
    cd frontend
    ```

2. **Environment Configuration:**

   Create a `.env` file in the `frontend` directory. Add the following line:
    ```
    REACT_APP_BASE_URL=http://localhost:5000
    REACT_APP_AUTH0_DOMAIN=your_auth0_domain
    REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Start the Frontend Development Server:**
    ```bash
    npm start
    ```

   This will automatically open your default browser to `http://localhost:3000`, or you can manually navigate to it.

### Usage

After completing the setup, your application should be running with the frontend communicating with the backend. Navigate around and test out the features!

"Check the wiki for more in-depth site documentation"
