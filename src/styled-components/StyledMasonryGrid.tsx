import styled from "styled-components";
import { Link } from "react-router-dom";

export const GridContainer = styled.div`
    position: relative;
    overflow-y: auto;
    height: 100vh;
    padding-left: calc((100vw - 1480px) / 2);
    padding-right: calc((100vw - 1480px) / 2);
`;

export const InnerContainer = styled.div<{ $contentHeight: number }>`
    height: ${(props) => props.$contentHeight}px;
    height: 110vh;
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
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
`;