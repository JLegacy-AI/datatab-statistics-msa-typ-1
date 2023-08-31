import StickyHeader from "./components/StickyHeader";
import MsaType1 from "./pages/msa-type-1";

function App() {
  return (
    <div className="App font-poppins">
      <StickyHeader />
      <div className="px-20 py-4  mt-[130px]">
        <MsaType1 />
      </div>
    </div>
  );
}

export default App;
