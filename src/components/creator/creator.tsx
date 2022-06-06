import React, { useState } from 'react';
import './creator.css';

interface fileHistoryStructure {
    fileName: string,
    fileType: string,
    class: string,
    id: string,
    url: string
}

interface newFileStructure {
    fileName: string,
    classFolderId: string,
    fileType: string,
}

interface examStructure {
    className: string,
    examNumber: string,
    url: string,
    files: examFileStructure[],
  }

interface examFileStructure {
    fileName: string,
    fileType: string,
    fileUrl: string,
}

interface FileRequestData {
    historyData: fileHistoryStructure[],
    exam: examStructure[],
    url: string | null
}

function newFile(tokens: any, newData: {exam: examFileStructure, historyData: fileHistoryStructure, newFile: newFileStructure}, data: {exam: examFileStructure[], historyData: fileHistoryStructure[], url: string | null}, sheetId: string) {
    return fetch('/api/creator/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokens: tokens,
            data: data,
            newData: newData,
            sheetId: sheetId
        })
    })
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function Creator(props: any) {
    // Get current class from props
    const [fileName, setFileName] = useState('');

    const handleInput = (e: any) => {
        setFileName(e.target.value);
    }

    const handleSubmit = async (type: string) => {
        if (fileName === '') {
            alert('Please enter a file name');
            return;
        }
        if (props.currentClass === undefined) {
            alert('Please select a class');
            return;
        }

        let currentDate = new Date()
        let day = currentDate.getDate().toString().length === 1 ? 
            '0' + currentDate.getDate().toString() : 
            currentDate.getDate().toString();
        let month = (currentDate.getMonth() + 1).toString().length === 1 ?
            '0' + (currentDate.getMonth() + 1).toString() :
            (currentDate.getMonth() + 1).toString();
        let year = parseInt(currentDate.getFullYear().toString().substring(2));

        let fullFileName = `${fileName} - ${props.currentClass} - ${day}/${month}/${year}`;
        console.log(`Making new ${type} called:`)
        console.log(`${fileName} - ${props.currentClass} - ${day}/${month}/${year}`);

        let folderId = "";

        let newFolder = props.fileFolders;
        for (let i = 0; i < newFolder.length; i++) {
            if (newFolder[i].folderName === props.currentClass) {
                folderId = newFolder[i].folderId;
            }
        }

        console.log(folderId);

        let fileHistory: fileHistoryStructure = {
            class: props.currentClass,
            fileName: fullFileName,
            fileType: type,
            id: "",
            url: ""
        }

        let newFileData: newFileStructure = {
            fileName: fullFileName,
            classFolderId: folderId,
            fileType: type
        }

        let examFile: examFileStructure = {
            fileName: fullFileName,
            fileType: type,
            fileUrl: ""
        }

        console.log(fileHistory);
        console.log(newFileData);
        console.log(examFile);

        // store the res in the correct variables, pass in set the states and set them
        let res: {data: FileRequestData} = await newFile(props.tokens, {exam: examFile, historyData: fileHistory, newFile: newFileData}, {exam: props.exams, historyData: props.history, url: null}, props.sheetId);
        console.log(res);

        let tempData = props.data;
        tempData.exams = res.data.exam;
        tempData.fileHistory = res.data.historyData;

        props.setData(tempData);

        window.open(res.data.url!, '_blank');
    }

    return (
        <div className="page-content new-file-container">
            <div className='new-file-header'><div className='ico ico-creator'></div> New File</div>
            <div className='new-file-content'>
                <input value={fileName} onChange={handleInput} type="text" className="new-file-name" />
                <div>
                    <button onClick={() => handleSubmit("Docs")} className="new-file-button new-docs-button">Docs</button>
                </div>
                <div>
                    <button onClick={() => handleSubmit("Sheets")} className="new-file-button new-sheets-button">Sheets</button>
                    <button onClick={() => handleSubmit("Slides")} className="new-file-button new-slides-button">Slides</button>
                </div>
            </div>
        </div>
    );
}

export default Creator;