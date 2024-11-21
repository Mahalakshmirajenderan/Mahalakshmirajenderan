import React, { useState } from "react";

import MenuItem from "antd/es/menu/MenuItem";
import {
  Layout,
  Avatar,
  Menu,
  Button,
  Row,
  Col,
  Table,
  Space,
  Input,
  Modal,
  Typography,
  Popconfirm,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Checkbox, DatePicker, Form } from "antd";

import {
  DashboardOutlined,
  ExclamationCircleOutlined,
  CheckSquareOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const initialState = {
  date: undefined,
  title: "",
  description: "",
  priority: "",
  id: null,
};

const Homepage = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { Header, Sider, Content } = Layout;

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formValues, setFormValues] = useState(initialState);
  console.log(formValues, "formValues");

  const columnsStatus = [
    { title: "Task Title", dataIndex: "title", key: "title" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Task Description", dataIndex: "description", key: "description" },
    // { title: "Id", dataIndex: "id", key: "id" },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        
          <Space>
            <Button
              type="submit"
              style={{ backgroundColor: "#e04c40", borderColor: "#e04c40" }}
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />

            <Popconfirm
              title="Are you sure you want to delete this task?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button
                type="submit"
                style={{ backgroundColor: "#e04c40", borderColor: "#e04c40" }}
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Space>
        
      ),
      align: "center",
    },
  ];

  // const onFinish = () => {

  //   setData([...data, formValues]);
    
  // };
  const generateTaskId = () => {
    const randomFiveDigit = Math.floor(Math.random() * 90000) + 10000;
    return `Task_${randomFiveDigit}`;
  };


  const onFinish = () => {
    if (editingKey) {
           const updatedData = data.map((item) =>
        item.id === editingKey ? { ...item, ...formValues } : item
      );
      setData(updatedData);
      setEditingKey(null);
    } else {
      
      setData([...data, { ...formValues, id: generateTaskId() }]);
    }
    setIsModalOpen(false);
    setFormValues(initialState);
  };

  const showModal = () => {
    setFormValues(initialState);
    setIsModalOpen(true);
    setEditingKey(null);
    form.resetFields();
  };


  const handleDelete = (id) => {
   debugger; const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleEdit = (record) => {
   // form.setFieldsValue(record);
    setFormValues(record);
    setEditingKey(record.id);
    setIsModalOpen(true);
    

  };

  const handleInputField = (e, fieldName) => {
    setFormValues({ ...formValues, [fieldName]: e.target.value });
  };

  const handleDateChange = (e, fieldName, dateString) => {
    console.log(dateString, "dateString");
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: dayjs(e).format("YYYY-MM-DD"),
    }));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div>
      <Header style={{ backgroundColor: "white" }}>
        <Title level={1}>
          <span style={{ color: "#FF8A8A" }}>To</span>-Do
          <Input
            suffix={<SearchOutlined />}
            placeholder="Search task here..."
            style={{ width: "50%", maxWidth: "600px", marginLeft: "300px" }}
          ></Input>
        </Title>
      </Header>
      <br></br>

      <Modal
        open={isModalOpen}
        centered
        footer={() => {}}
        onCancel={() => setIsModalOpen((prev) => !prev)}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="Title" name="title" style={{ width: "100%" }}>
            <Input
              type="text"
              placeholder="Enter title here..."
              value={formValues.title}
              onChange={(e) => handleInputField(e, "title")}
            />
          </Form.Item>

          {/* <Form.Item label="Task ID" name="id" style={{ width: "100%" }}>
            <Input
              type="text"
              value={formValues.id}
              onChange={(e) => handleInputField(e, "id")}
            />
          </Form.Item> */}
          <Form.Item label="Date" name="date">
            <DatePicker
              name="date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              value={dayjs(formValues.date, "YYYY-MM-DD")}
              type="date"
              onChange={(e, dateString) =>
                handleDateChange(e, "date", dateString)
              }
            />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
           
          >
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                <Col span={7}>
                  <Checkbox
                    value="Extreme"
                    style={{ color: "#e04c40" }}
//checked={formValues.priority === "Extreme"}
                    onChange={(e) => handleInputField(e, "priority")}
                  >
                    Extreme
                  </Checkbox>
                </Col>
                <Col span={7}>
                  <Checkbox
                    value="Moderate"
                    style={{ color: "#e04c40" }}
                   
                    onChange={(e) => handleInputField(e, "priority")}
                  >
                    Moderate
                  </Checkbox>
                </Col>
                <Col span={7}>
                  <Checkbox
                    value="Low"
                    style={{ color: "#e04c40" }}
                   
                    onChange={(e) => handleInputField(e, "priority")}
                  >
                    Low
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Task Description"
            name="description"
            style={{ width: "100%" }}
          >
            <Input.TextArea
              rows={4}
              placeholder="Start writing here..."
              value={formValues.description}
              onChange={(e) => handleInputField(e, "description")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#e04c40",
                borderColor: "#e04c40",
                width: "20%",
              }}
              onClick={handleOk}
            >
            {editingKey ? "Save" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Layout>
        <Sider
          width={300}
          style={{
            backgroundColor: "#FF8A8A",
            height: "100vh",
            borderRadius: "10px",
          }}
        >
          <Menu className="sider-one">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 0",
              }}
            >
              <Avatar size={64} src="./dp.png" style={{ margin: 0 }} />
              <h3 style={{ color: "#fff", marginTop: 10 }}>Sundar Gurung</h3>
              <p style={{ color: "#fff", fontSize: "12px" }}>
                sundargurung360@gmail.com
              </p>
            </div>
            <MenuItem
              key="1"
              icon={<DashboardOutlined />}
              style={{ color: "white" }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              key="2"
              icon={<ExclamationCircleOutlined />}
              style={{ color: "white" }}
            >
              Vital Task
            </MenuItem>
            <MenuItem
              key="3"
              icon={<CheckSquareOutlined />}
              style={{ color: "white" }}
            >
              My Task
            </MenuItem>
            <MenuItem
              key="4"
              icon={<UnorderedListOutlined />}
              style={{ color: "white" }}
            >
              Task Categories
            </MenuItem>
            <MenuItem
              key="5"
              icon={<SettingOutlined />}
              style={{ color: "white" }}
            >
              Settings
            </MenuItem>
            <MenuItem
              key="6"
              icon={<QuestionCircleOutlined />}
              style={{ color: "white" }}
            >
              Help
            </MenuItem>
            <MenuItem
              key="7"
              icon={<LogoutOutlined />}
              style={{ color: "white" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sider>
        <Content>
          <div style={{ padding: "20px" }}>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "20px" }}
            >
              <Title level={3}>Task Categories</Title>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  title={() => (
                    <Row justify="space-between">
                      <Title level={5} style={{ margin: 0 }}>
                        Task Status
                      </Title>

                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#e04c40",
                          borderColor: "#e04c40",
                          color: "white",
                        }}
                        onClick={showModal}
                      >
                        Add Task
                      </Button>
                    </Row>
                  )}
                  columns={columnsStatus}
                  dataSource={data}
                  pagination={false}
                  bordered
                />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Homepage;
