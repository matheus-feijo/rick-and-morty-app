import { Funnel } from "@phosphor-icons/react";
import { Drawer, Form, Radio, Input, Tooltip, message } from "antd";
import { useState } from "react";
import { IFilter } from "../../../../interfaces/IFilter";
import styles from "./style.module.css";
import { ButtonFiltroCSS, LabelCSS, TitleDrawerCSS } from "./styled";

type Status = "alive" | "dead" | "unknown" | "";
type Gender = "female" | "male" | "genderless" | "unknown" | "";

export function Filter({
  handleChangeFilter,
}: {
  handleChangeFilter: (filtro: IFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [specie, setSpecie] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState<Status>("");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!name && !gender && !specie && !type && !status) {
      messageApi.error(
        "Coloque ao menos uma informação para poder aplicar o filtro"
      );
      return;
    }

    handleChangeFilter({
      name: name || "",
      status: status || "",
      species: specie || "",
      gender: gender || "",
      type: type || "",
    });

    onClose();
  };

  return (
    <div>
      {contextHolder}
      <Tooltip title="Filtro">
        <ButtonFiltroCSS onClick={showDrawer}>
          <Funnel size={32} />
        </ButtonFiltroCSS>
      </Tooltip>

      <Drawer
        title={<TitleDrawerCSS>Filtro</TitleDrawerCSS>}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className={styles["input-container"]}>
            <LabelCSS>Nome:</LabelCSS>
            <Input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles["input-container"]}>
            <LabelCSS>Especie:</LabelCSS>
            <Input
              className={styles.input}
              value={specie}
              onChange={(e) => setSpecie(e.target.value)}
            />
          </div>

          <div className={styles["input-container"]}>
            <LabelCSS>Tipo:</LabelCSS>
            <Input
              className={styles.input}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className={styles["input-container"]}>
            <LabelCSS>Status:</LabelCSS>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <Radio value={"alive"}>Alive</Radio>
              <Radio value={"dead"}>Dead</Radio>
              <Radio value={"unknown"}>Unknown</Radio>
            </Radio.Group>
          </div>

          <div className={styles["input-container"]}>
            <LabelCSS>Genero:</LabelCSS>
            <Radio.Group
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <Radio value={"female"}>Female</Radio>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"genderless"}>Genderless</Radio>
              <Radio value={"unknown"}>Unknown</Radio>
            </Radio.Group>
          </div>

          <div className={styles["container-aplica-filtro"]}>
            <button
              className={styles["button-aplica-filtro"]}
              onClick={handleSubmit}
            >
              Aplicar Filtro
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
