import FlowCanvas from "./components/FlowCanvas/FlowCanvas";
import SideBar from "./components/SideBar/SideBar";
import css from "./App.module.css"

export default function App() {
  return (
    <div className={css.container}>
      <SideBar/>
      <FlowCanvas/>
    </div>
  )
}