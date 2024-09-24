"use client";

import { Service } from "@/services/services";
import React from "react";

export default function page() {
  const service = new Service(8080);
  const { data } = service.useGet();

  console.log("data", data?.data);

  return (
    <div>
      <p>page</p>
    </div>
  );
}
