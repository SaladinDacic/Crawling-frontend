import { useEffect, useRef, useState } from "react";
import G6 from "@antv/g6";
import { IdataForGraph } from "../../App";

interface IAntvProps {
  dataForGraph: IdataForGraph[] | undefined;
}

export const AntV = ({ dataForGraph }: IAntvProps) => {
  const fontSize = 20;
  G6.registerNode("crect", {
    draw: (cfg: any, group: any) => {
      const width = cfg.id.length * 10;
      const rect = group.addShape("rect", {
        attrs: {
          x: 0,
          y: -10,
          ...cfg.style,
          width,
          height: 20,
          lineWidth: 0,
          opacity: 0,
        },
        name: "rect-shape",
        draggable: true,
      });
      const label = group.addShape("text", {
        attrs: {
          text: cfg.id,
          fill: "#000000",
          fontSize,
          x: 0,
          y: 0,
        },
        name: "label-shape",
        draggable: true,
      });

      return rect;
    },
    // @ts-ignore
  });

  let containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dataForGraph) {
      const data = dataCreator(dataForGraph);

      const descriptionDiv = document.createElement("div");
      containerRef.current?.appendChild(descriptionDiv);

      const width = containerRef.current?.scrollWidth;
      const height = containerRef.current?.scrollHeight || 500;
      const graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        modes: {
          default: ["drag-canvas" /*  "zoom-canvas" */],
        },
        defaultNode: {
          type: "crect",
        },
        defaultEdge: {
          type: "cubic-horizontal",
          style: {
            stroke: "#000000",
          },
        },
        layout: {
          type: "compactBox",
          direction: "LR",
          getId: function getId(d: any) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 40;
          },
          getVGap: function getVGap() {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          },
          getWidth: function getWidth(d: any) {
            return G6.Util.getTextSize(d.id, fontSize)[0] + 10;
          },
        },
        fitView: true,
      });
      graph.data(data);
      graph.render();

      return () => {
        <></>;
      };
    }

    return () => {};
  }, [dataForGraph]);

  return <div ref={containerRef} className="antV" id="container"></div>;
};

var dataCreator = (DataArr: IdataForGraph[]) => {
  return {
    id: "flaconi",
    children: [
      ...(new Set(
        DataArr.map((obj: IdataForGraph, idx) => {
          return obj.brand;
        }),
      ) as unknown as any),
    ].map((idParent: string, index: number) => {
      return {
        id: idParent,
        depth: 1,
        children: DataArr.map((obj: IdataForGraph, idx) => {
          return obj.brand === idParent
            ? {
                id: obj.title,
                depth: 2,
                style: {},
                type: "crect",
                x: 200,
                y: 20 + 20 * idx,
              }
            : null;
        }).filter((val) => {
          return val !== null;
        }),
        style: {},
        type: "crect",
        x: 96,
        y: 20 + 10 * index,
      };
    }),
    depth: 0,
    style: {},
    type: "crect",
    x: -150.079833984375,
    y: -28,
  };
};
