import axios from "axios";

export async function addJob(job_url: string, job_name: string) {
  return await axios.post("http://localhost:3001/addJob", {
    job_url,
    job_name,
  });
}
export async function addMultiple(job_url_arr: string[], job_name: string) {
  return await axios.post("http://localhost:3001/addMultiple", {
    job_url_arr,
    job_name,
  });
}
export async function saveDataAndJobs() {
  return await axios.post("http://localhost:3001/saveDataAndJobs");
}
export async function loadOldData() {
  return await axios.get("http://localhost:3001/loadOldData");
}
