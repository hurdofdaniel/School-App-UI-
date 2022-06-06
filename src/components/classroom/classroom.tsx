import React, { useState, useEffect } from 'react';
import './classroom.css';

interface classroomStructure {
    id: string,
    name: string,
    className: string,
    url: string,
}

let classroom: classroomStructure[] = [
    {
        "id": "",
        "name": "Physics",
        "className": "Science",
        "url": "https://google.com/search?q=physics",
    },
    {
        "id": "",
        "name": "Digital",
        "className": "Digi P",
        "url": "https://google.com/search?q=computer+science"
    },
    {
        "id": "",
        "name": "Physics",
        "className": "Science",
        "url": "https://google.com/search?q=physics",
    },
    {
        "id": "",
        "name": "Digital",
        "className": "Digi P",
        "url": "https://google.com/search?q=computer+science"
    },
    {
        "id": "",
        "name": "Physics",
        "className": "Science",
        "url": "https://google.com/search?q=physics",
    },
    {
        "id": "",
        "name": "Digital",
        "className": "Digi P",
        "url": "https://google.com/search?q=computer+science"
    },
    {
        "id": "",
        "name": "Physics",
        "className": "Science",
        "url": "https://google.com/search?q=physics",
    },
    {
        "id": "",
        "name": "Digital",
        "className": "Digi P",
        "url": "https://google.com/search?q=computer+science"
    },
    {
        "id": "",
        "name": "Yr11 Math",
        "className": "Math",
        "url": "https://google.com/search?q=linear+algebra"
    },
]

function fetchClassroom(tokens: any, data: classroomStructure[]) {
    return fetch('/api/classroom/fetch/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokens: tokens,
            data: data
        })
    })
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function updateClassroom(tokens: any, data: classroomStructure[], sheetId: string) {
    return fetch('/api/classroom/update/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokens: tokens,
            data: data,
            sheetId: sheetId
        })
    })
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function Classroom(props: any) {
    // Implement loading state
    const [loaded] = useState(true);

    const [classrooms, setClassrooms] = useState(props.classroomData);
    const [fetched, setFetched] = useState(false);
    const [renderClassrooms, setRenderClassrooms] = useState<JSX.Element[]>([]);

    const fetchedClassrooms = async () => {
        let classroomData = await fetchClassroom(props.tokens, classrooms);

        setFetched(true);
        setClassrooms(classroomData);
        updateClassroom(props.tokens, classroomData, props.sheetId);
    }

    const allowDrop = (ev: any) => {
        ev.preventDefault();
    }

    const handleDrop = (ev: any) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");

        let dropElementName = document.getElementById(ev.currentTarget.id + "Name") as HTMLElement;
        //dropElementName.innerHTML = data;
        let tempClassrooms = classrooms;
        tempClassrooms[ev.currentTarget.id.replace("classes", "")].className = data;
        setClassrooms(tempClassrooms);
        loadClassrooms();
        updateClassroom(props.tokens, classrooms, props.sheetId);
        // Send extra data needed for the drop
    }

    const loadClassrooms = () => {
        let renderContent = [];

        for (let i = 0; i < classrooms.length; i++) {
            renderContent.push(
                <div className="class-content" id={`classes${i}`} key={i} onDrop={handleDrop} onDragOver={allowDrop} onClick={() => window.open(classrooms[i].url, "_blank")}>
                    <div className="class-text">
                        <p className="class-name">{classrooms[i].name}</p>
                        {/* Display when the class is next rather then the name */}
                        <p className="class-day" id={`classes${i}Name`}>{classrooms[i].className ? classrooms[i].className : "Unlinked"}</p>
                    </div>

                    <div className="class-icon-background">
                        <div className="class-icon">{Object.keys(props.emojis).includes(classrooms[i].className) ? props.emojis[classrooms[i].className] : ""}</div>
                    </div>
                </div>
            )
        }

        setRenderClassrooms(renderContent);
    }

    useEffect(() => {
        loadClassrooms();
        if (classrooms.length !== 0 && !fetched) {
            fetchedClassrooms();
        }
    }, [classrooms, JSON.stringify(props.emojis)]);

    return (
        <div className="page-content classes-container">
            <div className="classes-header"><div className='ico ico-classroom'></div> Your Classes</div>
            {loaded ?
                <div className="classes-content">
                    {renderClassrooms.length !== 0 ?
                        renderClassrooms
                        :
                        <p>You have no classes</p>
                    }
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    );
}

export default Classroom;