import { Funnel } from "@phosphor-icons/react";
import { Drawer, Form, Radio, Input, Tooltip } from "antd";
import { useState } from "react";
import { IFilter } from "../../interfaces/IFilter";
import { ButtonCSS } from "../ButtonCSS";

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
    if (Object.values(values).filter((value) => !value).length === 5) {
      alert("Preencha ao menos algum campo para aplicar filtro");
      return;
    }

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
        <ButtonCSS typeCSS="ICON" id="filtro" onClick={showDrawer}>
          <Funnel size={32} />
        </ButtonCSS>
      </Tooltip>

      <Form
        id="form-filtro"
        layout="vertical"
        onFinish={onFinish}
        form={formFiltro}
      >
        <Drawer title="Filtro" placement="right" onClose={onClose} open={open}>
          <Form.Item label="Nome" name="name">
            <Input data-testid="name-test" />
          </Form.Item>
          <Form.Item label="Especie" name="specie">
            <Input />
          </Form.Item>

          <Form.Item label="Tipo" name="type">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={"alive"}>Alive</Radio>
              <Radio value={"dead"}>Dead</Radio>
              <Radio value={"unknown"}>Unknown</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Genero" name="gender">
            <Radio.Group>
              <Radio value={"female"}>Female</Radio>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"genderless"}>Genderless</Radio>
              <Radio value={"unknown"}>Unknown</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonCSS type="submit" form="form-filtro" submit>
              Aplicar filtro
            </ButtonCSS>
          </div>
        </Drawer>
      </Form>
    </div>
  );
}
