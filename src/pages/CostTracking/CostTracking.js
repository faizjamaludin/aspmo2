import React, { useState } from "react";
import {
  DataTable,
  projectTaskColumn,
  ProjectExpandedComponent,
} from "../../helper";
import { useParams } from "react-router-dom";

// component

// icon
import { useGetBqByProjectIdQuery } from "../../features/api/costTrackingApi";

function CostTracking() {
  const { projectId } = useParams();
  const {
    data: costTracking = [],
    error,
    isLoading,
  } = useGetBqByProjectIdQuery(projectId);

  return (
    <section className="mr-10">
      <div className="flex flex-row justify-end mb-3">
        <div>
          <input
            type="text"
            placeholder="Search Task"
            className="border rounded-sm px-2 py-1 text-p w-[15rem]"
          />
        </div>
      </div>
      <div className="border rounded-md">
        <DataTable
          data={costTracking}
          columns={projectTaskColumn}
          expandableRows
          expandableRowDisabled={(row) => (row.childTask ? false : true)}
          expandOnRowClicked
          // expandableRowsHideExpander
          expandableRowsComponent={ProjectExpandedComponent}
          pagination
        />
      </div>
    </section>
  );
}

export default CostTracking;
