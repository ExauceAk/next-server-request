import { Service } from "@/services/services";
import React from "react";

export default function page() {
  const service = new Service(8080);
  const { data } = service.useGet(["/type"]);

  return <div>{data}</div>;
}
