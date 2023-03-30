import { Funnel } from "@phosphor-icons/react";
import { Drawer, Form, Radio, Button, Input, Tooltip } from "antd";
import { useState } from "react";
import { IFilter } from "../../interfaces/IFilter";

export function Filter({
  handleChangeFilter,
}: {
  handleChangeFilter: (filtro: IFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const [formFiltro] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
    handleChangeFilter({
      name: values.name || "",
      status: values.status || "",
      species: values.specie || "",
      gender: values.gender || "",
      type: values.type || "",
    });

    onClose();
    formFiltro.resetFields();
  };

  return (
    <div style={{ padding: "50px 0px 20px 50px" }}>
      <Tooltip title="Filtro">
        <Button
          id="filtro"
          onClick={showDrawer}
          style={{ cursor: "pointer", borderRadius: 8, height: 42 }}
        >
          <Funnel size={32} />
        </Button>
      </Tooltip>

      <Form
        id="form-filtro"
        layout="vertical"
        onFinish={onFinish}
        form={formFiltro}
      >
        <Drawer title="Filtro" placement="right" onClose={onClose} open={open}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Specie" name="specie">
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={"alive"}>Alive</Radio>
              <Radio value={"dead"}>Dead</Radio>
              <Radio value={"unknown"}>Unknown</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value={"female"}>Female</Radio>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"genderless"}>Genderless</Radio>
              <Radio value={"unknown"}>Unknown</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button htmlType="submit" form="form-filtro" type="primary">
              Aplicar filtro
            </Button>
          </div>
        </Drawer>
      </Form>
    </div>
  );
}
