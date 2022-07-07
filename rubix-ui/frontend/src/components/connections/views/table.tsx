import { useNavigate } from "react-router-dom";
import { Space, Spin } from "antd";

import RbTable from "../../common/RbTable";
import { storage } from "../../../../wailsjs/go/models";
import {openNotificationWithIcon} from "../../../utils/utils";
import {DeleteConnection, PingRubixAssist} from "../../../../wailsjs/go/main/App";

import RubixConnection = storage.RubixConnection;
export const ConnectionsTable = (props: any) => {
  const { connections, refreshList, showModal, isFetching } = props;
  if (!connections) return <></>;

  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Address",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
    },
    {
      title: "uuid",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, conn: RubixConnection) => (
        <Space size="middle">
          <a onClick={() => navigate(`locations/${conn.uuid}`)}>View</a>
          <a
            onClick={() => {
              showModal(conn);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              deleteConnection(conn.uuid);
            }}
          >
            Delete
          </a>
          <a
              onClick={() => {
                pingConnection(conn.uuid);
              }}
          >
            Ping
          </a>
        </Space>
      ),
    },
  ];

  const deleteConnection = async (uuid: string) => {
    await DeleteConnection(uuid);
    refreshList();
  };


    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record: any, selected: any, selectedRows: any) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

  const pingConnection = async (uuid: string) => {
    await PingRubixAssist(uuid).then(ok => {
      console.log("ping ok", ok, uuid)
      if (ok) {
        openNotificationWithIcon("success", `ping success`);
      } else {
        openNotificationWithIcon("error", `ping fail`);
      }
    })

    refreshList();
  };

  return (
    <div>
      <RbTable
        rowKey="uuid"
        dataSource={connections}
        rowSelection={rowSelection}
        columns={columns}
        loading={{ indicator: <Spin />, spinning: isFetching }}
      />
    </div>
  );
};
