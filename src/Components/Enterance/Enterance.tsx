import React, { useState } from "react";

interface IEnteranceProps {
  handleAddJobToQuery: (jobUrl: string, jobName: string) => Promise<void>;
  handleAddMultipleJobsToQuery: (jobUrls: string[], jobName: string) => Promise<void>;
  single: boolean;
}
export const Enterance = ({ handleAddJobToQuery, handleAddMultipleJobsToQuery, single }: IEnteranceProps) => {
  const [jobUrl, setJobUrl] = useState("");
  const [jobUrls, setJobUrls] = useState<string[]>([]);
  const [jobName, setJobName] = useState("");

  return (
    <section className="enteranceSection">
      <div className="entryContainer">
        <h1>Crawler</h1>
        {single ? (
          <div className="entryContainer_newEntry">
            <label htmlFor="job_url">Job Url</label>
            <input
              onChange={(evt) => {
                setJobUrl(evt.target.value);
              }}
              value={jobUrl}
              type="text"
              name="job_url"
              id="job_url"
            />
          </div>
        ) : (
          <div className="entryContainer_newEntry">
            <label htmlFor="job_url">Job Url</label>
            <textarea
              onChange={(evt) => {
                let values = evt.target.value.split(",");
                setJobUrls(values);
              }}
              value={jobUrls.join(",")}
              name="job_url"
              id="job_url"
            />
          </div>
        )}
        <div className="entryContainer_newEntry">
          <label htmlFor="job_name">Job Name</label>
          <input
            onChange={(evt) => {
              setJobName(evt.target.value);
            }}
            value={jobName}
            type="text"
            name="job_name"
            id="job_name"
          />
        </div>

        {single ? (
          <button
            className="entryContainer_newEntry"
            onClick={() => {
              handleAddJobToQuery(jobUrl, jobName);
            }}
          >
            Add Job To Query
          </button>
        ) : (
          <button
            className="entryContainer_newEntry"
            onClick={() => {
              handleAddMultipleJobsToQuery(jobUrls, jobName);
            }}
          >
            Add Job To Query
          </button>
        )}
      </div>
    </section>
  );
};
