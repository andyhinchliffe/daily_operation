"use client"

import React from 'react'
import { useState } from 'react'
import postNumTool from '../components/postNumTool'

const [postNum, setPostNum] = useState(1)





const test = () => {
  return (
    <div>

        <h1>{postNumTool(postNum)}</h1>

        <button onClick={() => setPostNum(50)}>Next</button>






    </div>
  )
}

export default test