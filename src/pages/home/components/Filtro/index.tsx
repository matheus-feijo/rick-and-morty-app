import {
  Button,
  Input,
  Radio,
  RadioChangeEvent,
  Tooltip,
  Typography,
} from "antd";
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

  const handleChangeGender = (e: RadioChangeEvent) => {
    const { value } = e.target;
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    newParams.delete("gender");

    newParams.append("page", "1");
    newParams.append("gender", value);
    setParams(newParams.toString());

    if (value === genderSelected) {
      setGenderSelected("");
      restartPageSelected();
      return;
    }

    setGenderSelected(value);
    restartPageSelected();
  };

  const handleChangeStatus = (e: RadioChangeEvent) => {
    const { value } = e.target;
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    newParams.delete("status");

    newParams.append("page", "1");
    newParams.append("status", value);
    setParams(newParams.toString());

    if (value === genderSelected) {
      setStatusSelected("");
      restartPageSelected();
      return;
    }

    setStatusSelected(value);

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
            Genero:
          </Typography>
          <Radio.Group onChange={handleChangeGender} value={genderSelected}>
            <Radio value={"female"} style={{ color: "#FFFF" }}>
              Female
            </Radio>
            <Radio value={"male"} style={{ color: "#FFFF" }}>
              Male
            </Radio>
            <Radio value={"genderless"} style={{ color: "#FFFF" }}>
              genderless
            </Radio>
            <Radio value={"unknown"} style={{ color: "#FFFF" }}>
              unknown
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles["content-filtro"]}>
          <Typography style={{ color: "#FFFF", width: "50px" }}>
            Status:
          </Typography>
          <Radio.Group onChange={handleChangeStatus} value={statusSelected}>
            <Radio value={"alive"} style={{ color: "#FFFF" }}>
              Alive
            </Radio>
            <Radio value={"dead"} style={{ color: "#FFFF" }}>
              Dead
            </Radio>
            <Radio value={"unknown"} style={{ color: "#FFFF" }}>
              unknown
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </>
  );
}
