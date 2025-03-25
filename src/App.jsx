import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import Profile from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import ChatBot from './pages/ChatbotPage'
import Roadmap from './pages/RoadmapPage'

function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path='/auth/' element={<AuthPage />} />
        <Route path="/chatbot/" element={<ChatBot />} />
        <Route path="/roadmap/" element={<Roadmap />} />
        <Route path='/roadmap/:roadmapId' element={<Roadmap />} />

      </Routes>
    </div>
  )
}

export default App
