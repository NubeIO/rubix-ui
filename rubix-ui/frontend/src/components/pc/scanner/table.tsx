import { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { RedoOutlined, PlusOutlined } from "@ant-design/icons";

import RbTable from "../../common/RbTable";
export const PcScanner = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setIsFetching(true);
    // const res = await Scanner("", "", 0, ["1662"]);
    const res = [
      //this is fake data
      {
        ip: "192.168.15.194",
        ports: [
          {
            service: "nube-assist",
            port: "1662",
            key: 1,
          },
        ],
      },
      {
        ip: "192.168.15.55",
        ports: [
          {
            service: "nube-assist",
            port: "1662",
            key: 1,
          },
        ],
      },
    ] as any;
    setData(res);
    setIsFetching(false);
  };

  const refreshList = () => {
    fetch();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ margin: "5px", float: "right" }}
      >
        <PlusOutlined /> Add
      </Button>
      <Button
        type="primary"
        onClick={refreshList}
        style={{ margin: "5px", float: "right" }}
      >
        <RedoOutlined /> Refresh
      </Button>
      <ScannerTable data={data} isFetching={isFetching} />
      <CreateModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

const ScannerTable = (props: any) => {
  let { data, isFetching } = props;
  if (!data) return <></>;

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      console.log("selectedRows: ", selectedRows);
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log("onSelect", record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log("onSelectAll", selected, selectedRows, changeRows);
    },
  };

  const columns = [
    {
      title: "Ip",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Port",
      dataIndex: "ports",
      render: (services: any[]) =>
        services.map((service) => (
          <p> {`${service.service}: ${service.port}`} </p>
        )),
      key: "ports",
    },
  ];

  return (
    <div>
      <RbTable
        rowKey="ip"
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        loading={{ indicator: <Spin />, spinning: isFetching }}
      />
    </div>
  );
};

const CreateModal = (props: any) => {
  const { isModalVisible, setIsModalVisible } = props;

  return (
    <Modal
      title="Add New"
      visible={isModalVisible}
      onOk={() => console.log("onOk")}
      onCancel={() => setIsModalVisible(false)}
      okText="Save"
      style={{ textAlign: "start" }}
    >
      ......form here
    </Modal>
  );
};
