import { Button, Input, Radio, RadioChangeEvent, Typography } from "antd";
import { useState } from "react";

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
  };

  return (
    <>
      <Typography.Title>Filtro</Typography.Title>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <Typography>Nome:</Typography>
          <Input
            placeholder="fulano..."
            style={{ maxWidth: 250 }}
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <Radio.Group onChange={handleChangeGender} value={genderSelected}>
          <Radio value={"female"}>Female</Radio>
          <Radio value={"male"}>Male</Radio>
          <Radio value={"genderless"}>genderless</Radio>
          <Radio value={"unknown"}>unknown</Radio>
        </Radio.Group>

        <Radio.Group onChange={handleChangeStatus} value={statusSelected}>
          <Radio value={"alive"}>Alive</Radio>
          <Radio value={"dead"}>Dead</Radio>
          <Radio value={"unknown"}>unknown</Radio>
        </Radio.Group>

        <div>
          <Button type="primary" danger onClick={onResetFilter}>
            Resetar Filtro
          </Button>
        </div>
      </div>
    </>
  );
}
