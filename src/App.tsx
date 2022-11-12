import "./App.scss";
import { useState, memo } from "react";
import { AntV, Enterance, Table } from "./Components";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { addJob, addMultiple, loadOldData, saveDataAndJobs } from "./api";
import { useUpdateGrapgh } from "./hooks";

export interface IdataForGraph {
  brand: string;
  title: string;
  image_url?: string;
}
function App() {
  const [dataForGraph, update] = useUpdateGrapgh();
  const [oldDataForGraph, setOldDataForGraph] = useState<IdataForGraph[]>();
  const [single, setSingle] = useState(true);

  const handleAddJobToQuery = async (jobUrl: string, jobName: string) => {
    if (jobUrl.length !== 0 && jobName.length !== 0) {
      try {
        await addJob(jobUrl, jobName);
        console.log("now update");
        //@ts-expect-error
        await update();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("please enter values");
    }
  };
  const handleAddMultipleJobsToQuery = async (jobUrls: string[], jobName: string) => {
    if (jobUrls.length !== 0 && jobName.length !== 0) {
      try {
        let response = await addMultiple(jobUrls, jobName);
        console.log(response);
        //@ts-expect-error
        update();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("please enter values");
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to={"/"}>Home</Link>
          <p
            onClick={() => {
              setSingle(!single);
            }}
          >
            {single ? "Enter Multiple Jobs ➣" : "Enter Single Job ➣"}
          </p>
          <p onClick={saveDataAndJobs}>Save Data and Jobs</p>
          {!oldDataForGraph ? (
            <p
              onClick={async () => {
                setOldDataForGraph((await loadOldData()).data);
              }}
            >
              Load Old Data
            </p>
          ) : (
            <p
              onClick={() => {
                setOldDataForGraph(undefined);
              }}
            >
              Show New Data
            </p>
          )}
          <Link to={"graph"}>Graph</Link>
        </nav>
        <Routes>
          <Route
            index
            element={
              <>
                <Enterance single={single} handleAddMultipleJobsToQuery={handleAddMultipleJobsToQuery} handleAddJobToQuery={handleAddJobToQuery} />
                <Table dataForGraph={oldDataForGraph || (dataForGraph as IdataForGraph[])} />
              </>
            }
          />
          <Route path="/graph" element={<AntV dataForGraph={oldDataForGraph || (dataForGraph as IdataForGraph[])} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default memo(App);
