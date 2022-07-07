import React from "react";
import Table from "antd/lib/table";

const DISPLAY_MAX_WIDTH = 1024;

const RbTable = (props: any) => (
  <Table {...props} scroll={{ x: DISPLAY_MAX_WIDTH }} />
);

export default RbTable;
