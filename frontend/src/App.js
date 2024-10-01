// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Join from './components/Join';
import Case from './components/Case';
import Signup from './components/Signup';
import Message from './components/Message';
import Login from './components/Login';
import Alogin from './components/Alogin';
import Sidebar from './components/Sidebar';
import DashboardLayout from './components/DashboardLayout'; 
import ProfilePage from './components/ProfilePage'; 
import Resource from './components/Resource'; 
import CompaignManagement from './components/CompaignManagement'; 
import CreateEventOrCampaign from './components/CreateEventOrCampaign';
import DiscussionsForums from './components/DiscussionsForums';
import PostFeed from './components/PostFeed';
import WelcomeUser from './components/WelcomeUser';
import AdvocacyPage from './components/AdvocacyPage';
import ResourceManagement from './components/ResourceManagement';

function App() {
  return (
    <Router>
       <Routes>
          <Route  path="/" element={<LandingPage/>} ></Route>
          <Route  path="/landingpage" element={<LandingPage/>} ></Route>
          <Route  path="/join" element={<Join/>} ></Route> 
          <Route  path="/signup" element={<Signup/>} ></Route>
          <Route  path="/sidebar" element={<Sidebar/>} ></Route>
          <Route  path="/postfeed" element={<PostFeed/>} ></Route>
          <Route  path="/login" element={<Login/>} ></Route>
          <Route  path="/alogin" element={<Alogin/>} ></Route>
          <Route  path="/message" element={<Message/>} ></Route>
          <Route  path="/dashboard" element={<DashboardLayout/>} >
          <Route  path="postfeed" element={<PostFeed/>} />
          <Route  path="eventm" element={<CreateEventOrCampaign/>} />
          <Route  path="profile" element={<ProfilePage/>} />
          <Route  path="resource" element={<Resource/>} />
          <Route  path="case" element={<Case/>} />
          <Route  path="compaignm" element={<CompaignManagement/>} />
          <Route  path="message" element={<Message/>} />
          <Route  path="welcome" element={<WelcomeUser/>} />
          <Route  path="advocacy" element={<AdvocacyPage/>} />
          <Route  path="discussion" element={<DiscussionsForums/>} />
          <Route  path="resourcema" element={<ResourceManagement/>} />
          </Route> 
        </Routes>
    </Router>
  );
}

export default App;
