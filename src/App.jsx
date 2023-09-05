import MsaType1 from "./pages/msa-type-1";

import { lazy, Suspense } from "react";

const StickyHeader = lazy(() => import("./components/StickyHeader"));

function App() {
  return (
    <div className="App font-poppins">
      <StickyHeader />
      <div className="px-20 py-4  mt-[130px]">
        <Suspense
          fallback={
            <>
              <p className="w-screen h-screen">Loading...</p>
            </>
          }
        >
          <MsaType1 />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
