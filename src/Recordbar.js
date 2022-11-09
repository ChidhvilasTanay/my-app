import React, { useEffect, useState } from 'react'
import { db } from './FireBase';
import "./Recordbar.css"
import Records from './Records'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';

function Recordbar() {
    const [records, setRecords]= useState([]);
    const [course,setCourse]=useState()
    const [batch, setBatch]=useState()
    const [strength, setStrength]=useState()
    const user = useSelector(selectUser)

    useEffect(()=>{
        db.collection("records").orderBy("timeStamp","desc").onSnapshot((snapshot)=>{
            setRecords(snapshot.docs.map((doc)=>{
                return({
                    id:doc.id,
                    data:doc.data(),
                })
            }))
        })
    })
   
    const AddTile=(event)=>{
        event.preventDefault();
        db.collection("records").add({
            name:user.displayName,
            course:course,
            batch:batch,
            strength:strength,
            timeStamp:firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const RenderSection=()=>{
        switch(user.prev){
        case "faculty":
            return(<div className="record_input">
            <form>
                <input type="text" 
                placeholder="Enter Course Name" 
                value={course}
                onChange={(event)=>{
                    setCourse(event.target.value)
                }}/>
                <input type="text" 
                placeholder="Enter Batch Name" 
                value={batch}
                onChange={(event)=>{
                    setBatch(event.target.value)
                }}/>
                <input type="text" 
                placeholder="Enter students enrolled" 
                value={strength}
                onChange={(event)=>{
                    setStrength(event.target.value)
                }}
                />
                <AddIcon className="add_symbol" sx={{fontSize:35}}onClick={AddTile} />
            </form>
        </div>)
        }
    }

  return (
    <div className="recordbar">
       {RenderSection()}
       <div className='record_section'>
       {records.map(({id, data:{course, batch, strength, name}})=>{
        return(
        <Records
        key={id}
        subjectName={course}
        batchName={batch}
        batchStrength={strength}
        facultyName={name}/>
        )
       })}
       </div>
    </div>
  )
}

export default Recordbar