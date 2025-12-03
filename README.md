# 🚀 React CV Website with SEO & AI Chat Widget

A modern, responsive CV/Portfolio website built with React, featuring SEO optimization and an interactive Gemini AI chat widget. Perfect for showcasing your professional profile with free GitHub Pages hosting.

![React](https://img.shields.io/badge/React-19.2.1-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222222?logo=github)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- 🤖 **AI Chat Widget** - Interactive Gemini AI assistant for visitor engagement
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized React build with code splitting
- 🌐 **Free Hosting** - Easy deployment to GitHub Pages
- 🎯 **Accessible** - Built with accessibility best practices

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [SEO Optimization](#seo-optimization)
- [Gemini AI Widget Setup](#gemini-ai-widget-setup)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Features Explained](#features-explained)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A GitHub account (for free hosting)

### Installation

1. **Clone or fork this repository**
   ```bash
   git clone https://github.com/yourusername/Sattaya-AI-Website.git
   cd Sattaya-AI-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Sattaya-AI-Website/
├── public/
│   ├── index.html          # Main HTML template
│   └── ...
├── src/
│   ├── App.js              # Main portfolio component
│   ├── App.css             # Global styles
│   ├── index.js            # React entry point
│   └── ...
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🎨 Customization

### 1. Update Personal Information

Edit `src/App.js` and modify:

- **Personal Details**: Name, title, location, contact info
- **Bio Section**: Your professional summary
- **Experience Data**: `experienceData` object (lines ~368-474)
- **Education Data**: `educationData` object (lines ~476-567)
- **Publications**: `allPublications` array (lines ~742-827)
- **Skills**: Update skill groups in the Skills section

### 2. Update Social Links

Find the social media links in the Hero section (around line 915) and footer (around line 1264):

```jsx
<a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
  <Github size={20} />
  <span>GitHub</span>
</a>
```

### 3. Customize Colors

Edit `tailwind.config.js` to change the color scheme. The current theme uses:
- Cyan (#06b6d4) - Primary accent
- Emerald (#10b981) - Secondary accent
- Slate (#0f172a) - Background

## 🔍 SEO Optimization

This project includes comprehensive SEO optimization:

### Meta Tags
- Title and description tags
- Open Graph tags for social media sharing
- Twitter Card tags
- Canonical URLs
- Keywords and author information

### Structured Data (JSON-LD)
- Person schema for Google Knowledge Graph
- Organization information
- Education and work history
- Social profiles

### Implementation

The SEO component is in `src/App.js` (lines 36-89). To enable it:

1. Uncomment the SEO component in the Portfolio component (line 839):
   ```jsx
   <SEO />
   ```

2. Update the SEO data:
   ```jsx
   const siteUrl = "https://yourusername.github.io/your-repo-name";
   const siteTitle = "Your Name - Your Title";
   const siteDescription = "Your professional description";
   ```

3. Update the JSON-LD schema data with your information (lines 42-67)

### Testing SEO

- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Check with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Validate with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 🤖 Gemini AI Widget Setup

The AI chat widget uses Google's Gemini API to answer questions about your CV.

### Setup Steps

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key

2. **Add API Key to Environment**
   
   **Option A: Environment Variable (Recommended for Production)**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
   
   Then update `src/App.js` line 132:
   ```jsx
   const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
   ```
   
   **Option B: Direct Configuration (For Testing)**
   
   Update `src/App.js` line 132:
   ```jsx
   const apiKey = "your_api_key_here";
   ```
   
   ⚠️ **Security Note**: Never commit API keys directly to GitHub. Use environment variables or GitHub Secrets.

3. **Customize the AI Context**
   
   Update the `RESUME_CONTEXT` constant (lines 93-128) with your information:
   ```jsx
   const RESUME_CONTEXT = `
   NAME: Your Name
   ROLE: Your Role
   ...
   `;
   ```

4. **Customize System Prompt**
   
   Modify the system prompt in `AIChatWidget` component (lines 196-202) to change how the AI responds.

### For GitHub Pages Deployment

Since GitHub Pages serves static files, you'll need to:

1. Use GitHub Secrets for API keys (if using GitHub Actions)
2. Or use a serverless function (Vercel, Netlify Functions) as a proxy
3. Or configure the API key through environment variables during build

## 🌐 Deployment to GitHub Pages

Deploy your CV website for free using GitHub Pages in just a few steps:

### Step 1: Update package.json

Ensure your `package.json` has the correct homepage URL:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

### Step 2: Install gh-pages

```bash
npm install --save-dev gh-pages
```

(Already included in this project)

### Step 3: Deploy

```bash
npm run deploy
```

This command will:
1. Build your React app (`npm run build`)
2. Deploy the `build` folder to the `gh-pages` branch
3. Make your site available at `https://yourusername.github.io/your-repo-name`

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select the `gh-pages` branch
4. Your site will be live in a few minutes!

### Alternative: Manual Deployment

If you prefer manual deployment:

```bash
npm run build
git checkout -b gh-pages
git add -f build
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Custom Domain (Optional)

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS settings with your domain provider
3. Update the `homepage` in `package.json` to your custom domain

## 📚 Features Explained

### 1. Responsive Navigation
- Sticky navbar that changes on scroll
- Mobile-friendly hamburger menu
- Smooth scroll to sections

### 2. Experience Timeline
- Tabbed interface (Full-Time, Contract, Internships)
- Visual timeline with company logos
- Achievement highlights and tags

### 3. Interactive Bio Rewriter
- AI-powered bio rewriting in different styles
- Options: Original, Recruiter Friendly, ELI5, Pirate, Poetic

### 4. Publications Section
- Expandable list of research papers
- Color-coded by journal/conference rank
- Links to Google Scholar

### 5. Skills Showcase
- Organized by categories
- Color-coded skill groups
- Hover effects

### 6. AI Chat Widget
- Floating chat button
- Context-aware responses about your CV
- Retry logic for API failures
- Loading states and animations

## 🛠️ Troubleshooting

### Build Errors

**Error: Cannot find module 'react-helmet'**
```bash
npm install react-helmet
```

**Error: Tailwind CSS not working**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### GitHub Pages Issues

**404 Error on GitHub Pages**
- Ensure `homepage` in `package.json` matches your repository URL
- Check that the `gh-pages` branch exists and contains the `build` folder
- Wait a few minutes after deployment for changes to propagate

**Styles not loading**
- Ensure all paths use relative URLs (not absolute)
- Check that CSS files are in the `build/static/css` folder

### Gemini API Issues

**API Key not working**
- Verify your API key is correct
- Check API quota limits in Google AI Studio
- Ensure the API key has proper permissions

**CORS Errors**
- The Gemini API should handle CORS, but if issues persist, consider using a proxy server

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Builds and deploys to GitHub Pages
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your own CV website built with this template

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- SEO with [React Helmet](https://github.com/nfl/react-helmet)
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the [Create React App documentation](https://create-react-app.dev/docs/getting-started)
- Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)

---

**Made with ❤️ for the developer community**

Happy coding! 🚀
