import Header from "./components/header/Header";
import Body from "./components/body/Body";
import cupons from "./utils/cupons.json";

function App() {
  return (
    <>
      <div className="w-screen min-h-screen flex justify-center bg-[#1526FF]">
        <div className="w-full xl:max-w-7xl relative">
          <Header />
          <Body cupons={cupons} />
        </div>
      </div>
    </>
  );
}

export default App;
