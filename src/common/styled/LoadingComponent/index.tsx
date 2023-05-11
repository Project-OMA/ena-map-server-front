import CircularProgress from "@mui/material/CircularProgress";

export type LoadingComponentType = {
  size: number;
  color?: string;
};

export function LoadingComponent({ size, color }: LoadingComponentType) {
  return (
    <CircularProgress size={size} style={{ color: color ? color : "#000" }} />
  );
}
