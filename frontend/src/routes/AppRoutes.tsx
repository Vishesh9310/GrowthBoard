import { Route, Routes } from 'react-router-dom'
import LandingIntro from '../pages/LandingIntro'
import About from '../pages/About'
import Pricing from '../pages/Pricing'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import EditProfile from '../pages/workspace/EditProfile'
import ProtectedRoutes from './ProtectedRoute'
import Workspace from '../pages/Workspace'
import Dashboard from '../pages/workspace/Dashboard'
import Skills from '../pages/workspace/Skills'
import Projects from '../pages/workspace/Projects'
import Achievements from '../pages/workspace/Achievements'
import LearningRoadmap from '../pages/workspace/LearningRoadmap'
import TaskManager from '../pages/workspace/TaskManager'
import Note from '../pages/workspace/Note'

const AppRoutes = () => {
  return (
    <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingIntro/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/plans" element={<Pricing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>

        {/* protected Routes */}
        <Route path="/profile" element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
        <Route path="/editprofile" element={<ProtectedRoutes><EditProfile/></ProtectedRoutes>}/>

        {/* workspace routes */}
        <Route path="/workspace" element={<ProtectedRoutes><Workspace/></ProtectedRoutes>}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="skills" element={<Skills/>}/>
            <Route path="projects" element={<Projects/>}/>
            <Route path='achievement' element={<Achievements/>}/>
            <Route path="learningroadmap" element={<LearningRoadmap/>}/>
            <Route path='taskmanager' element={<TaskManager/>}/>
            <Route path='note' element={<Note/>}/>
        </Route>
    </Routes>
  )
}

export default AppRoutes