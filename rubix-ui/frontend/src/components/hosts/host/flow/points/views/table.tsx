import { Button, Popconfirm, Space, Spin } from "antd";
import { useState } from "react";
import { FlowPointFactory } from "../factory";
import { FlowDeviceFactory } from "../../devices/factory";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { main, model } from "../../../../../../../wailsjs/go/models";
import { isObjectEmpty } from "../../../../../../utils/utils";
import { EditModal } from "./edit";
import { CreateModal } from "./create";
import Point = model.Point;
import RbTable from "../../../../../../common/rb-table";

export const FlowPointsTable = (props: any) => {
  const { data, isFetching, connUUID, hostUUID, deviceUUID, refreshList, pluginName } =
    props;
  const [selectedUUIDs, setSelectedUUIDs] = useState([] as Array<main.UUIDs>);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  // const [pluginName, setPluginName] = useState();
  const [schema, setSchema] = useState({});
  const [currentItem, setCurrentItem] = useState({});
  let flowPointFactory = new FlowPointFactory();

  const bulkDelete = async () => {
    flowPointFactory.connectionUUID = connUUID;
    flowPointFactory.hostUUID = hostUUID;
    flowPointFactory.BulkDelete(selectedUUIDs);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedUUIDs(selectedRows);
    },
  };

  const columns = [
    {
      title: "uuid",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "device",
      dataIndex: "device_uuid",
      key: "device_uuid",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, point: Point) => (
        <Space size="middle">
          <a
            onClick={() => {
              showEditModal(point);
            }}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  const getSchema = async (pluginName:string) => {
    setIsLoadingForm(true);
    const res = await flowPointFactory.Schema(
      connUUID,
      hostUUID,
      pluginName
    );
    const jsonSchema = {
      properties: res,
    };
    setSchema(jsonSchema);
    setIsLoadingForm(false);
  };

  const showEditModal = (item: any) => {
    setCurrentItem(item);
    setIsEditModalVisible(true);
    if (isObjectEmpty(schema)) {
      getSchema(pluginName);
    }
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setCurrentItem({});
  };

  const showCreateModal = (item: any) => {
    setIsCreateModalVisible(true);
    if (isObjectEmpty(schema)) {
      getSchema(pluginName);
    }
  };

  const closeCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  return (
    <>
      <Popconfirm title="Delete" onConfirm={bulkDelete}>
        <Button type="primary" danger style={{ margin: "5px", float: "right" }}>
          <DeleteOutlined /> Delete
        </Button>
      </Popconfirm>
      <Button
        type="primary"
        onClick={() => showCreateModal({} as Point)}
        style={{ margin: "5px", float: "right" }}
      >
        <PlusOutlined /> Add
      </Button>
      <RbTable
        rowKey="uuid"
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        loading={{ indicator: <Spin />, spinning: isFetching }}
      />
      <EditModal
        currentItem={currentItem}
        isModalVisible={isEditModalVisible}
        isLoadingForm={isLoadingForm}
        connUUID={connUUID}
        hostUUID={hostUUID}
        schema={schema}
        onCloseModal={closeEditModal}
        refreshList={refreshList}
      />
      <CreateModal
        isModalVisible={isCreateModalVisible}
        isLoadingForm={isLoadingForm}
        connUUID={connUUID}
        hostUUID={hostUUID}
        deviceUUID={deviceUUID}
        schema={schema}
        onCloseModal={closeCreateModal}
        refreshList={refreshList}
      />
    </>
  );
};
