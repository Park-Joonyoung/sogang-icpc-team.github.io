import styled, { createGlobalStyle, css } from "styled-components";

import { EmptyButton } from "@ui/button/empty-button";
import { Dropdown } from "@ui/dropdown/dropdown";

const _Item = ({
  className,
  label,
}: {
  className?: string;
  label: React.ReactNode;
  selected: boolean;
}) => {
  return <li className={className}>{label}</li>;
};
const Item = styled(_Item)`
  width: fit-content;

  font-size: 1.6rem;
  letter-spacing: -1px;
  color: #ddd;
  cursor: pointer;

  transition: 0.3s color ease;

  ${({ selected }) => {
    if (selected) {
      return css`
        color: #000;
        font-weight: bold;
      `;
    }
  }}
`;

const DropdownTriggerButton = styled(EmptyButton)`
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 1rem;

  border-radius: 12px;
  background-color: #0000000f;
  color: #535353;

  font-size: 1.6rem;
  letter-spacing: -1px;
  cursor: pointer;
  font-weight: bold;

  transition: 0.3s color ease;
`;

const DROPDOWN_CLASSNAME = "history-tab__year__dropdown";
const DropdownStyles = createGlobalStyle`
  .${DROPDOWN_CLASSNAME} ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    li {
      justify-content: center;
    }
  }
`;
const TriangleDownIcon = styled.span`
  font-size: 12px;
`;

const _YearSelectorDropdown = ({
  className,
  items,
  year,
  setYear,
}: {
  className?: string;
  items: { label: React.ReactNode; value: number }[];
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={className}>
      <DropdownStyles />
      <Dropdown
        overlayClassName={DROPDOWN_CLASSNAME}
        placement="bottomLeft"
        trigger={["click"]}
        menu={{
          items: items.map((item) => ({
            key: item.value,
            onClick: () => setYear(item.value),
            label: <Item selected={year === item.value} label={item.label} />,
          })),
        }}
        children={
          <DropdownTriggerButton
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <span>{year}</span>
            <TriangleDownIcon>▼</TriangleDownIcon>
          </DropdownTriggerButton>
        }
      />
    </div>
  );
};
export const YearSelectorDropdown = styled(_YearSelectorDropdown)`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #eee;

    &:hover {
      background: #eee;
    }
  }
`;
