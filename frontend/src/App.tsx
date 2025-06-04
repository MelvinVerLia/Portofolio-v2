import "./App.css";
import Portfolio from "./component/Portofolio";
import { File, Play } from "lucide-react";

import { FAB } from "./component/FAB";
import { useState } from "react";
import ActionDialog from "./component/ActionDialog";

function App() {
  const [openDialog, setOpenDialog] = useState<
    "convert" | "youtube" | "image" | "chat" | null
  >(null);

  const actions = [
    {
      icon: File,
      label: "PDF Converter",
      onClick: () => setOpenDialog("convert"),
    },
    {
      icon: Play,
      label: "Youtube Downloader",
      onClick: () => setOpenDialog("youtube"),
    },
    {
      icon: File,
      label: "PDF Summarizer",
      onClick: () => setOpenDialog("image"),
    },
    {
      icon: File,
      label: "Chatbot",
      onClick: () => setOpenDialog("chat"),
    }
  ];

  return (
    <>
      {/* <Navbar /> */}
      <Portfolio />
      <FAB actions={actions} position="bottom-right" />
      <ActionDialog
        type={openDialog}
        onClose={() => setOpenDialog(null)}
      ></ActionDialog>
    </>
  );
}

export default App;
