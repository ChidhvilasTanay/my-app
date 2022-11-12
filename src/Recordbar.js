import React, { useEffect, useState } from 'react'
import { db } from './FireBase';
import "./Recordbar.css"
import Records from './Records'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { selectPrev, selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';

function Recordbar() {
    const [records, setRecords]= useState([]);
    const [course,setCourse]=useState()
    const [batch, setBatch]=useState()
    const [strength, setStrength]=useState()
    const [searchCourse, setSearchCourse]=useState();
    const user = useSelector(selectUser)
    const prev = useSelector(selectPrev)

    useEffect(()=>{
        if(prev=="faculty"){
               db.collection("records").where("name","==",user.displayName).orderBy("timeStamp","desc").onSnapshot((snapshot)=>{
            setRecords(snapshot.docs.map((doc)=>{
                return({
                    id:doc.id,
                    data:doc.data(),
                })
            }))
        })
        }
        else if(prev=="student"){
            db.collection("marks").where("student","==",user.displayName).orderBy("timeStamp","desc").onSnapshot((snapshot)=>{
                       setRecords(snapshot.docs.map((doc)=>{
                return({
                    id:doc.id,
                    data:doc.data(),
                })
            }))
            })
        }
    })
   
    const AddTile=(event)=>{
        event.preventDefault();
        setBatch("");
        setCourse("");
        setStrength("");
        db.collection("records").add({
            name:user.displayName,
            course:course,
            batch:batch,
            strength:strength,
            timeStamp:firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const PairFunc=(event)=>{
        event.preventDefault();
        
    }

    const RenderSection=()=>{
        switch(prev){
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
        case "student":
            return(<div className="tile_search">
             <form>
                <input type="text"
                placeholder="Enter course Name"
                value={searchCourse}
                onChange={(event)=>{
                    setSearchCourse(event.target.value)
                }}/>
                <AddIcon className="add_symbol" sx={{fontSize:35}} onClick={PairFunc} />
             </form>
            </div>
            )
        }
    }

  return (
    <div className="recordbar">
       {RenderSection()}
       <div className='record_section'>
       {records.map(({id, data})=>{
        return(
        <Records
        key={id}
        subjectName={data.course}
        batchName={data.batch}
        batchStrength={data.strength}
        facultyName={(data.name)? data.name:data.faculty}
        marks={data.marks}/>
        )
       })}
       </div>
    </div>
  )
}

export default Recordbar