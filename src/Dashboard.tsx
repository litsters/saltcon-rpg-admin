import React, { useCallback, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
type HealthCheckStatus = "unknown" | "healthy" | "unhealthy";

type Props = {
  username: string;
}

export const Dashboard:React.FC<Props> = ({username}) => {

  const [healthCheckStatus, setHealthCheckStatus] = useState<HealthCheckStatus>("unknown")

  const doHealthCheck = useCallback(async () => {
    try{
      const res = await axios.get("https://saltcontools.hopto.org/api/health");
      console.log(JSON.stringify(res,null,2))
      if(res.status === 200 && res.data === "Healthy"){
        return true;
      } else {
        return false;
      }
    }catch(e){
      console.error(e);
      return false;
    }
  },[])

  const healthCheckMessage = useMemo(()=>{
    switch(healthCheckStatus){
      case "healthy": return "backend is healthy";
      case "unhealthy": return "backend is not healthy";
      case "unknown": return "click to do health check"
    }
  },[healthCheckStatus])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => doHealthCheck().then(healthy => setHealthCheckStatus(healthy ? "healthy" : "unhealthy"))}>
          {healthCheckMessage}
        </button>
        <p>
          {username}, edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}