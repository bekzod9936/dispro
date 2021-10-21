import styled from "styled-components";
import { StlyeProps } from "./types";

export const AlertDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ error }: StlyeProps) =>
    error ? "rgb(253, 237, 237)" : "rgb(237, 247, 237)"};
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

export const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 17px;
  height: 17px;
  border-radius: 30px;
  background-color: rgba(96, 110, 234, 0.1);
  margin-bottom: 3px;
`;

export const Text = styled.div`
  font-size: 18px;
  text-align: left;
  white-space: nowrap;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  border-radius: 4px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 6px 16px;
  color: ${({ error }: StlyeProps) =>
    error ? "rgb(95, 33, 32)" : "rgb(30, 70, 32)"};
`;
