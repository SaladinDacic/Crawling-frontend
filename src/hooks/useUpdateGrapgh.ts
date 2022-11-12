import axios from "axios";
import React, { useEffect, useState } from "react";

export interface IdataForGraph {
  brand: string;
  title: string;
  image_url?: string;
}
export const useUpdateGrapgh = () => {
  const [dataForGraph, setDataForGraph] = useState<IdataForGraph[]>();
  // //@ts-expect-error
  const update = setDataForGraph.bind(null, undefined);

  useEffect(() => {
    (async () => {
      // const jobs = await getJobs();
      const tableData = await getDataForTable();
      setDataForGraph(tableData);
    })();
  }, [dataForGraph?.length]);

  return [dataForGraph, update, setDataForGraph];
};

async function getJobs() {
  let { data } = await axios.get("http://localhost:3001/getAllJobs");
  // console.log(data);
  return data;
}
async function getDataForTable() {
  let { data } = await axios.get("http://localhost:3001/getAllData");
  console.log(data);
  return data;
}
