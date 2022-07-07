import { Spin } from "antd";

import RbTable from "../../common/RbTable";

export const LocationsTable = (props: any) => {
  let { locations, isFetching, tableSchema } = props;
  if (!locations) return <></>;

  return (
    <div>
      <RbTable
        rowKey="uuid"
        dataSource={locations}
        columns={tableSchema}
        loading={{ indicator: <Spin />, spinning: isFetching }}
      />
    </div>
  );
};
