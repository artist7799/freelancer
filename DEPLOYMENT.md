# Aruna-Nand EdTech - Fullstack Setup & Deployment Guide

This guide walks you through setting up, running, and deploying the entire application (React/Vite Frontend, Node/Express Backend, and MongoDB Database) from starting to ending.

---

## Part 1: Local Development Setup (Starting to Ending)

### 1. Prerequisites
Ensure you have the following installed on your local computer:
* **Node.js** (v18.x or v20.x recommended)
* **npm** (comes packaged with Node.js)
* **MongoDB Community Server** (optional, if you want a local database instead of cloud)

---

### 2. Setting Up the Backend Server

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd d:/freelancer/backend
   ```
2. Install all backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/arunanandedtech
   JWT_SECRET=your_super_secret_dev_key_here
   JWT_REFRESH_SECRET=your_super_secret_refresh_dev_key_here
   CLIENT_URL=http://localhost:5173
   ```
4. Start your local MongoDB service (if using local MongoDB).
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The console should output: `MongoDB Connected: localhost` and `Server is running in development mode on port 5000`.*

---

### 3. Setting Up the Frontend (Vite) Server

1. Open a second terminal window and navigate to the project root directory:
   ```bash
   cd d:/freelancer
   ```
2. Install all frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the printed URL (usually `http://localhost:5173`).

---

## Part 2: Production Deployment (Starting to Ending)

To run the application in production, we deploy the **Database**, **Backend Server**, and **Frontend Client** separately.

---

### Step 1: Database Setup (MongoDB Atlas Cloud)
1. Register/Login at **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**.
2. Create a database cluster (choose the free **M0 tier**).
3. Under **Database Access**, create a user with a username and password.
4. Under **Network Access**, click **Add IP Address** -> select **Allow Access from Anywhere** (`0.0.0.0/0`) so cloud servers can connect.
5. In **Database** -> **Connect** -> **Drivers**, copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/arunanandedtech?retryWrites=true&w=majority
   ```

---

### Step 2: Deploying the Backend API (Render)
We will deploy the Node/Express backend on **[Render](https://render.com/)** (which has a free tier for web services).

1. Push your repository to **GitHub**.
2. Log in to Render and click **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   * **Name**: `arunanand-edtech-backend`
   * **Region**: Choose closest to your target audience.
   * **Branch**: `main`
   * **Root Directory**: `backend`
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
   * **Instance Type**: `Free`
5. Click **Advanced** -> **Add Environment Variables**:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production mode |
   | `PORT` | `10000` | Render default port |
   | `MONGODB_URI` | *[Your MongoDB Atlas URI from Step 1]* | Production database connection string |
   | `JWT_SECRET` | *[Any random secure string]* | Key used to sign JWT Access tokens |
   | `JWT_REFRESH_SECRET` | *[Any random secure string]* | Key used to sign JWT Refresh tokens |
   | `CLIENT_URL` | *[Your deployed Frontend URL]* | Example: `https://your-app.vercel.app` |

6. Click **Create Web Service**. Render will build and launch your backend API. Once ready, copy your API URL (e.g., `https://arunanand-edtech-backend.onrender.com`).

---

### Step 3: Deploying the Frontend (Vercel)
We will deploy the static compiled Vite assets on **[Vercel](https://vercel.com/)** for fast, edge-cached delivery.

1. Create a `vercel.json` file in the root folder of your project to handle React routing re-routes:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
2. Log in to Vercel and click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Configure settings:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `./` (leave blank)
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Add the following **Environment Variable**:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://arunanand-edtech-backend.onrender.com/api` | The URL of your deployed Render backend (with `/api` suffix) |

6. Click **Deploy**. Vercel will build your static files and give you a live URL (e.g. `https://your-app.vercel.app`).
7. **Crucial**: Go back to Render's backend environment variables, update the `CLIENT_URL` variable with your new Vercel URL, and trigger a redeploy of the backend. This configures CORS properly so your frontend is allowed to login and register.

---

## Part 3: Verification & Seeding

1. Open your live Vercel URL.
2. Since the Atlas MongoDB database starts empty, the backend's automatic database seeder will automatically insert all 20 default colleges, default courses, entrance exams, and news blogs on the first database connection.
3. Check the **Colleges** page: if the cards load and filters work, your database is successfully seeded and connected!
