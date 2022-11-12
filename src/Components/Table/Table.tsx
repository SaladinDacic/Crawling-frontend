import React from "react";
import { IdataForGraph } from "../../App";

interface ITableProps {
  dataForGraph: IdataForGraph[] | undefined;
}
export const Table = ({ dataForGraph }: ITableProps) => {
  return (
    <section className="tableSection">
      <table>
        <thead>
          <tr>
            <td>Image</td>
            <td>Brand</td>
            <td>Title</td>
          </tr>
        </thead>
        <tbody>
          {dataForGraph?.map((data, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <img src={data?.image_url} alt="" />
                </td>
                <td>{data?.brand}</td>
                <td>{data?.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
