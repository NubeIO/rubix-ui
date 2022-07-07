import { Spin } from "antd";

import RbTable from "../../common/RbTable";

export const LogsTable = (props: any) => {
  const { logs, isFetching } = props;
  if (!logs) return <></>;

  const columns = [
    {
      title: "uuid",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "Timestamp",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Table",
      dataIndex: "function",
      key: "function",
    },
    {
      title: "Action Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <RbTable
      rowKey="uuid"
      dataSource={logs}
      columns={columns}
      loading={{ indicator: <Spin />, spinning: isFetching }}
    />
  );
};
