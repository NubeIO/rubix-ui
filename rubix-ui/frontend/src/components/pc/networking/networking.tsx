import { Button, Spin, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import {
  GetPcGetNetworks,
  GetPcGetNetworksSchema,
  Scanner,
} from "../../../../wailsjs/go/main/App";
import RbTable from "../../common/RbTable";

export const PcNetworking = () => {
  const [data, setData] = useState([] as []);
  const [schema, setSchema] = useState([] as []);
  const [isFetching, setIsFetching] = useState(true);
  const fetch = async () => {
    setIsFetching(true);
    const res = await GetPcGetNetworks();
    setData(res);
    setIsFetching(false);
  };
  const fetchSchema = async () => {
    const res = await GetPcGetNetworksSchema();
    console.log("res", res);
    setSchema(res);
  };

  useEffect(() => {
    setIsFetching(false);
    fetch();
    fetchSchema();
  }, []);

  const refreshList = () => {
    fetch()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Rubix Scanner</h1>
      <Button
        type="primary"
        onClick={refreshList}
        style={{ margin: "5px", float: "right" }}
      >
        <RedoOutlined /> Refresh
      </Button>
      <ScannerTable data={data} schema={schema} isFetching={isFetching} />
    </>
  );
};

const ScannerTable = (props: any) => {
  let { data, isFetching, schema } = props;

  if (!data) return <></>;

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const columns = schema.sort((a: any, b: any) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  });

  return (
    <div>
      <RbTable
        rowKey="interface"
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        loading={{ indicator: <Spin />, spinning: isFetching }}
      />
    </div>
  );
};
