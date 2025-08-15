# ⭐ Star Wars Galaxy Explorer

## 🚀 [![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here%20%E2%86%92-yellow?style=for-the-badge&logo=starship)](https://alexbuzea.github.io/star_wars_galaxy_explorer_app/)

A responsive and interactive React application that allows users to explore the Star Wars universe using the [SWAPI (Star Wars API)](https://swapi.dev/). Navigate through characters, planets, species, starships, vehicles, and films from a galaxy far, far away.

## ✨ Features

### 🚀 Core Functionality
- **Comprehensive Data Access**: Fetch and display data from SWAPI for all resource types
- **Intuitive Navigation**: Seamless navigation between different Star Wars resources
- **Detailed Information**: View comprehensive details for each item (character bios, planet stats, etc.)
- **Smart Pagination**: Infinite scrolling for smooth browsing experience

### 🎨 Interface & UX
- **Star Wars Themed Design**: Classic dark theme with signature yellow accents
- **Responsive Layout**: Optimized for all screen sizes from mobile to desktop
- **Loading States**: Engaging loading animations and error handling
- **Smooth Animations**: CSS transitions and hover effects for enhanced UX

### 🔍 Advanced Features
- **Global Search**: Search across all resource types simultaneously
- **Advanced Filtering**: Filter results by multiple criteria for each resource type
- **Related Resources**: Navigate between related items (e.g., character's homeworld, films)
- **Smart Routing**: Deep linking to specific resources with React Router

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** with TypeScript for type-safe development
- **Vite** for fast development and building
- **React Router** for client-side routing

### State Management
- **Redux Toolkit** for global state management
- **React Query** for server state management and caching

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **Custom Star Wars Theme** with signature colors and fonts
- **Lucide React** for consistent iconography
- **Responsive Design** principles

### Testing
- **Vitest** for unit and integration testing
- **React Testing Library** for component testing
- **Jest DOM** for enhanced assertions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd star_wars_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Filters/         # Filtering components
│   ├── Layout/          # Layout components (Header, Sidebar)
│   ├── ResourceDetails/ # Detail view components
│   ├── ResourceList/    # List and card components
│   ├── Search/          # Search functionality
│   └── UI/              # Basic UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── pages/               # Page components
├── store/               # Redux store and slices
├── test/                # Test utilities and setup
└── types/               # TypeScript type definitions
```

## 🎯 Architecture Decisions

### State Management Strategy
- **Redux Toolkit** for UI state (filters, sidebar, notifications)
- **React Query** for server state (API data, caching, loading states)
- **Separation of Concerns**: Different tools for different types of state

### Data Fetching Strategy
- **React Query** for:
  - Automatic caching and background updates
  - Optimistic updates and error handling
  - Infinite scrolling pagination
  - Related resource fetching

### Component Architecture
- **Compound Components** for complex UI patterns
- **Custom Hooks** for business logic abstraction
- **TypeScript Interfaces** for type safety
- **Reusable Components** for consistency

### Styling Approach
- **Tailwind CSS** for rapid development
- **Custom CSS Classes** for complex animations
- **CSS Variables** for theme consistency
- **Mobile-First** responsive design

## 🔍 Key Components

### ResourceList
- Infinite scrolling implementation
- Advanced filtering capabilities
- Loading states and error handling
- Responsive grid layout

### ResourceDetail
- Comprehensive information display
- Related resources navigation
- Responsive design patterns
- Type-safe data handling

### Search System
- Global search across all resources
- Real-time results display
- Keyboard navigation support
- Search result categorization

### Filter System
- Dynamic filter options per resource type
- State persistence across navigation
- Clear and reset functionality
- Type-safe filter handling

## 🌟 Star Wars Theming

### Color Palette
- **Primary**: Star Wars Yellow (`#FFE81F`)
- **Background**: Deep Space Blues and Blacks
- **Text**: Various shades of white and gray
- **Accents**: Subtle glows and gradients

### Typography
- **Headers**: Orbitron (Star Wars-style font)
- **Body**: Rajdhani (clean, futuristic font)
- **Responsive**: Scales appropriately across devices

### Animations
- **Star Field Background**: Animated star particles
- **Hover Effects**: Subtle scaling and glow effects
- **Loading States**: Themed spinner animations
- **Transitions**: Smooth page and component transitions

## 🧪 Testing Strategy

### Unit Tests
- Component rendering and behavior
- Custom hook functionality
- Utility function testing
- Redux slice testing

### Integration Tests
- Component interaction testing
- API hook integration
- State management flow
- User workflow testing

### Test Coverage
- Critical path coverage
- Error handling scenarios
- Edge case testing
- Accessibility testing

## 🔮 Future Enhancements

### Potential Features
- **Favorites System**: Save favorite characters, planets, etc.
- **Comparison Tool**: Compare different starships or characters
- **Timeline View**: Chronological view of films and events
- **Interactive Galaxy Map**: Visual representation of planets
- **Dark/Light Mode Toggle**: Alternative theme options
- **Offline Support**: PWA capabilities for offline browsing

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Enhanced Testing**: E2E testing with Playwright
- **Accessibility**: WCAG compliance improvements
- **SEO Optimization**: Meta tags and structured data
- **Analytics**: User behavior tracking
- **Error Monitoring**: Sentry integration

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SWAPI](https://swapi.dev/) - The Star Wars API
- [Lucasfilm](https://www.lucasfilm.com/) - For the amazing Star Wars universe
- [React Community](https://reactjs.org/community/support.html) - For the incredible ecosystem
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework

---

### 🌌 "That's no moon... it's a space station!"

Built with ❤️ and the Force by a Jedi developer in a galaxy not so far away.

May the Force be with you! ⭐
