import { useState } from "react";
import StickyHeader from "./components/StickyHeader";
import MsaType1 from "./pages/msa-type-1";

function App() {
  const [tab, setTab] = useState(0);
  const tabs = [
    <MsaType1 />,
    <p>Tab-2</p>,
    <p>Tab-3</p>,
    <p>Tab-4</p>,
    <p>Tab-5</p>,
  ];

  return (
    <div className="App font-poppins">
      <StickyHeader setTab={setTab} tab={tab} />
      <div className="px-20 py-4  mt-[130px]">{tabs[tab]}</div>
    </div>
  );
}

export default App;
