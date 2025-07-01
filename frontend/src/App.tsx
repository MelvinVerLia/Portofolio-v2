import "./App.css";
import Portfolio from "./component/layout/Portofolio";
import { File, Play } from "lucide-react";
import { FAB } from "./component/FAB/FAB";
import { useState } from "react";
import ActionDialog from "./component/FAB/ActionDialog";
import { NotificationContextProvider } from "./context/NotificationContextProvider";
import { HeroContextProvider } from "./context/HeroContextProvider";

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
    },
  ];

  return (
    <>
      <NotificationContextProvider>
        <HeroContextProvider>
          <Portfolio />
          <FAB actions={actions} position="bottom-right" />
          <ActionDialog
            type={openDialog}
            onClose={() => setOpenDialog(null)}
          ></ActionDialog>
        </HeroContextProvider>
      </NotificationContextProvider>
    </>
  );
}

export default App;
