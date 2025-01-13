// import Form from "./Form";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { actConfigSelector } from "./store/selector";
import * as Tabs from "@radix-ui/react-tabs";
import Tab4 from "./panels/Tab4";

const page = () => {
  const {
    actConfig: { styles },
  } = useSelector(actConfigSelector);

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                Act1
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Act2
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab3">
                Act3
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="instr">
                Instruction
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
              test1
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
              test2
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
              test3
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="instr">
              <Tab4 />
            </Tabs.Content>
          </Tabs.Root>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default page;
