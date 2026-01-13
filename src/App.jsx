import './App.css'
import {Routes, Route, NavLink} from "react-router"; 

import Instructions from './pages/Instructions/Instructions';
import Examples from './pages/Examples/Examples';
import Task_01 from './pages/task_01/task_01';
import Task_02 from './pages/Task_02/Task_02';
import User_Tasks from './pages/User_Task/User_Task';

// add components here to auto generate page links in nav + connect route
const pages = {
  "examples" : <Examples/>,
  "ToDo App" : <Task_01/>,
  "task_02" : <Task_02/>,
  "User Task" : <User_Tasks/>
}

function App() {

  // takes key, creates nav link
  function createNavButton(key){
    const label = key.replace("_", " ");    //"task_01" => "task 01"
    const link = "/" + key;                 //"task_01" => "/task_01"

    return <NavLink key={key} to={link} className="nav-link">{label}</NavLink>
  }
  // make nav buttons from every key in pages object
  const navButtons = Object.keys(pages).map(createNavButton);

  //takes object entry (both the key and the value separately), converts to Route component
  function createRoute([key,component]){
    const link = "/" + key;
    return <Route to={key} path={link} element={component}/>
  }
  // make route components from every pages entry
  const routes = Object.entries(pages).map(createRoute);

  return (
    <div className="app dark-theme">
     <nav className="nav">
      <NavLink to="/" className="nav-link">Instructions</NavLink>
      {navButtons}
     </nav>
     <div className="page-content">
      <Routes>
        <Route index element={<Instructions/>}/>
        {routes}
      </Routes>
     </div>
    </div>
  )
}

export default App
