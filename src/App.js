import React, {useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import InfoCard from './components/InfoCard'

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Header setShowInfo={setShowInfo} showInfo={showInfo}/>
      <Main  showInfo={showInfo}/>
      {showInfo && <InfoCard setShowInfo={setShowInfo}/>}
      <Footer />
    </>
  );
}

export default App;
