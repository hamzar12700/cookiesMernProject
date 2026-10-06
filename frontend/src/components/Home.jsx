import React, { useEffect } from 'react'

function Home() {


    async function Logout() {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/logout",{
          method : "POST",
          credentials : "include"
        }
        )
      } catch (error) {
        console.log(error.message);

      }
    }

    // Logout();
  // }, [])



  return (
    <div>Home

      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Home