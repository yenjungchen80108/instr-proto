import React from "react";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { actConfigSelector } from "./store/selector";
import * as Tabs from "@radix-ui/react-tabs";
import Tab4 from "./panels/Tab4";

const Page = ({ isEditMode, ...props }) => {
  const {
    actConfig: { styles },
  } = useSelector(actConfigSelector);

  const tabConfig = [
    { label: "Act1", value: "tab1", content: "活動1" },
    { label: "Act2", value: "tab2", content: "活動2" },
    { label: "Act3", value: "tab3", content: "活動3" },
    { label: "Instruction", value: "instr", content: <Tab4 {...props} /> },
  ];

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="">
              {tabConfig.map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  className="TabsTrigger"
                  value={tab.value}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {tabConfig.map((tab) => (
              <Tabs.Content
                key={tab.value}
                className="TabsContent"
                value={tab.value}
              >
                {tab.value === "instr"
                  ? React.cloneElement(tab.content, { isEditMode })
                  : tab.content}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Page;
