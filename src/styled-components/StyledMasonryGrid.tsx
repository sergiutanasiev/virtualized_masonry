import styled from "styled-components";
import { Link } from "react-router-dom";

export const GridContainer = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`;

export const InnerContainer = styled.div<{ contentHeight: number }>`
  height: ${(props) => props.contentHeight}px;
`;

export const LoadingText = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  color: #777;
`;

export const GridItem = styled.div<{ x: number; y: number; width: number; height: number }>`
  position: absolute;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const Image = styled.img<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  object-fit: cover;
  border-radius: 8px;
`;

export const LinkButton = styled(Link)`
  display: block;
`;