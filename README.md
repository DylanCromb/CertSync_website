# CertSync Website

A modern, responsive website for CertSync - a credential management platform that helps businesses and employees track, verify, and manage professional licenses, permits, and certifications.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations and gradients
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Multiple Pages**: Homepage, About, Pricing, Contact, Policies, and Login pages
- **Interactive Elements**: Smooth scrolling, hover effects, and dynamic animations
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured content
- **Performance Focused**: Optimized CSS and JavaScript for fast loading

## 📁 Project Structure

```
CertSync_website/
├── index.html              # Homepage
├── about.html              # About page
├── pricing.html            # Pricing page
├── contact.html            # Contact page
├── policies.html           # Policies page
├── login.html              # Login page
├── css/
│   ├── main.css            # Main styles and layout
│   ├── components.css      # Component-specific styles
│   └── responsive.css      # Mobile and responsive styles
├── js/
│   ├── main.js             # Main JavaScript functionality
│   ├── navigation.js       # Navigation and menu handling
│   └── animations.js       # Animation and visual effects
├── components/
│   ├── header.html         # Reusable header component
│   ├── footer.html         # Reusable footer component
│   └── navigation.html     # Navigation component
├── assets/
│   ├── images/             # Image assets
│   └── icons/              # Icon assets
├── netlify.toml            # Netlify configuration
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with classes and modules
- **Netlify**: Hosting and deployment platform

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Git (for version control)
- Netlify account (for deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CertSync_website
   ```

2. Open the project in your preferred code editor

3. Serve the files locally using a simple HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. Open your browser and navigate to `http://localhost:8000`

### Deployment to Netlify

#### Option 1: Drag and Drop
1. Zip the entire project folder
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the zip file to deploy

#### Option 2: Git Integration
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically deploy on every push

#### Option 3: Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod --dir .
   ```

## 📱 Pages Overview

### Homepage (`index.html`)
- Hero section with animated background
- Two-path section (Employees vs Employers)
- Features showcase
- Call-to-action buttons

### About (`about.html`)
- Company mission and story
- Values and principles
- Team information
- Why choose CertSync

### Pricing (`pricing.html`)
- Three-tier pricing structure
- Feature comparison table
- FAQ section
- Call-to-action buttons

### Contact (`contact.html`)
- Contact form with validation
- Company contact information
- FAQ section
- Support resources

### Policies (`policies.html`)
- Privacy Policy
- Terms of Service
- Cookie Policy
- Security Policy
- Data Processing Agreement

### Login (`login.html`)
- User authentication form
- Security features overview
- Account creation link

## 🎨 Customization

### Colors
The main color scheme is defined in CSS custom properties. Key colors:
- Primary Blue: `#2B7FE0`
- Secondary Purple: `#764ba2`
- Text Dark: `#1A1A1A`
- Background Light: `#F8F9FA`

### Fonts
The site uses system fonts for optimal performance:
- Primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif`

### Animations
Custom CSS animations and JavaScript effects are used throughout:
- Gradient background animations
- Particle effects
- Hover animations
- Scroll-triggered animations

## 📊 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Mobile First**: Responsive design with mobile-first approach
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Ready**: Proper meta tags and semantic HTML

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is proprietary software for CertSync. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: hello@certsync.com
- Website: [CertSync](https://certsync.com)
- Documentation: [Docs](https://docs.certsync.com)

## 🚀 Future Enhancements

- [ ] Add blog section
- [ ] Implement user dashboard
- [ ] Add more interactive features
- [ ] Integrate with backend API
- [ ] Add multi-language support
- [ ] Implement dark mode
- [ ] Add more animation effects
- [ ] Optimize for Core Web Vitals

---

**CertSync** - Simplifying credential management for businesses worldwide.
