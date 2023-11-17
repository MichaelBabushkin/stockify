import React, { useState } from "react";
import {
  Table,
  Popover,
  Whisper,
  Checkbox,
  Dropdown,
  IconButton,
  Progress,
} from "rsuite";
import NameCell from "./NameCell";
import CheckCell from "./CheckCell";
import ImageCell from "./ImageCell";
import ActionCell from "./ActionCell";
const { Column, HeaderCell, Cell } = Table;

function StockTable(data) {
  const [checkedKeys, setCheckedKeys] = useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  // <Table height={300} data={data} id="table">
  //   <Column width={50} align="center">
  //     <HeaderCell style={{ padding: 0 }}>
  //       <div style={{ lineHeight: "40px" }}>
  //         <Checkbox
  //           inline
  //           checked={checked}
  //           indeterminate={indeterminate}
  //           onChange={handleCheckAll}
  //         />
  //       </div>
  //     </HeaderCell>
  //     <CheckCell
  //       dataKey="id"
  //       checkedKeys={checkedKeys}
  //       onChange={handleCheck}
  //     />
  //   </Column>
  //   <Column width={80} align="center">
  //     <HeaderCell>Avartar</HeaderCell>
  //     <ImageCell dataKey="avartar" />
  //   </Column>

  //   <Column width={160}>
  //     <HeaderCell>Name</HeaderCell>
  //     <NameCell dataKey="name" />
  //   </Column>

  //   <Column width={230}>
  //     <HeaderCell>Skill Proficiency</HeaderCell>
  //     <Cell style={{ padding: "10px 0" }}>
  //       {(rowData) => (
  //         <Progress percent={rowData.progress} showInfo={false} />
  //       )}
  //     </Cell>
  //   </Column>

  //   <Column width={100}>
  //     <HeaderCell>Rating</HeaderCell>
  //     <Cell>
  //       {(rowData) =>
  //         Array.from({ length: rowData.rating }).map((_, i) => (
  //           <span key={i}>⭐️</span>
  //         ))
  //       }
  //     </Cell>
  //   </Column>

  //   <Column width={100}>
  //     <HeaderCell>Income</HeaderCell>
  //     <Cell>{(rowData) => `$${rowData.amount}`}</Cell>
  //   </Column>

  //   <Column width={120}>
  //     <HeaderCell>
  //       <MoreIcon />
  //     </HeaderCell>
  //     <ActionCell dataKey="id" />
  //   </Column>
  // </Table>
  const sampleData = [
    { firstName: "Gourav", lastName: "Hammad", city: "Mhow" },
    { firstName: "Rithik", lastName: "Verma", city: "Indore" },
    { firstName: "Kartik", lastName: "Malik", city: "Raipur" },
    { firstName: "Nikhil", lastName: "Kapoor", city: "Rau" },
    { firstName: "Ayush", lastName: "Singh", city: "Dewas" },
  ];

  return (
    <div
      style={{
        display: "block",
        paddingLeft: 30,
      }}
    >
      <h4>User portfolio</h4>
      <Table height={500} data={sampleData}>
        <Column width={200}>
          <HeaderCell>Logo</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>
        <Column width={200}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>
        <Column width={200}>
          <HeaderCell>Symbol</HeaderCell>
          <Cell dataKey="city" />
        </Column>
        <Column width={200}>
          <HeaderCell>Symbol</HeaderCell>
          <Cell dataKey="city" />
        </Column>
        <Column width={200}>
          <HeaderCell>Symbol</HeaderCell>
          <Cell dataKey="city" />
        </Column>

      </Table>
    </div>
  );
}

export default StockTable;
