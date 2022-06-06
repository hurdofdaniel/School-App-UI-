import { useEffect, useState } from 'react';
import './timetable.css';
import EmojiPicker from 'emoji-picker-react';

interface timetableDataStructure {
    days: string[],
    daysPerWeek: number,
    periods: string[],
    periodsPerDay: number,
    times: any,
    timetable: Array<Array<string>>,
    timetableEmojis: any,
};

let timetableData: timetableDataStructure = {
    "days": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ],
    "daysPerWeek": 5,
    "periods": [
        "Period 1",
        "Period 2",
        "Period 3",
        "Period 4",
        "Period 5",
        "Period 6"
    ],
    "periodsPerDay": 6,
    "times": [
        {
            "0": {
                "start": "08:30",
                "end": "09:20"
            },
            "1": {
                "start": "09:20",
                "end": "10:10"
            },
            "2": {
                "start": "10:45",
                "end": "11:35"
            },
            "3": {
                "start": "11:35",
                "end": "12:25"
            },
            "4": {
                "start": "13:00",
                "end": "13:45"
            },
            "5": {
                "start": "13:45",
                "end": "14:30"
            }
        },
        {
            "0": {
                "start": "08:30",
                "end": "09:20"
            },
            "1": {
                "start": "09:20",
                "end": "10:10"
            },
            "2": {
                "start": "10:45",
                "end": "11:35"
            },
            "3": {
                "start": "11:35",
                "end": "12:25"
            },
            "4": {
                "start": "13:00",
                "end": "13:45"
            },
            "5": {
                "start": "13:45",
                "end": "14:30"
            }
        },
        {
            "0": {
                "start": "08:30",
                "end": "09:20"
            },
            "1": {
                "start": "09:20",
                "end": "10:10"
            },
            "2": {
                "start": "10:45",
                "end": "11:35"
            },
            "3": {
                "start": "11:35",
                "end": "12:25"
            },
            "4": {
                "start": "13:00",
                "end": "13:45"
            },
            "5": {
                "start": "13:45",
                "end": "14:30"
            }
        },
        {
            "0": {
                "start": "08:30",
                "end": "09:20"
            },
            "1": {
                "start": "09:20",
                "end": "10:10"
            },
            "2": {
                "start": "10:45",
                "end": "11:35"
            },
            "3": {
                "start": "11:35",
                "end": "12:25"
            },
            "4": {
                "start": "13:00",
                "end": "13:45"
            },
            "5": {
                "start": "13:45",
                "end": "14:30"
            }
        },
        {
            "0": {
                "start": "08:30",
                "end": "09:20"
            },
            "1": {
                "start": "09:20",
                "end": "10:10"
            },
            "2": {
                "start": "10:45",
                "end": "11:35"
            },
            "3": {
                "start": "11:35",
                "end": "12:25"
            },
            "4": {
                "start": "13:00",
                "end": "13:45"
            },
            "5": {
                "start": "13:45",
                "end": "14:30"
            }
        }
    ],
    "timetable": [
        [
            "Math",
            "Digi M",
            "Study",
            "Science",
            "Media",
            "Digi P"
        ],
        [
            "Media",
            "Media",
            "Science",
            "Digi M",
            "Math",
            "Math"
        ],
        [
            "Digi P",
            "Digi P",
            "Math",
            "Study",
            "Science",
            "Science"
        ],
        [
            "Study",
            "Study",
            "Media",
            "Digi P",
            "Digi M",
            "Digi M"
        ],
        [
            "Science",
            "Math",
            "Digi M",
            "Media",
            "Digi P",
            "Study"
        ]
    ],
    "timetableEmojis": {
        "Math": "🧮",
        "Digi P": "💻",
        "Science": "🧪",
        "Study": "💡",
        "Media": "📺",
        "Digi M": "💾",
    },
};

function fetchTimetable() {
    // fetch timetable from API once frontend is built
    return timetableData;
}

function TimetableCell({emoji, setEmoji, value, onChange, datakey, editing, setParentEmojis}: any) {
    const [cellValue, setCellValue] = useState(value ?? '');
    //const [cellEmoji, setCellEmoji] = useState(emoji);
    const [emojiPickerOpen, setEmojiPickerActive] = useState(false);

    useEffect(() => {
        setCellValue(value);
    }, [value]);

    const handleInputChange = (e: any) => {
        setCellValue(e.target.value);
        onChange(e.target.value, datakey);
    };

    const onEmojiClick = (ev: any, emojiObject: any) => {   
        let tempEmoji = emoji;
        tempEmoji[value] = emojiObject.emoji;
        
        setEmoji(tempEmoji);
        setParentEmojis(JSON.parse(JSON.stringify(tempEmoji)));
        setEmojiPickerActive(false);
    }

    if (editing) {
        return (
            <div>
                {emojiPickerOpen ?
                    <EmojiPicker onEmojiClick={onEmojiClick} preload={true} pickerStyle={{position: "absolute", bottom: "0", right: "0"}} native={true} />
                    :
                    <button onClick={() => setEmojiPickerActive(!emojiPickerOpen)}>{emoji[value] == null ? "+" : emoji[value]}</button>
                }
                <input className="timetable-input-cell" value={cellValue} onChange={handleInputChange} />
            </div>
        )
    } else {
        return (
            <div>
                {emoji[value] !== null ? emoji[value] : ""}
                <input className="timetable-input-cell" value={cellValue} disabled={true} />
            </div>
        )
    }
}

function updateTimetable(tokens: any, data: timetableDataStructure, sheetId: string) {
    return fetch('/api/timetable/update/', {
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

function Timetable(props: any) {
    // Timetable should not be changed as of right now
    // Timetable should be changed by fetch and by edit
    const [timetable, setTimetable] = useState(props.timetableData || fetchTimetable());
    const [classesList, setClassesList] = useState<any>();
    const [parsedTimetable, setParsedTimetable] = useState<string[][] | null>();
    const [renderTimetable, setRenderTimetable] = useState<JSX.Element[]>();

    const [editMode, setEditMode] = useState(false);

    const [currentClassId, setCurrentClassId] = useState<string>("");
    const [classId, setClassId] = useState<string>("");

    const handleChange = (value: string, key: string) => {
        let y: number = parseInt(key.split(" ")[0]);
        let x: number = parseInt(key.split(" ")[1]);
        let temp = parsedTimetable;
        if (temp == null)
            return;
        temp[y][x] = value;
        setParsedTimetable(temp);
    }

    const handleEmojiChange = (emoji: string, className: string) => {
        let emojiList = classesList;

        emojiList[className] = emoji;

        setClassesList(emojiList);
    }

    const handleEdit = () => {
        if (editMode)
            saveTimetable();
        
        setEditMode(!editMode);
    }

    const handleDrag = (ev: any) => {
        ev.dataTransfer.setData("text", (document.getElementById(ev.currentTarget.id)?.children[0].children[0] as HTMLInputElement | null)?.value);
    }

    // Effect for converting timetable JSON into rendered timetable
    useEffect(() => {
        async function parseTimetable() {
            // Make temporary variable to hold timetable
            let timetableToLoad = timetable["timetable"];

            // Prepare timetable to be rendered
            let timetableParsed = [];

            // Make header row text (x: 0, y: 0 should be blank string)
            let row = [""];
            for (let x = 0; x < timetable["daysPerWeek"]; x++) {
                row.push(timetable["days"][x]);
            }
            timetableParsed.push(row);

            // Make timetable rows
            for (let x = 0; x < timetable["periodsPerDay"]; x++) {
                // Make timetable row
                let row = [];
                // Add period name
                row.push(timetable["periods"][x]);
                // Loop through days
                for (let y = 0; y < timetable["daysPerWeek"]; y++) {
                    // Store class name
                    let className = timetableToLoad[y][x];
                    // Add class name to row
                    row.push(className);
                }
                // Add row to timetable
                timetableParsed.push(row);
            }

            setParsedTimetable(timetableParsed);
        }

        function loadClassesList() {
            let timetableClasses: any = timetable["timetableEmojis"];

            setClassesList(timetableClasses);
            props.setEmojis(timetableClasses);
        }

        parseTimetable();
        loadClassesList();
    }, [timetable, props]); // The variable in the array is the one that is watched for changes

    useEffect(() => {
        function loadTimetable() {
            // Prepare timetable to be rendered
            if (parsedTimetable == null)
                return;
            let timetableParsed = parsedTimetable;
            let timetableToRender = [];

            // Loop through timetable
            for (let x = 0; x < timetableParsed.length; x++) {
                // Get row
                let row = timetableParsed[x];
                // Prepare JSX Row
                let rowToRender = [];
                // Loop through row
                for (let y = 0; y < row.length; y++) {
                    // Get Cell
                    let cell = row[y];
                    // Prepare JSX Cell
                    let cellToRender;
                    // Check if heading
                    if (y === 0 || x === 0) 
                        cellToRender = <th key={`${y}${x}`}>{cell}</th>;
                    else {
                        cellToRender = <td draggable={!editMode} onClick={() => setCurrentClassId(`${y}${x}`)} onDragStart={handleDrag} id={`${y}${x}`} key={`${y}${x}`}><TimetableCell setParentEmojis={props.setEmojis} emoji={classesList} setEmoji={setClassesList} value={cell} onChange={handleChange} onEmojiChange={handleEmojiChange} datakey={`${y} ${x}`} editing={editMode} /></td>;
                    }
                    
                    // Add cell to row
                    rowToRender.push(cellToRender);
                }
                // Add row to timetable
                timetableToRender[x] = <tr key={`${x}`}>{rowToRender}</tr>;
            }

            // Set timetable in the state
            setRenderTimetable(timetableToRender);
        }

        function loadCurrentClass() {
            let date = new Date();

            let day = date.getDay() - 1;
            let hour = date.getHours();
            let minute = date.getMinutes();

            if (day === -1 || day > timetable.daysPerWeek-1) {
                return;
            }

            let time = (hour * 60) + minute;

            let dayTimes = timetable.times[day];

            for (let i = 0; i < Object.keys(dayTimes).length; i++) {
                let dayTime = dayTimes[Object.keys(dayTimes)[i]];
                
                let classTimeStart = (parseInt(dayTime.start.split(':')[0]) * 60) + parseInt(dayTime.start.split(':')[1])
                let classTimeEnd = (parseInt(dayTime.end.split(':')[0]) * 60) + parseInt(dayTime.end.split(':')[1])
                
                if (time >= classTimeStart && time <= classTimeEnd) {
                    if (parsedTimetable == null)
                        return;
                    
                    props.setCurrentClass(parsedTimetable[i+1][day+1]);
                    setCurrentClassId(`${day+1}${i+1}`);
                }
            }
        }

        loadTimetable();
        loadCurrentClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsedTimetable, editMode])

    useEffect(() => {
        if (editMode)
            return;
        let element = (document.getElementById(`${currentClassId}`) as HTMLTableRowElement)
        if (element === null || classId === currentClassId) 
            return;
        element.style.backgroundColor = "red";

        if (classId !== "") {
            (document.getElementById(`${classId}`) as HTMLTableRowElement).style.backgroundColor = "var(--current-card)";
        }

        setClassId(currentClassId);

        if (parsedTimetable == null)
            return;
        
        props.setCurrentClass(parsedTimetable[parseInt(currentClassId[1])][parseInt(currentClassId[0])]);
    }, [currentClassId, classId, parsedTimetable, props]);

    const saveTimetable = () => {
        async function serializeTimetable() {
            let tempTimetable: timetableDataStructure = JSON.parse(JSON.stringify(timetable));
            tempTimetable["timetable"] = [];
            
            if (parsedTimetable == null) 
                return;
            let timetableParsed = parsedTimetable;

            for (let x = 1; x < timetableParsed[0].length; x++) {
                let row = [];

                for (let y = 1; y < timetableParsed.length; y++) {
                    let className = timetableParsed[y][x];

                    row.push(className);
                }

                tempTimetable["timetable"].push(row);
            }

            tempTimetable["timetableEmojis"] = classesList;

            // check if any changes have been made
            // there is no point uploading to the server and wasting bandwidth
            if (tempTimetable !== timetable)
                updateTimetable(props.tokens, tempTimetable, props.sheetId);
                setTimetable(tempTimetable);
        }

        serializeTimetable();
    }

    useEffect(() => {
        const updateClasses = setInterval(() => loadCurrentClass(), 60000);
        return () => {
            clearInterval(updateClasses);
        }
    }, [])

    const loadCurrentClass = () => {
        let date = new Date();

        let day = date.getDay() - 1;
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (day === -1 || day > timetable.daysPerWeek-1) {
            return;
        }

        let time = (hour * 60) + minute;

        let dayTimes = timetable.times[day];

        for (let i = 0; i < Object.keys(dayTimes).length; i++) {
            let dayTime = dayTimes[Object.keys(dayTimes)[i]];
            
            let classTimeStart = (parseInt(dayTime.start.split(':')[0]) * 60) + parseInt(dayTime.start.split(':')[1])
            let classTimeEnd = (parseInt(dayTime.end.split(':')[0]) * 60) + parseInt(dayTime.end.split(':')[1])
            
            if (time >= classTimeStart && time <= classTimeEnd) {
                if (parsedTimetable == null)
                    return;
                
                props.setCurrentClass(parsedTimetable[i+1][day+1]);
                setCurrentClassId(`${day+1}${i+1}`);
            }
        }
    }

    return (
        <div className="page-content timetable-container">
            <div className="timetable-header">
                <div className="timetable-header-text"><div className='ico ico-timetable'></div> Timetable</div>
                <button onClick={handleEdit}>{editMode ? "Save" : "Edit"}</button>
            </div>
            <table>
                <tbody>
                    {renderTimetable !== [] ? 
                        renderTimetable
                    :
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Timetable;