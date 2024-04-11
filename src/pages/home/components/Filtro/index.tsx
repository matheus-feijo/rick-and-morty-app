import { Input, Radio, RadioChangeEvent, Typography } from "antd";

export function Filtro({
  setParams,
  params,
  restartPageSelected,
}: {
  setParams: React.Dispatch<React.SetStateAction<string>>;
  params: string;
  restartPageSelected: () => void;
}) {
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

    restartPageSelected();
  };

  return (
    <>
      <Typography>Filtro</Typography>

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
            placeholder="Buscar por nome"
            style={{ maxWidth: 250 }}
            onChange={handleChangeName}
          />
        </div>

        <Radio.Group onChange={handleChangeGender}>
          <Radio value={"female"}>Female</Radio>
          <Radio value={"male"}>Male</Radio>
          <Radio value={"genderless"}>genderless</Radio>
          <Radio value={"unknown"}>unknown</Radio>
        </Radio.Group>
      </div>
    </>
  );
}
