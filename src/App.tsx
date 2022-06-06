import './App.css';
import './icons.css';
import './page.css';
import './header.css'
import Classroom from './components/classroom/classroom';
import Creator from './components/creator/creator';
import Exams from './components/exams/exams';
import Other from './components/other/other';
import QuickLinks from './components/quickLinks/quickLinks';
import QuickTools from './components/quickTools/quickTools';
import Timetable from './components/timetable/timetable';
import History from './components/fileHistory/fileHistory';
import { useEffect, useState } from 'react';
import Auth from './components/auth/auth';

function fetchData(tokens: any, sheetId: string) {
  return fetch('/api/data/fetch/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tokens: tokens,
      sheetId: sheetId
    })
  })
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

function renewTokens(tokens: any, time: any) {
  return fetch('/api/auth/renew/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tokens: tokens,
      time: time
    })
  })
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tokens, setTokens] = useState(JSON.parse(localStorage.getItem('tokens')!));
  const [data, setData] = useState<any>(JSON.parse(localStorage.getItem('data')!));
  const [sheetId, setSheetId] = useState<any>(localStorage.getItem('configId')!);

  const renew = async () => {
    let date = new Date();
    let time = date.getTime();

    let newTokens = await renewTokens(tokens, time);
    setTokens(newTokens);
    return newTokens;
  }

  useEffect(() => {
    let renewInterval: NodeJS.Timer | null = null;
    async function load() {

      if (tokens) {
        let date = new Date();
        let time = date.getTime()
        
        if (tokens.expiry_date > time) {
          setIsLoggedIn(true);
          setData(await fetchData(tokens, sheetId));
          console.log((tokens.expiry_date - time));
          renewInterval = setInterval(() => renew(), tokens.expiry_date - time);
        } else {
          console.log("expired")
          let tokensData = await renew();
          setIsLoggedIn(true);
          console.log((tokensData.expiry_date - time));
          renewInterval = setInterval(() => renew(), tokensData.expiry_date - time);
        }
      }
    }
    load();

    return () => {
      if (renewInterval) {
        clearInterval(renewInterval);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('configId', sheetId);
  }, [JSON.stringify(tokens), JSON.stringify(data), JSON.stringify(sheetId)]);


  const [currentClass, setCurrentClass] = useState<string | null>();
  const [emojis, setEmojis] = useState<any | null>({});

  useEffect(() => {
    if (Object.keys(emojis).length === 0)
      return;
    let tempData = data;
    tempData.timetable.timetableEmojis = emojis;
    setData(tempData);
  }, [JSON.stringify(emojis)]);

  const [nightScheme, setNightScheme] = useState<boolean>((localStorage.getItem("nightScheme") === "true") || false);

  useEffect(() => {
    function changeColors() {
      let colorsList = [
        "--scheme-background",
        "--scheme-card",
        "--scheme-shadow-card",
        "--scheme-text",
        "--scheme-shadow",
        "--scheme-shadow-hover",
        "--scheme-icon",
        "--scheme-scrollbar",
      ];

      for (let i = 0; i < colorsList.length; i++) {
        let schemeName = colorsList[i];
        let currentScheme = schemeName.replace("scheme", "current");
        let colorScheme = schemeName
        if (nightScheme) {
          colorScheme = schemeName.replace("scheme", "dark");
        } else {
          colorScheme = schemeName.replace("scheme", "light");
        }

        let root = document.querySelector(":root") as any;

        root.style.setProperty(currentScheme, `var(${colorScheme})`);
      }
    }

    changeColors();
    localStorage.setItem("nightScheme", nightScheme.toString());
  }, [nightScheme]);

  if (!isLoggedIn) {
    return (
      <Auth setData={setData} setTokens={setTokens} setLoggedIn={setIsLoggedIn} setSheetId={setSheetId} />
    )
  } else {
    return (
      <div className="App">
        <div className="header-container">
          <div className="header-background"></div>

          <p className="header-text">Helpers</p>
          <div className="header-content">
            <QuickLinks />

            <QuickTools />

            <Other tokens={JSON.parse(JSON.stringify(tokens))} setLoggedIn={setIsLoggedIn} nightScheme={nightScheme} setNightScheme={setNightScheme} />
          </div>
        </div>

        <div className="page-container">
          <div className="page-column">
            <Creator setData={setData} data={JSON.parse(JSON.stringify(data))} sheetId={sheetId} exams={JSON.parse(JSON.stringify(data?.exams))} history={JSON.parse(JSON.stringify(data.fileHistory))} tokens={JSON.parse(JSON.stringify(tokens))} currentClass={currentClass} fileFolders={JSON.parse(JSON.stringify(data?.folders))} />

            <Exams exams={JSON.parse(JSON.stringify(data?.exams))} currentClass={currentClass} emojis={JSON.parse(JSON.stringify(emojis))} tokens={JSON.parse(JSON.stringify(tokens))} sheetId={sheetId} />
          </div>

          <div className="page-column">
            <History history={JSON.parse(JSON.stringify(data.fileHistory))} tokens={tokens} sheetId={sheetId} />
          </div>

          <div className="page-column">
            <Classroom sheetId={sheetId} tokens={JSON.parse(JSON.stringify(tokens))} classroomData={JSON.parse(JSON.stringify(data?.classes))} currentClass={currentClass} emojis={JSON.parse(JSON.stringify(emojis))} />

            <Timetable sheetId={sheetId} tokens={JSON.parse(JSON.stringify(tokens))} timetableData={JSON.parse(JSON.stringify(data?.timetable))} setCurrentClass={setCurrentClass} setEmojis={setEmojis} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;