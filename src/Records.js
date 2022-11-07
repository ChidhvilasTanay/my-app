import React from 'react'
import "./Records.css"

function Records({subjectName, batchName, batchStrength, facultyName}) {
  return (
    <div className='records'>
        <div className="tile_top">
        <h1 className="subject_name">{subjectName}</h1>
        <p className="faculty_name">{facultyName}</p>
        </div>
        <div className="batch_info">
            <h1 className="batch_name">{batchName}</h1>
            <div className='batch_strength'>
                <p>Students enrolled:</p>
                <p>{batchStrength}</p>
            </div>
        </div>
    </div>
  )
}

export default Records