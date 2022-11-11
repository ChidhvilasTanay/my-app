import React, { useState } from 'react'
import "./Records.css"
import AddIcon from '@mui/icons-material/Add';
import { db } from './FireBase';
import { useSelector } from 'react-redux';
import { selectPrev, selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';

function Records({subjectName, batchName, batchStrength, facultyName, marks}) {
  const [studentName, setStudentName]=useState("");
  const [studentMarks, setStudentMarks]=useState("");
  const [studentBatch, setStudentBatch]=useState("");
  const user = useSelector(selectUser)
  const prev = useSelector(selectPrev)
  const AddMarks=(event)=>{
    event.preventDefault();
    db.collection("marks").add({
      course:subjectName,
      student:studentName,
      marks:studentMarks,
      batch:studentBatch,
      faculty:user.displayName,
      timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return (
    <div className='records'>

        <div className="tile_top">
        <h1 className="subject_name">{subjectName}</h1>
        <p className="faculty_name">{facultyName}</p>
        </div>

        <div className="batch_info">
            <h1 className="batch_name">{batchName}</h1>

       {(prev=="faculty")?(<div className='batch_strength'>
                <p>Students enrolled:</p>
                <p>{batchStrength}</p>
            </div>):null}

        </div>
       

       {(prev=="faculty")?(<div className='add_student'>
        <form>
              <input
        type="text"
        value={studentName}
        onChange={(event)=>{
          setStudentName(event.target.value)
        }}/>
        <input
        type="text"
        value={studentMarks}
        onChange={(event)=>{
          setStudentMarks(event.target.value)
        }}/>
        <input
        type="text"
        value={studentBatch}
        onChange={(event)=>{
          setStudentBatch(event.target.value)
        }}/>
        <AddIcon className="add_symbol" sx={{fontSize:35}}onClick={AddMarks} />
        </form>
       </div> ):null}

       {(prev=="student")?(<div className="scorecard">
        <p>marks scored:</p>
        <p>{marks}</p>
        </div>):null}


    </div>
  )
}

export default Records