import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BreacrumbsProps {
  currentPageTitle: string;
}
export function Breacrumbs({ currentPageTitle }: BreacrumbsProps) {
  const navigate = useNavigate();
  return (
    <Breadcrumbs
      separator=">"
      aria-label="breadcrumb"
      sx={{
        backgroundColor: "hsl(240, 3%, 94%)",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "1rem",
      }}
    >
      <Link
        underline="hover"
        color="inherit"
        onClick={() => {
          navigate("/");
        }}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>
      <Typography color="text.primary">{currentPageTitle}</Typography>
    </Breadcrumbs>
  );
}
