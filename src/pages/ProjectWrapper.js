import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";

// page
import { ProjectTask, ClaimTask, CostTracking } from "./index";

// component
import { Sidebar } from "../component";

// icon
import { BiPlus } from "react-icons/bi";
import { MdDownload } from "react-icons/md";
import { useGetProjectByProjectIdQuery } from "../features/api/projectApi";

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#5349DA",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontSize: "0.75rem",
    fontFamily: ["Poppins"].join(","),
    "&:hover": {
      color: "#8F98A9",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#5349DA",
      fontWeight: 600,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

function ProjectWrapper() {
  const { projectId } = useParams();
  const {
    data: projectData = [],
    error,
    isLoading,
  } = useGetProjectByProjectIdQuery(projectId);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex flex-row w-full">
      <nav className="w-[15rem] fixed">
        <Sidebar />
      </nav>
      <main
        className={`flex-1 min-h-screen ml-[15rem] bg-background md:w-[71rem] p-[1.5rem] duration-500 ease-in-out `}
      >
        <header className="flex flex-row items-start justify-start gap-x-2">
          <img src="/img/icon/task.png" alt="" className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col ">
            <h1 className="text-h1 font-medium text-blue-300 ">
              {projectData.projectName}
            </h1>
            <p className="text-h2 text-gray-300">
              View and manage your{" "}
              {value == "1"
                ? "task"
                : value == "2"
                ? "claim"
                : value == "3"
                ? "cost tracking"
                : ""}
            </p>
          </div>
        </header>
        <section className="mt-5 mr-10">
          <TabContext value={value}>
            <div className="border-b">
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Task" value="1" />
                <AntTab label="Claim" value="2" />
                <AntTab label="Cost Tracking" value="3" />
              </AntTabs>
            </div>

            <TabPanel value="1">
              <ProjectTask />
            </TabPanel>
            <TabPanel value="2">
              <ClaimTask />
            </TabPanel>
            <TabPanel value="3">
              <CostTracking />
            </TabPanel>
          </TabContext>
        </section>
      </main>
    </div>
  );
}

export default ProjectWrapper;
