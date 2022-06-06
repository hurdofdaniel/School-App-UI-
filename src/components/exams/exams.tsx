import React, { useEffect, useState } from 'react';
import './exams.css'

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

let exams: examStructure[] = [
  {
    className: "Digi P",
    examNumber: "91883",
    url: "https://www.nzqa.govt.nz/ncea/assessment/view-detailed.do?standardNumber=91883",
    files: [
      {
        fileName: "Digi P - 91883 - 25/05/22",
        fileType: "Docs",
        fileUrl: "https://google.com/search?q=computer+science",
      }
    ],
  }
]

function fetchExams() {
  return exams;
}

function updateExams(tokens: any, data: examStructure[], sheetId: string) {
  return fetch('/api/exams/update/', {
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

function Exams(props: any) {
  const [exams, setExams] = useState<examStructure[]>(props.exams || fetchExams());
  const [renderExams, setRenderExams] = useState<JSX.Element[]>([]);

  const [addingExam, setAddingExam] = useState(false);
  const [newExamName, setNewExamName] = useState<string>("");

  const showResources = (id: string) => {
    let resourceContainer = document.getElementById(id);
    if (resourceContainer == null)
      return;

    if (resourceContainer.style.display === "none") {
      resourceContainer.style.display = "block";
    } else {
      resourceContainer.style.display = "none";
    }
  }

  const loadExams = () => {
    let renderContent = [];

    for (let i = 0; i < exams.length; i++) {
      // Display files being used with the exam
      // Have access to the link to the exam

      renderContent.push(
        <div className="exam-root" key={i}>
          <div className="exam" onClick={() => showResources(`resources${i}`)}>
            <div className="exam-info">
              <p className="exam-class">{exams[i].className}</p>
              <p className="exam-number">AN: {exams[i].examNumber}</p>
            </div>
            <div className="exam-icon">{Object.keys(props.emojis).includes(exams[i].className) ? props.emojis[exams[i].className] : ""}</div>
          </div>
          <div className="exam-resources" id={`resources${i}`} style={{ display: "none" }}>
            <p className="exam-resource-title">Resources</p>
            <div className="exam-resource-list">
              <div className="exam-content" key={0} onClick={() => window.open(exams[i].url, "_blank")}>
                <div className="exam-icon-container">
                  <div className={`exam-resource-icon ico-Docs`}></div>
                </div>
                <div className="exam-name-container">
                  <p className="exam-name">NCEA Link for assessment</p>
                </div>
              </div>
              {exams[i].files.map((file, index) => {
                return (
                  <div className="exam-content" key={index + 1} onClick={() => window.open(file.fileUrl, "_blank")}>
                    <div className="exam-icon-container">
                      <div className={`exam-resource-icon ico-${file.fileType}`}></div>
                    </div>
                    <div className="exam-name-container">
                      <p className="exam-name">{file.fileName}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    setRenderExams(renderContent);
  }

  useEffect(() => {
    loadExams();
  }, [JSON.stringify(exams), JSON.stringify(props.emojis)]);

  useEffect(() => {
    console.log("Updating");
    setExams(props.exams);
    loadExams();
  }, [JSON.stringify(props.exams)])

  useEffect(() => {
    function changeVisibility() {
      let show = "addExam";
      let hide = "allExams"
      if (!addingExam) {
        show = "allExams";
        hide = "addExam";
      }
      (document.getElementById(show) as HTMLDivElement).style.display = "block";
      (document.getElementById(hide) as HTMLDivElement).style.display = "none";
    }

    function saveExam() {
      if (!addingExam && newExamName !== "") {
        let tempExams = exams;

        tempExams.push({
          className: props.currentClass,
          examNumber: newExamName,
          url: `https://www.nzqa.govt.nz/ncea/assessment/view-detailed.do?standardNumber=${newExamName}`,
          files: [],
        })
        setExams(tempExams);
        updateExams(props.tokens, tempExams, props.sheetId)
        loadExams();
        setNewExamName("");
      }
    }

    changeVisibility();
    saveExam();
  }, [addingExam]);

  return (
    <div className="page-content exams-container">
      <div className="exams-header">
        <div className='exams-header-text'><div className='ico ico-exams'></div> Exams</div>
        <button onClick={() => setAddingExam(!addingExam)}>{addingExam ? "Save" : "Add"}</button>
      </div>
      <div className="exams-content" id="addExam">
        <p>New Exam</p>
        <p>Class: {props.currentClass}</p>
        <p>Assessment Number:</p>
        <input value={newExamName} onChange={(e) => setNewExamName(e.target.value)} />
      </div>
      <div className="exams-content" id="allExams">
        {renderExams.length !== 0 ?
          renderExams
          :
          <p>Loading...</p>
        }
      </div>
    </div>
  );
}

export default Exams;