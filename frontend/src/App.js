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
import Discussions from './components/Discussions';
import PostFeed from './components/PostFeed';
import WelcomeUser from './components/WelcomeUser';
import AdvocacyPage from './components/AdvocacyPage';
import ResourceManagement from './components/ResourceManagement';
import CaseManagement from './components/CaseManagement';
import UserManagement from './components/UserManagement';
import LegalDoc from './components/LegalDoc';
import Statistics from './components/Statistics';

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
          <Route  path="resources" element={<Resource/>} />
          <Route  path="case" element={<Case/>} />
          <Route  path="campaignm" element={<CompaignManagement/>} />
          <Route  path="message" element={<Message/>} />
          <Route  path="welcome" element={<WelcomeUser/>} />
          <Route  path="advocacy" element={<AdvocacyPage/>} />
          <Route  path="discussion" element={<DiscussionsForums/>} />
          <Route  path="discussions" element={<Discussions/>} />
          <Route  path="resourcema" element={<ResourceManagement/>} />
          <Route  path="casema" element={<CaseManagement/>} />
          <Route  path="listuser" element={<UserManagement/>} />
          <Route  path="legaldoc" element={<LegalDoc/>} />
          <Route  path="stats" element={<Statistics/>} />
          </Route> 
        </Routes>
    </Router>
  );
}

export default App;
