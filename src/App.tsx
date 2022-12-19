import React, { useState } from 'react'
import './scss/App.scss'

interface ClickedProps{
  clientX: number,
  clientY: number,
  
}
function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [undidPoints, setUndidPoits] = useState<ClickedProps[]>([])

  const getCoordenates = (e:React.MouseEvent) => {
    const {clientY, clientX} = e
    setClickedPoints([...clickedPoints, {clientX, clientY}])
  }
  const handleUndo = (e:React.MouseEvent) => {
    e.stopPropagation()

    const newArray = [...clickedPoints].slice(0,-1);
    setClickedPoints(newArray)

    const lastItem = clickedPoints[clickedPoints.length -1]
    setUndidPoits((prev) => [...prev, lastItem])
  }
  const handleRedo = (e:React.MouseEvent) => {
    e.stopPropagation()

    if(undidPoints.length === 0 ){
      return
    }

    const lastDot = undidPoints[undidPoints.length -1]
    setUndidPoits((prev) => [...prev].slice(0,-1))
    setClickedPoints((prev) => [...prev, lastDot])
  }
  const handleClean = (e:React.MouseEvent) => {
    e.stopPropagation()
    
    setClickedPoints([])
    setUndidPoits([])
  }

  return (
    <>
      <div 
      className="App" 
      onClick={getCoordenates}
      >
      <button 
      disabled= {clickedPoints.length === 0}
      onClick={handleUndo}>
        Desfazer
      </button>
      <button 
      disabled= {undidPoints.length === 0}
      onClick={handleRedo}>
        Refazer
      </button>
      <button 
      disabled= {clickedPoints.length === 0}
      onClick={handleClean}>
        Limpar
      </button>
        {clickedPoints.map((clickedPoints,index) => {
          return (
            <div 
            key={index}
            className='dot'
            style={{left:clickedPoints.clientX - 5,top:clickedPoints.clientY - 5}} 
            />
            )  
          })}
      
      </div>
    </>
  )
}

export default App
