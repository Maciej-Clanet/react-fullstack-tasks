import "./Examples.css";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Examples(){
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    function getAllPeople(){
        const url = "http://127.0.0.1:8001/example/people";
        axios.get(url)
        .then(res => {
            console.log(res.data);
            setPeople(res.data.items);
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError(err.message)
        })
    }

    useEffect(getAllPeople,[])

    if(loading){
        return <h1>Loading Data...</h1>
    }
    if(error){
        return <h1>{error.message}</h1>
    }

    return(
    <>
    <h1 className="example-heading">Example CRUD</h1>
    <h2 className="example-heading">Create</h2>
    <CreatePerson refresh={getAllPeople}/>


    <h2 className="example-heading">Get All + Update + Delete</h2>

    <div className="people-display">
        <span>Name</span>
        <span>Age</span>
        <span>Role</span>
        <span>Update</span>
        <span>Delete</span>
        {people.map(person => <Person key={person._id} data={person} refresh={getAllPeople} />)}
    </div>

    <h2 className="example-heading">Search by role</h2>
    <RoleFilter refresh={getAllPeople}/>

    <h2 className="example-heading">Problems with this app</h2>
    <ol>
        <li>We have to pass around the getAllPeople function to refresh items when something changes</li>
        <li>Data between search and all list can easilly get out of sync when you update/delete items</li>
        <ul>
            <li>It's not using a single source of truth, values get copied and out of sync</li>
        </ul>
    </ol>
    <p>Solution: create context that will be the source of data for the other components</p>
    </>
    )
}


function Person({data, refresh}){

    const id = data._id;
    const [name, setName] = useState(data.name || "")
    const [age, setAge] = useState(data.age || "")
    const [role, setRole] = useState(data.role || "") 

    function deletePerson(){
        const url = `http://127.0.0.1:8001/example/people/${id}`
        axios.delete(url)
        .then(res => {
            alert(`deleted ${data.name}`)
            refresh()
        })
        .err(err => {
            alert(`Failed to delete ${data.name}, reason: `)
            console.log(err)
        })
    }

    function updatePerson(){
        const url= `http://127.0.0.1:8001/example/people/${id}`;

        const newData = {
            name,
            age,
            role
        }
        axios.patch(url, newData)
        .then(res => {
            alert("updated person")
            refresh()
        })
        .catch(err => {
            alert("failed to update person. E: " + err.message)
            console.log(err)
        })
    }

    return (
        <>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
            <input value={role} onChange={(e) => setRole(e.target.value)}/>
            <button onClick={updatePerson}>Update</button>
            <button onClick={deletePerson}>Delete</button>             
        </>
    )
}

function CreatePerson({refresh}){
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [role, setRole] = useState("");

    function addPerson(e){
        e.preventDefault();

        const url = "http://127.0.0.1:8001/example/people";

        const newPerson = {
            name,
            age,
            role: role ? role : null
        }
        axios.post(url, newPerson)
        .then(res => {
            alert("added a person")
            refresh();
        })
        .catch(err => {
            //proper error handling for fastapi errors is horrendous
            let msg = "Unknown error";
            const detail = err.response?.data?.detail;

            // fastapi returns an array for validation errors, but a string for errors we raise ourselves...
            if(Array.isArray(detail)){
                // if its a lit of errors, combine them into one string
                msg = detail.map(e => e.msg).join(", ");
            } else if (typeof detail === "string"){
                // error we raised ourselves
                msg = detail;
            } else {
                msg = err.message
            }
            
            // NOTE: since this is something you would do often, it would be best to make a helper function you would import in other components to handle fastapi errors
            alert("failed to add a person. E: " + msg)
        })
    }

    return(
        <form className="add-person-form" onSubmit={addPerson}>
            <p>Add a person:</p>
            <label>
                <span>Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
                <span>age</span>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
            </label>
            <label>
                <span>Role</span>
                <input value={role} onChange={(e) => setRole(e.target.value)}/>
            </label>
            <button type="submit">Add</button>
        </form>
    )
}

function RoleFilter({refresh}){
    const [found, setFound] = useState([])
    const [filter, setFilter] = useState("");

    function search(e){
        e.preventDefault()
        // same url as get all
        let url = "http://127.0.0.1:8001/example/people";
        if(filter){
            // if filter no empty, modify url to use the right endpoint
            url += `/role/${filter}`
        }
        axios.get(url)
        .then(res => {
            const foundPeople = res.data.items 
            setFound(foundPeople);
            alert(`found ${foundPeople.length} people`)
        })
        .catch(err => {
            alert("failed to find people: " + err.message)
        })
    }

    return(
        <>
        <form onSubmit={search}>
            <input placeholder="Role..." value={filter} onChange={(e) => setFilter(e.target.value)} />
            <button type="submit">Search</button>
        </form>
        <div className="people-display">
            <span>Name</span>
            <span>Age</span>
            <span>Role</span>
            <span>Update</span>
            <span>Delete</span>
            {found.map(person => <Person key={person._id} data={person} refresh={refresh} />)}
        </div>
        </>
    )

}