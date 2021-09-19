import { Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div>
      <div>
        <Link style={{ textDecoration: "none" }} to='/login'>
          <Button variant='contained'>Log in </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: "none" }} to='/register'>
          <Button variant='outlined'>Sign up</Button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
