import  {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  ReactNode,
} from "react";

type HeroContextType = {
  chatbot: boolean;
  setChatbot: Dispatch<SetStateAction<boolean>>;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const useHeroContext = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext must be used within a HeroContextProvider");
  }
  return context;
};

export const HeroContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [chatbot, setChatbot] = useState(false);
  return (
    <HeroContext.Provider value={{ chatbot, setChatbot }}>
      {children}
    </HeroContext.Provider>
  );
};
