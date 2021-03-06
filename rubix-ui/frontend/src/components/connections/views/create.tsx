import { useEffect, useState } from "react";
import { openNotificationWithIcon } from "../../../utils/utils";
import { Button, Modal, Spin } from "antd";
import { JsonForm } from "../../../common/json-form";
import { storage } from "../../../../wailsjs/go/models";
import RubixConnection = storage.RubixConnection;
import { PlusOutlined } from "@ant-design/icons";
import { ConnectionFactory } from "../factory";

export const CreateEditModal = (props: any) => {
  const {
    currentConnection,
    connectionSchema,
    isModalVisible,
    isLoadingForm,
    refreshList,
    onCloseModal,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState(currentConnection);
  let factory = new ConnectionFactory();

  useEffect(() => {
    setFormData(currentConnection);
  }, [currentConnection]);

  const addConnection = async (connection: RubixConnection) => {
    factory.this = connection;
    try {
      const res = await factory.Add();
      if (res && res.uuid) {
        openNotificationWithIcon("success", `added ${connection.name} success`);
      } else {
        openNotificationWithIcon("error", `added ${connection.name} fail`);
      }
    } catch (err) {
      openNotificationWithIcon("error", err);
      console.log(err);
    }
  };

  const editConnection = async (connection: RubixConnection) => {
    factory.this = connection;
    factory.uuid = connection.uuid;
    const res = factory.Update();
  };

  const handleClose = () => {
    setFormData({} as RubixConnection);
    onCloseModal();
  };

  const handleSubmit = (connection: RubixConnection) => {
    setConfirmLoading(true);
    if (currentConnection.uuid) {
      connection.uuid = currentConnection.uuid;
      editConnection(connection);
    } else {
      addConnection(connection);
    }
    setConfirmLoading(false);
    handleClose();
    refreshList();
  };

  return (
    <Modal
      title={
        currentConnection.uuid
          ? "Edit " + currentConnection.name
          : "Add New Connection"
      }
      visible={isModalVisible}
      onOk={() => handleSubmit(formData)}
      okText="Save"
      okButtonProps={{
      }}
      onCancel={handleClose}
      confirmLoading={confirmLoading}
      maskClosable={false} // prevent modal from closing on click outside
      style={{ textAlign: "start" }}
    >
      <Spin spinning={isLoadingForm}>
        <JsonForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          jsonSchema={connectionSchema}
        />
      </Spin>
    </Modal>
  );
};

export const AddButton = (props: any) => {
  const { showModal } = props;

  return (
    <Button
      type="primary"
      onClick={() => showModal({} as RubixConnection)}
      style={{ margin: "5px", float: "right" }}
    >
      <PlusOutlined /> Add
    </Button>
  );
};
