import React from 'react'
import data from './data.json'
import legend from './Legends.json'

const Side = () => {
  return (
    <div className='Side'>
      <h1 className='heading1' style={{marginBottom:'10px'}}>Net Change</h1>
        {data.map((p, i) => {
          return (<div key={i} className='Box2'><div key={i} className='flex box-content'>
            <p >{p.text}</p>
            <p>{p.value}</p>
          </div> </div>)
        })}
     
      <h1 className='heading1' style={{ borderBottom: "solid 1px rgb(206, 206, 206)",margin:"10px 0 0 0" }}>Legend</h1>
      <h1 className='heading' style={{ fontSize: "1rem" ,margin:"10px 0"}}>Movement Summary</h1>

      {legend.map((p, i) => {
        return (
          <div key={i} className='Box2'> <div  className='flex'>
            <div className='dot' style={{ backgroundColor: `${p.color}` }}></div>
            <p style={{ color: `${p.color}` }}>{p.text}</p>
          </div></div>
        )
      })}
    </div>
  )
}

export default Side