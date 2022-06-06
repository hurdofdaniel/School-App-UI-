import React, { useEffect, useState } from 'react';
import './fileHistory.css';

interface fileHistoryStructure {
    fileName: string,
    fileType: string,
    class: string,
    id: string,
    url: string
}

let fileHistory: fileHistoryStructure[] = [
    {
        "fileName": "Electricity",
        "fileType": "Docs",
        "class": "Science",
        "id": "1",
        "url": "https://www.google.com/search?q=Electricity"
    },
    {
        "fileName": "Electricity",
        "fileType": "Docs",
        "class": "Science",
        "id": "1",
        "url": "https://www.google.com/search?q=Electricity"
    },
    {
        "fileName": "Electricity",
        "fileType": "Docs",
        "class": "Science",
        "id": "1",
        "url": "https://www.google.com/search?q=Electricity"
    },
    {
        "fileName": "Electricity",
        "fileType": "Docs",
        "class": "Science",
        "id": "1",
        "url": "https://www.google.com/search?q=Electricity"
    },
    {
        "fileName": "Electricity",
        "fileType": "Docs",
        "class": "Science",
        "id": "1",
        "url": "https://www.google.com/search?q=Electricity"
    },
    {
        "fileName": "Electricity",
        "fileType": "Docs",
        "class": "Science",
        "id": "1",
        "url": "https://www.google.com/search?q=Electricity"
    },
]

function fetchHistory(tokens: any, data: fileHistoryStructure[]) {
    return fetch('/api/history/fetch/', {
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

function updateHistory(tokens: any, data: fileHistoryStructure[], sheetId: string) {
    return fetch('/api/history/update/', {
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

function History(props: any) {
    const [history, setHistory] = useState(props.history || fileHistory);
    const [renderHistory, setRenderHistory] = useState<JSX.Element[]>();
    const [fetched, setFetched] = useState(false);

    const loadFiles = () => {
        let historyComponents = [];

        for (let i = 0; i < history.length; i++) {
            historyComponents.push(
                <div className="files-content" key={i} onClick={() => window.open(history[i].url, "_blank")}>
                    <div className="file-icon-container">
                        <div className={`file-icon ico ico-${history[i].fileType}`} title={history[i].fileType}></div>
                    </div>
                    <div>
                        <p className="file-name">{history[i].fileName}</p>
                        <p className="file-class">{history[i].class}</p>
                    </div>
                    <div>
                        <div className="file-open ico ico-open" title="Open in New Tab"></div>
                    </div>
                </div>
            );
        }

        setRenderHistory(historyComponents);
    }

    useEffect(() => {
        async function fetchedHistory() {
            let historyData = await fetchHistory(props.tokens, history);
            setFetched(true);
            setHistory(historyData);
            updateHistory(props.tokens, historyData, props.sheetId);
        }

        loadFiles();
        if (!fetched) {
            fetchedHistory();
        }
    }, [JSON.stringify(history)]);

    useEffect(() => {
        setHistory(props.history);
        loadFiles();
    }, [JSON.stringify(props.history)]);

    return (
        <div className="page-content files-container">
            <div className='files-header'><div className='ico ico-file-history'></div> Files</div>
            <div className="files-content-container">
                {renderHistory?.length === 0 ? 
                    <p>No files found</p> 
                : 
                    renderHistory
                }
            </div>
        </div>
    );
}

export default History;