# Impeccable-hub-portfolio-
# 🚀 Impeccable Hub Portfolio

A modern, dynamic portfolio website built with React, Vite, Tailwind CSS, and Supabase.

## ✨ Features

- 🎨 Beautiful comic-style design with notebook brown color scheme
- 🔄 Real-time data fetching from Supabase
- 📱 Fully responsive design
- 🔐 Admin panel for content management
- 🖼️ Image uploads and management
- 📧 Contact form with database storage
- 🎭 Smooth scroll animations
- 💼 Project showcase with live demo links
- 🛠️ Skills display with custom icons
- 📄 Resume PDF download

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/Impeccable-hub-portfolio.git
cd Impeccable-hub-portfolio
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_UID=your_admin_uid
VITE_ADMIN_PASSWORD=your_admin_password
VITE_WHATSAPP_NUMBER=your_whatsapp_number
VITE_EMAIL=your_email
```

4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

Your Supabase database should have these tables:

### Projects Table
```sql
CREATE TABLE projects (
  id BIGINT PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT,
  tech_stack TEXT[],
  link TEXT,
  created_at TIMESTAMP
);
```

### Skills Table
```sql
CREATE TABLE skills (
  id BIGINT PRIMARY KEY,
  name TEXT,
  level INTEGER,
  icon_url TEXT,
  created_at TIMESTAMP
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id BIGINT PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMP
);
```

### Storage Buckets

Create an `uploads` bucket with these folders:
- `profile/` - For profile photos
- `resume/` - For resume PDFs
- `projects/` - For project images
- `skills/` - For skill icons

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Content
- Update profile photo: Upload to `uploads/profile/providence-dp.jpg`
- Update resume: Upload to `uploads/resume/providence-resume.pdf`
- Add projects: Use admin panel or directly in Supabase
- Add skills: Use admin panel or directly in Supabase

## 🔐 Admin Panel

Access the admin panel by clicking the "Admin" button in the navbar.

**Default credentials:**
- Password: `providence2025` (change in `.env.local`)

### Admin Features:
- ✅ View all projects and skills
- ✅ Add new projects with images
- ✅ Edit existing content
- ✅ Delete items
- ✅ Upload images
- ✅ View contact messages

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel:**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables
- Deploy!

### Environment Variables on Vercel

Add these in your Vercel project settings:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_ADMIN_UID
VITE_ADMIN_PASSWORD
VITE_WHATSAPP_NUMBER
VITE_EMAIL
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👨‍💻 Author

**Providence**
- Full Stack Developer
- Web3 Enthusiast
- Tech Lover

---

Built with ❤️ using React, Vite, Tailwind CSS, and Supabase