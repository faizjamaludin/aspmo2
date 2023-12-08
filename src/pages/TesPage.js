import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetAllProjectQuery } from "../features/api/projectApi";
import { Calendar } from "primereact/calendar";

function TesPage() {
  const { data: project = [], error, isLoading } = useGetAllProjectQuery();

  const tableStyle = {
    fontSize: "0.75rem",
  };

  const headerStyle = {
    height: "200px",
  };

  const [date, setDate] = useState();

  return (
    <div>
      <DataTable
        value={project}
        tableStyle={tableStyle}
        headerStyle={{
          height: "10rem",
        }}
        size="large"
        paginator
        showGridlines
        rows={10}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column
          field="projectName"
          header="Project Name"
          style={{ width: "20rem" }}
        ></Column>
        <Column field="status" header="Status"></Column>
        <Column field="startDate" header="Plan Start"></Column>
        <Column field="endDate" header="Plan End"></Column>
        <Column field="creator" header="Creator"></Column>
      </DataTable>
      <div>
        <Calendar value={date} onChange={(e) => setDate(e.value)} />
      </div>
    </div>
  );
}

export default TesPage;

{
}
