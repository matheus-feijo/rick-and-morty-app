import { Button, Checkbox, Input, Tooltip, Typography } from "antd";
import { useState } from "react";
import styles from "./style.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { useNotify } from "../../../../hooks/useNotify";

type Gender = "female" | "male" | "unknown" | "genderless" | "";
type Status = "alive" | "dead" | "unknown" | "";

export function Filtro({
  setParams,
  params,
  restartPageSelected,
}: {
  setParams: React.Dispatch<React.SetStateAction<string>>;
  params: string;
  restartPageSelected: () => void;
}) {
  const { contextholderNotification, openNotification } = useNotify();
  const [genderSelected, setGenderSelected] = useState<Gender>("");
  const [statusSelected, setStatusSelected] = useState<Status>("");
  const [name, setName] = useState("");

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | undefined>
  ) => {
    const { value } = e.target;
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    newParams.delete("name");
    newParams.append("page", "1");
    newParams.append("name", value);

    setParams(newParams.toString());
    setName(value);
    restartPageSelected();
  };

  const handleChangeGender = (checkedValue: Gender[]) => {
    const selectedGender = checkedValue[checkedValue.length - 1];

    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    newParams.delete("gender");
    newParams.append("page", "1");

    if (checkedValue.length === 0) {
      setParams(newParams.toString());
      setGenderSelected("");
      restartPageSelected();
      return;
    }

    newParams.append("gender", selectedGender);
    setParams(newParams.toString());
    setGenderSelected(selectedGender);
    restartPageSelected();
  };

  const handleChangeStatus = (checkedValue: Status[]) => {
    const selectedStatus = checkedValue[checkedValue.length - 1];

    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    newParams.delete("status");
    newParams.append("page", "1");

    if (checkedValue.length === 0) {
      setParams(newParams.toString());
      setStatusSelected("");
      restartPageSelected();
      return;
    }

    newParams.append("status", selectedStatus);
    setParams(newParams.toString());
    setStatusSelected(selectedStatus);
    restartPageSelected();
  };

  const onResetFilter = () => {
    const newParams = new URLSearchParams();
    newParams.append("page", "1");
    setGenderSelected("");
    setStatusSelected("");
    setName("");
    setParams(newParams.toString());

    if (!genderSelected && !name && !statusSelected) return;
    openNotification({
      type: "success",
      message: "Filtro Removido com sucesso!",
    });
  };

  return (
    <>
      {contextholderNotification}
      <Typography.Title
        style={{
          color: "#FFFF",
          display: "flex",
          // gap: 5,
          alignItems: "center",
        }}
      >
        Filtro{" "}
        <Tooltip title="Limpar Filtro" color="#878c8f">
          <Button type="text" onClick={onResetFilter}>
            <CloseOutlined style={{ color: "#878c8f", fontSize: 16 }} />
          </Button>
        </Tooltip>
      </Typography.Title>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div className={styles["content-filtro"]}>
          <Typography style={{ color: "#FFFF", width: "50px" }}>
            Nome:
          </Typography>
          <Input
            placeholder="fulano..."
            style={{ maxWidth: 250 }}
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className={styles["content-filtro"]}>
          <Typography style={{ color: "#FFFF", width: "50px" }}>
            Gênero:
          </Typography>
          <Checkbox.Group
            onChange={handleChangeGender}
            value={[genderSelected]}
          >
            <Checkbox value={"female"} style={{ color: "#FFFF" }}>
              Femêa
            </Checkbox>
            <Checkbox value={"male"} style={{ color: "#FFFF" }}>
              Macho
            </Checkbox>
            <Checkbox value={"genderless"} style={{ color: "#FFFF" }}>
              sem gênero
            </Checkbox>
            <Checkbox value={"unknown"} style={{ color: "#FFFF" }}>
              Desconhecido
            </Checkbox>
          </Checkbox.Group>
        </div>
        <div className={styles["content-filtro"]}>
          <Typography style={{ color: "#FFFF", width: "50px" }}>
            Status:
          </Typography>
          <Checkbox.Group
            onChange={handleChangeStatus}
            value={[statusSelected]}
          >
            <Checkbox value={"alive"} style={{ color: "#FFFF" }}>
              Vivo
            </Checkbox>
            <Checkbox value={"dead"} style={{ color: "#FFFF" }}>
              Morto
            </Checkbox>
            <Checkbox value={"unknown"} style={{ color: "#FFFF" }}>
              Desconhecido
            </Checkbox>
          </Checkbox.Group>
        </div>
      </div>
    </>
  );
}
