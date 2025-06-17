import PdfDialog from "./PdfDialog";
import YoutubeDialog from "./YoutubeDialog";
import ImageDialog from "./ImageDialog";
import ChatDialog from "./ChatDialog";

interface ActionDialogProps {
  type: "convert" | "youtube" | "image" | "chat" | null;
  onClose: () => void;
}

const ActionDialog = ({ type, onClose }: ActionDialogProps) => {
  if (!type) return null;

  return (
    <>
      {type === "convert" && <PdfDialog onClose={onClose} />}
      {type === "youtube" && <YoutubeDialog onClose={onClose} />}
      {type === "image" && <ImageDialog onClose={onClose} />}
      {type === "chat" && <ChatDialog onClose={onClose} />}
    </>
  );
};

export default ActionDialog;
