# CapTracker

In CapTracker, I utilized all the knowledge and skills I gained during my time at App Academy. It led me to become proficient in Flask and React, highlighting the significance of comprehensive documentation for fostering a productive development environment. 

[Live Site](https://captracker-t69u.onrender.com/)

## Installation

Follow the instructions below to set up and run this project locally on your machine.

### Cloning repo

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Martynodlrr/CapTracker.git && cd CapTracker/
    ```
    
### Backend Setup

1. **Set Up Virtual Environment with Pipenv:**
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

1. **Navigate to the Frontend Directory (react-app/):**
    ```bash
    cd react-app
    ```

2. **Environment Configuration:**

   Create a `.env` file in the `react-app` directory. Add the following line:
    ```
    REACT_APP_BASE_URL=http://localhost:5000
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
