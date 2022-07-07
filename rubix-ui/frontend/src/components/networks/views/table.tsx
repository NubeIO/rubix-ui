import { Space, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";

import RbTable from "../../common/RbTable";
import { model } from "../../../../wailsjs/go/models";
import { DeleteHostNetwork } from "../../../../wailsjs/go/main/App";

export const NetworksTable = (props: any) => {
  const { networks, locations, refreshList, showModal, isFetching, connUUID } =
    props;
  if (!networks) return <></>;

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
      title: "Hosts number",
      dataIndex: "hosts",
      key: "hosts",
      render: (hosts: []) => <a>{hosts ? hosts.length : 0}</a>,
    },
    {
      title: "Location",
      dataIndex: "location_uuid",
      key: "location_uuid",
      render: (location_uuid: string) => (
        <span>{getLocationNameByUUID(location_uuid)}</span>
      ),
    },
    {
      title: "UUID",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, network: model.Network) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(`/hosts/${network.uuid}`, {
                state: { connUUID: connUUID },
              })
            }
          >
            View
          </a>
          <a
            onClick={() => {
              showModal(network);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              deleteNetwork(network.uuid);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const deleteNetwork = async (networkUUID: string) => {
    await DeleteHostNetwork(connUUID, networkUUID);
    refreshList();
  };

  const getLocationNameByUUID = (location_uuid: string) => {
    const location = locations.find(
      (l: model.Location) => l.uuid === location_uuid
    );
    return location ? location.name : "";
  };

  return (
    <RbTable
      rowKey="uuid"
      dataSource={networks}
      columns={columns}
      loading={{ indicator: <Spin />, spinning: isFetching }}
    />
  );
};
